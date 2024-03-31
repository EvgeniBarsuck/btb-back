import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { PostEntity } from '@app/post/database/post.entity';
import { UserEntity } from '@app/user/database/user.entity';
import { EntityBase } from '@libs/base/entity.base';

@Entity('blogs')
export class BlogEntity extends EntityBase {
  constructor(props: BlogEntity) {
    super();

    if (props) {
      this.id = props.id;
      this.longDescription = props.longDescription;
      this.createdAt = props.createdAt;
      this.name = props.name;
      this.shortDescription = props.shortDescription;
      this.updatedAt = props.updatedAt;
      this.posts = props.posts;
      this.user = props.user;
    }
  }

  @Column({
    name: 'name',
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  public name: string;

  @Column({
    name: 'short_description',
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  public shortDescription: string;

  @Column({
    name: 'long_description',
    type: 'text',
    nullable: false,
  })
  public longDescription: string;

  @OneToMany(() => PostEntity, (post) => post.blog, { cascade: true })
  public posts: PostEntity[];

  @ManyToOne(() => UserEntity, (user) => user.blogs)
  public user: UserEntity | string;
}
