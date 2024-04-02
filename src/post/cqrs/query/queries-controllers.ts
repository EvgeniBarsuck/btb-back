import { PostController } from '@app/post/cqrs/query/post/post.controller';
import { PostsController } from '@app/post/cqrs/query/posts/posts.controller';

export const queriesControllers = [PostController, PostsController];
