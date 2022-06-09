import { Router } from 'express';
import postController from '../controllers/post.controller';
import { authMw } from '../middlewares/auth.middleware';

export const postRoutes = Router();

postRoutes.get('/', postController.getAllPost);
postRoutes.post('/', authMw, postController.createPost);
postRoutes.get('/:postId', postController.getPost);
postRoutes.delete('/:postId', authMw, postController.deletePost);
postRoutes.patch('/:postId', authMw, postController.updatePost);
