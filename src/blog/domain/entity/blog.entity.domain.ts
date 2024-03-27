import { v4 as uuidv4 } from 'uuid';

import {
  DomainEntityBase,
  EntityProps,
  IDomainEntityBase,
} from '../../../../libs/base/domain.entity.base';
import { BlogEntity } from '../../database/blog.entity';

export class Blog implements DomainEntityBase<BlogEntity> {
  private entity: IDomainEntityBase<BlogEntity>;

  constructor(props: IDomainEntityBase<BlogEntity>) {
    this.entity = props;
  }

  static create(props: EntityProps<BlogEntity>): Blog {
    return new Blog({
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

