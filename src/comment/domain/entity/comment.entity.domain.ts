import { v4 as uuidv4 } from 'uuid';

import { CommentEntity } from '@app/comment/database/comment.entity';
import {
  DomainEntityBase,
  IDomainEntityBase,
  EntityProps,
} from '@libs/base/domain.entity.base';

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
