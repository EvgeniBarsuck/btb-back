export class UpdateCommand {
  constructor({ content, name, shortDescription, postId }: UpdateCommand) {
    this.content = content;
    this.name = name;
    this.shortDescription = shortDescription;
    this.postId = postId;
  }

  public name?: string;
  public shortDescription?: string;
  public content?: string;
  public postId: string;
}
