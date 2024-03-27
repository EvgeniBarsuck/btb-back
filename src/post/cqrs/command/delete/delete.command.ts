export class DeleteCommand {
  constructor({ postId }: DeleteCommand) {
    this.postId = postId;
  }

  public postId: string;
}
