export class UpdateCommand {
  constructor({
    longDescription,
    name,
    shortDescription,
    blogId,
  }: UpdateCommand) {
    this.longDescription = longDescription;
    this.name = name;
    this.shortDescription = shortDescription;
    this.blogId = blogId;
  }

  public name?: string;
  public shortDescription?: string;
  public longDescription?: string;
  public blogId?: string;
}
