import { Injectable } from '@nestjs/common';
import { IDomainEntityBase } from 'libs/base/domain.entity.base';

import { Mapper } from '../../../libs/base/mapper.base';
import { BlogEntity } from './blog.entity';

@Injectable()
export class BlogMapper implements Mapper<BlogEntity> {
  toDomainProps(props: BlogEntity): IDomainEntityBase<BlogEntity> {
    const {
      createdAt,
      id,
      longDescription,
      name,
      posts,
      shortDescription,
      updatedAt,
      user,
    } = props;

    return {
      id,
      props: {
        longDescription,
        name,
        posts,
        shortDescription,
        user,
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
  }: IDomainEntityBase<BlogEntity>): BlogEntity {
    return new BlogEntity({
      id,
      createdAt,
      updatedAt,
      ...props,
    });
  }
}
