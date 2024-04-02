export class UpdateCommand {
  constructor({
    content,
    name,
    shortDescription,
    postId,
    userId,
    blogId
  }: UpdateCommand) {
    this.content = content;
    this.name = name;
    this.shortDescription = shortDescription;
    this.postId = postId;
    this.blogId = blogId;
    this.userId = userId;
  }

  public name?: string;
  public shortDescription?: string;
  public content?: string;
  public postId: string;
  public blogId: string;
  public userId: string;
}
