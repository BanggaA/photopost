import expressAsyncHandler from 'express-async-handler';
import { CreatePostDTO, PaginationPostDTO, UpdatePostDTO } from '../dtos/post.dto';
import postService, { PostService } from '../services/post.service';
type PostControllerId = { postId: string };

export class PostController {
  constructor(private readonly postService: PostService) {}

  getAllPost = expressAsyncHandler<any, any, PaginationPostDTO>(async (req, res) => {
    const post = await this.postService.getAllPost(req.body);
    res.status(200).json(post);
  });

  createPost = expressAsyncHandler<any, any, CreatePostDTO>(async (req, res) => {
    const post = await this.postService.createPost(req.user?.id!, req.body);
    res.status(201).json(post);
  });

  getPost = expressAsyncHandler<PostControllerId>(async (req, res) => {
    const post = await this.postService.getPost(parseInt(req.params.postId));
    res.status(200).json(post);
  });

  deletePost = expressAsyncHandler<PostControllerId>(async (req, res) => {
    await this.postService.deletePost(parseInt(req.params.postId), req.user?.id!);
    res.status(204).json();
  });

  updatePost = expressAsyncHandler<PostControllerId, any, UpdatePostDTO>(async (req, res) => {
    await this.postService.updatePost(parseInt(req.params.postId), req.user?.id!, req.body);
    res.status(204).json();
  });
}
export default new PostController(postService);
