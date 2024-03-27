import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

import { UserEntity } from '../../../src/user/database/user.entity';
import { EntityBase } from '../../../libs/base/entity.base';
import { PostEntity } from '../../post/database/post.entity';

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

  @ManyToMany(() => UserEntity)
  public users: UserEntity[] | string[];

  @ManyToOne(() => PostEntity, (post) => post.id)
  post: PostEntity | string;
}