import { Injectable } from '@nestjs/common';

import { IDomainEntityBase } from '@libs/base/domain.entity.base';
import { CommentEntity } from '@app/comment/database/comment.entity';
import { Mapper } from '@libs/base/mapper.base';

@Injectable()
export class CommentMapper implements Mapper<CommentEntity> {
  toDomainProps(props: CommentEntity): IDomainEntityBase<CommentEntity> {
    const { createdAt, id, message, post, users, updatedAt } = props;

    return {
      id,
      props: {
        message,
        post,
        users,
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
  }: IDomainEntityBase<CommentEntity>): CommentEntity {
    return new CommentEntity({
      id,
      createdAt,
      updatedAt,
      ...props,
    });
  }
}
