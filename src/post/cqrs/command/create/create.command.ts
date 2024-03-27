export class CreateCommand {
  constructor({ content, name, shortDescription, blogId }: CreateCommand) {
    this.content = content;
    this.name = name;
    this.shortDescription = shortDescription;
    this.blogId = blogId;
  }

  public name: string;
  public shortDescription: string;
  public content: string;
  public blogId: string;
}
