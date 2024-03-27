export class UpdateCommand {
  constructor({ message, commentId }: UpdateCommand) {
    this.message = message;
    this.commentId = commentId;
  }

  public message?: string;
  public commentId: string;
}
