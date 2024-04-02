export class UserBlogsQuery {
  constructor({ userId }: UserBlogsQuery) {
    this.userId = userId;
  }

  public userId: string;
}
