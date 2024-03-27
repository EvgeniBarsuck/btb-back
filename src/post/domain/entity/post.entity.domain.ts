import { v4 as uuidv4 } from 'uuid';

import {
  DomainEntityBase,
  EntityProps,
  IDomainEntityBase,
} from '../../../../libs/base/domain.entity.base';
import { PostEntity } from 'src/post/database/post.entity';

export class Post implements DomainEntityBase<PostEntity> {
  private entity: IDomainEntityBase<PostEntity>;

  constructor(props: IDomainEntityBase<PostEntity>) {
    this.entity = props;
  }

  static create(props: EntityProps<PostEntity>): Post {
    return new Post({
      id: uuidv4(),
      props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  getEntity() {
    return this.entity;
  }

  get name(): string {
    return this.entity.props.name;
  }
}
