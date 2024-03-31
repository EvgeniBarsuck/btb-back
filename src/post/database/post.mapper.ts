import { Injectable } from '@nestjs/common';
import { IDomainEntityBase } from '@libs/base/domain.entity.base';

import { Mapper } from '@libs/base/mapper.base';
import { PostEntity } from '@app/post/database/post.entity';

@Injectable()
export class PostMapper implements Mapper<PostEntity> {
  toDomainProps(props: PostEntity): IDomainEntityBase<PostEntity> {
    const {
      createdAt,
      id,
      updatedAt,
      blog,
      content,
      name,
      shortDescription,
      comments,
    } = props;

    return {
      id,
      props: {
        blog,
        content,
        shortDescription,
        name,
        comments,
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
  }: IDomainEntityBase<PostEntity>): PostEntity {
    return new PostEntity({
      id,
      createdAt,
      updatedAt,
      ...props,
    });
  }
}
