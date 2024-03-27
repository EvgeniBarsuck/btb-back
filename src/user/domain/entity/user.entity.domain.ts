import { v4 as uuidv4 } from 'uuid';
import {
  DomainEntityBase,
  EntityProps,
  IDomainEntityBase,
} from '../../../../libs/base/domain.entity.base';
import { UserEntity } from '../../database/user.entity';

export class User implements DomainEntityBase<UserEntity> {
  private entity: IDomainEntityBase<UserEntity>;

  constructor(props: IDomainEntityBase<UserEntity>) {
    this.entity = props;
  }

  static create(props: EntityProps<UserEntity>): User {
    return new User({
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

  get password(): string {
    return this.entity.props.password;
  }
}
