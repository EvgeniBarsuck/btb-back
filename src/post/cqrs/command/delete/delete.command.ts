export class DeleteCommand {
  constructor({ postId, userId, blogId }: DeleteCommand) {
    this.postId = postId;
    this.userId = userId;
    this.blogId = blogId;
  }

  public postId: string;
  public userId: string;
  public blogId: string;
}
