export class DeleteCommand {
  constructor({ blogId, userId }: DeleteCommand) {
    this.blogId = blogId;
    this.userId = userId;
  }

  public blogId?: string;
  public userId: string;
}
