import { CommentsModel } from '../models/CommentsModel.js';

class CommentsService {
  async addComment(comment) {
    try {
      const { uid, rid, title, body } = comment;
      if (!uid) throw new Error(`Unknown user`);
      if (!rid) throw new Error(`Unknown restaurant`);
      if (!title.length) throw new Error(`Title must be 1 or more symbol`);
      if (!body.length) throw new Error(`Body must be 1 or more symbol`);

      const newComment = CommentsModel.create(comment);

      if (newComment instanceof Error) throw new Error(newComment.message);

      return newComment;
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }

  async getCommentsFromDB(rid) {
    try {
      const comments = CommentsModel.findAll({ where: { rid } });

      if (comments instanceof Error) throw new Error(comments.message);

      return comments;
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }

  async getCommentFromDB(id) {
    try {
      const comment = CommentsModel.findOne({ where: { id } });

      if (comment instanceof Error) throw new Error(comment.message);

      return comment;
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }

  async changeCommentInDB(commentData) {
    try {
      const { id } = commentData;

      const commentToChange = await this.getCommentFromDB(id);

      if (commentToChange instanceof Error) throw new Error(commentToChange.message);

      const result = CommentsModel.update({ ...commentData }, { where: { id } });

      if (result instanceof Error) throw new Error(result.message);

      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteCommentFromDB(id) {
    try {
      const commentToDelete = await this.getCommentFromDB(id);

      if (commentToDelete instanceof Error) throw new Error(commentToDelete.message);

      return await CommentsModel.destroy({ where: { id } });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export const commentsService = new CommentsService();
