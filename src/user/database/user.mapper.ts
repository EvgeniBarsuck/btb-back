import { Injectable } from '@nestjs/common';
import { IDomainEntityBase } from 'libs/base/domain.entity.base';

import { UserEntity } from '@app/user/database/user.entity';
import { Mapper } from '@libs/base/mapper.base';

@Injectable()
export class UserMapper implements Mapper<UserEntity> {
  toDomainProps(props: UserEntity): IDomainEntityBase<UserEntity> {
    const { createdAt, id, updatedAt, email, name, password, comments, blogs } =
      props;

    return {
      id,
      props: {
        password,
        comments,
        email,
        name,
        blogs,
      },
      createdAt,
      updatedAt,
    };
  }

  toOrmProps({
    createdAt,
    id,
    props,
    updatedAt,
  }: IDomainEntityBase<UserEntity>): UserEntity {
    return new UserEntity({
      id,
      createdAt,
      updatedAt,
      ...props,
    });
  }
}
