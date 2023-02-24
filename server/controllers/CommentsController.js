import { commentsService, restaurantService, tokenService, userService } from '../services/index.js';

class CommentsController {
  async addComment(req, res) {
    try {
      const uid = await tokenService.getUidByToken(req.cookies.rtoken);

      if (!uid) throw new Error(`Unathorized user`);
      const comment = {
        uid,
      };
      Object.assign(comment, req.body);
      const newComment = await commentsService.addComment(comment);

      if (newComment instanceof Error) throw new Error(newComment.message);

      return res.json({
        status: 200,
        data: newComment,
      });
    } catch (error) {
      res.json({
        status: 422,
        error: error.message,
      });
    }
  }

  async getCommentsRestaurant(req, res) {
    try {
      let comments = await commentsService.getCommentsFromDB(req.params.rid);

      if (comments instanceof Error) throw new Error(comments.message);

      const restaurantData = await restaurantService.getRestaurant(req.params.rid);

      const userIds = Array.from(new Set(comments.map((comment) => comment.dataValues.uid)));

      const users = await userService.getUsers(userIds);

      const usersObj = Object.fromEntries(
        users.map((user) => [user.dataValues.uid, { username: user.dataValues.username, role: user.dataValues.role }])
      );

      comments.forEach((comment) => {
        Object.assign(comment.dataValues, {
          username: usersObj[comment.dataValues.uid].username,
          role: usersObj[comment.dataValues.uid].role,
          restaurantTitle: restaurantData.dataValues.title,
          address: restaurantData.dataValues.address,
        });
      });
      return res.json({
        status: 200,
        data: comments,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 422,
        error: error.message,
      });
    }
  }

  async changeComment(req, res) {
    try {
      const id = req.params.id;
      const commentParams = Object.assign({ id }, req.body);
      const result = await commentsService.changeCommentInDB(commentParams);

      if (result instanceof Error) throw new Error(result.message);

      return res.json({
        status: 200,
        data: result,
      });
    } catch (error) {
      console.log(error.message);
      return res.json({
        status: 422,
        error: error.message,
      });
    }
  }

  async deleteComment(req, res) {
    try {
      const result = await commentsService.deleteTable(req.params.id);

      if (result instanceof Error) throw new Error(result.message);

      return res.json({
        status: 200,
        data: result,
      });
    } catch (error) {
      console.log(error.message);
      return res.json({
        status: 422,
        error: error.message,
      });
    }
  }
}

export const commentsController = new CommentsController();
