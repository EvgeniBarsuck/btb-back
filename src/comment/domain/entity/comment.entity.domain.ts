import { v4 as uuidv4 } from 'uuid';

import {
  DomainEntityBase,
  EntityProps,
  IDomainEntityBase,
} from '../../../../libs/base/domain.entity.base';
import { CommentEntity } from 'src/comment/database/comment.entity';

export class Comment implements DomainEntityBase<CommentEntity> {
  private entity: IDomainEntityBase<CommentEntity>;

  constructor(props: IDomainEntityBase<CommentEntity>) {
    this.entity = props;
  }

  static create(props: EntityProps<CommentEntity>): Comment {
    return new Comment({
      id: uuidv4(),
      props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  getEntity() {
    return this.entity;
  }

  get message(): string {
    return this.entity.props.message;
  }
}
