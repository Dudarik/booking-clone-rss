import { commentsService } from '../services/comments-service.js';
import { tokenService } from '../services/token-service.js';

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
      const comments = await commentsService.getCommentsFromDB(req.params.rid);

      if (comments instanceof Error) throw new Error(comments.message);

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
}

export const commentsController = new CommentsController();
