import { BlogController } from '@app/blog/cqrs/query/blog/blog.controller';
import { BlogsController } from '@app/blog/cqrs/query/blogs/blogs.controller';
import { UserBlogsController } from '@app/blog/cqrs/query/user-blogs/user-blogs.controller';

export const queriesControllers = [
  UserBlogsController,
  BlogController,
  BlogsController,
];
