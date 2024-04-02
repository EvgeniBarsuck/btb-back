export class CreateCommand {
  constructor({
    content,
    name,
    shortDescription,
    blogId,
    userId,
  }: CreateCommand) {
    this.content = content;
    this.name = name;
    this.shortDescription = shortDescription;
    this.blogId = blogId;
    this.userId = userId;
  }

  public name: string;
  public shortDescription: string;
  public content: string;
  public blogId: string;
  public userId: string;
}
