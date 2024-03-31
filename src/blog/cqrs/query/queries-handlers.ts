import { BlogHandler } from '@app/blog/cqrs/query/blog/blog.handler';
import { BlogsHandler } from '@app/blog/cqrs/query/blogs/blogs.handler';

export const queriesHandlers = [BlogHandler, BlogsHandler];
