import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { UserEntity } from '@app/user/database/user.entity';
import { EntityBase } from '@libs/base/entity.base';
import { PostEntity } from '@app/post/database/post.entity';

@Entity('comments')
export class CommentEntity extends EntityBase {
  constructor(props: CommentEntity) {
    super();

    if (props) {
      this.createdAt = props.createdAt;
      this.id = props.id;
      this.message = props.message;
      this.post = props.post;
      this.updatedAt = props.updatedAt;
      this.users = props.users;
    }
  }

  @Column({
    name: 'message',
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  public message: string;

  @ManyToMany(() => UserEntity, (user) => user.comments)
  @JoinTable()
  public users: UserEntity[] | string[];

  @ManyToOne(() => PostEntity, (post) => post.id)
  public post: PostEntity | string;
}
