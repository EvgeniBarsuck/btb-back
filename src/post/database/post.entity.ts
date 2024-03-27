import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { EntityBase } from '../../../libs/base/entity.base';
import { BlogEntity } from '../../../src/blog/database/blog.entity';
import { CommentEntity } from '../../comment/database/comment.entity';

@Entity('posts')
export class PostEntity extends EntityBase {
  constructor(props: PostEntity) {
    super();

    if (props) {

      this.id = props.id;
      this.blog = props.blog;
      this.createdAt = props.createdAt;
      this.name = props.name;
      this.content = props.content;
      this.shortDescription = props.shortDescription;
      this.updatedAt = props.updatedAt;
      this.comments = props.comments;
    }
  }

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
  public name: string;

  @Column({
    name: 'short_description',
    type: 'varchar',
    nullable: false,
  })
  public shortDescription: string;

  @Column({
    name: 'content',
    type: 'text',
    nullable: false,
  })
  public content: string;

  @ManyToOne(() => BlogEntity, (blog) => blog.posts)
  public blog: BlogEntity | string;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];
}
