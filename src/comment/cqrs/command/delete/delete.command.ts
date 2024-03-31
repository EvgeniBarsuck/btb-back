export class DeleteCommand {
  constructor({ commentId, userId }: DeleteCommand) {
    this.commentId = commentId;
    this.userId = userId;
  }

  public commentId: string;
  public userId: string;
}
