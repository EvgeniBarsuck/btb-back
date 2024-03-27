export class CreateCommand {
  constructor({ message, postId, userId }: CreateCommand) {
    this.message = message;
    this.postId = postId;
    this.userId = userId;
  }

  public message: string;
  public postId: string;
  public userId: string;
}
