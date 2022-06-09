import createHttpError from 'http-errors';
import { CreatePostDTO, PaginationPostDTO, UpdatePostDTO } from '../dtos/post.dto';
import { db } from '../models';

export class PostService {
  constructor(private readonly database: typeof db) {}

  async getAllPost(paginationPostDTO: PaginationPostDTO) {
    let [page, size] = [Number(paginationPostDTO.page), Number(paginationPostDTO.size)];
    if (size <= 5) size = 5;
    if (page <= 1) page = 1;
    const Posts = await this.database.Post.findAndCountAll({
      offset: (page - 1) * size,
      limit: size,
    });
    const { rows: results, count } = Posts;
    return {
      page,
      size,
      count,
      results,
    };
  }

  async getPost(postId: number) {
    const post = await this.database.Post.findByPk(postId, {
      include: [
        {
          model: this.database.User,
          as: 'author',
        },
      ],
    });
    return post;
  }

  async createPost(authorId: number, createPostDTO: CreatePostDTO) {
    const { caption } = createPostDTO;
    const isPublished = true;
    const post = await this.database.Post.create({ authorId, caption, isPublished });
    return post;
  }

  async deletePost(postId: number, authorId: number) {
    const post = await this.database.Post.destroy({ where: { id: postId, authorId } });
    return post;
  }
  async updatePost(postId: number, authorId: number, updatePostDTO: UpdatePostDTO) {
    const { caption, isPublished } = updatePostDTO;
    const post = await this.database.Post.update(
      { caption, isPublished },
      { where: { id: postId, authorId } },
    );
    return post;
  }
}
export default new PostService(db);
