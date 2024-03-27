export class CreateCommand {
  constructor({
    longDescription,
    name,
    shortDescription,
    userId,
  }: CreateCommand) {
    this.longDescription = longDescription;
    this.name = name;
    this.shortDescription = shortDescription;
    this.userId = userId;
  }

  public name: string;
  public shortDescription: string;
  public longDescription: string;
  public userId: string;
}
