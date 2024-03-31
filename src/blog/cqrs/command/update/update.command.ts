export class UpdateCommand {
  constructor({
    longDescription,
    name,
    shortDescription,
    blogId,
    userId,
  }: UpdateCommand) {
    this.longDescription = longDescription;
    this.name = name;
    this.shortDescription = shortDescription;
    this.blogId = blogId;
    this.userId = userId;
  }

  public name?: string;
  public shortDescription?: string;
  public longDescription?: string;
  public blogId: string;
  public userId: string;
}
