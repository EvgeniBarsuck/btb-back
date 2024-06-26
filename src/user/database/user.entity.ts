import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

import { BlogEntity } from '@app/blog/database/blog.entity';
import { CommentEntity } from '@app/comment/database/comment.entity';
import { EntityBase } from '@libs/base/entity.base';

@Entity('users')
export class UserEntity extends EntityBase {
  constructor(props: UserEntity) {
    super();

    if (props) {

      this.id = props.id;
      this.email = props.email;
      this.createdAt = props.createdAt;
      this.name = props.name;
      this.password = props.password;
      this.updatedAt = props.updatedAt;
      this.comments = props.comments;
      this.blogs = props.blogs;
    }
  }

  @Column({
    name: 'name',
    type: 'varchar',
    length: 25,
    nullable: true,
  })
  public name: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 25,
    nullable: false,
  })
  public password: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  public email: string;

  @ManyToMany(() => CommentEntity, (comment) => comment.users)
  @JoinTable()
  public comments: CommentEntity[];

  @OneToMany(() => BlogEntity, (blog) => blog.user)
  blogs: BlogEntity[];
}
