export class CommentsQuery {
  constructor(postId: string) {
    this.postId = postId;
  }
  public postId: string;
}
