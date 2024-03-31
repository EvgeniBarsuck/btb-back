import { PostHandler } from '@app/post/cqrs/query/post/post.handler';
import { PostsHandler } from '@app/post/cqrs/query/posts/posts.handler';

export const queriesHandlers = [PostHandler, PostsHandler];
