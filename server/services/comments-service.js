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
}

export const commentsService = new CommentsService();
