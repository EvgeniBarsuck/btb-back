export class DeleteCommand {
  constructor({ commentId }: DeleteCommand) {
    this.commentId = commentId;
  }

  public commentId: string;
}
