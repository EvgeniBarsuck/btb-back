export class BlogQuery {
  constructor(blogId: string, userId?: string) {
    this.blogId = blogId;
    this.userId = userId;
  }
  public blogId: string;
  public userId?: string;
}
