export class DeleteCommand {
  constructor({ blogId }: DeleteCommand) {
    this.blogId = blogId;
  }

  public blogId?: string;
}
