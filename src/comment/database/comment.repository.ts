import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';

import { CommentMapper } from '@app/comment/database/comment.mapper';
import { CommentEntity } from '@app/comment/database/comment.entity';
import { IDomainEntityBase, EntityProps } from '@libs/base/domain.entity.base';
import { RepositoryBase } from '@libs/base/repository.base';

@Injectable()
export class CommentRepository implements RepositoryBase<CommentEntity> {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly _commentRepository: Repository<CommentEntity>,
    private readonly _mapper: CommentMapper,
  ) {}

  async save(
    props: IDomainEntityBase<CommentEntity>,
  ): Promise<IDomainEntityBase<CommentEntity>> {
    return this._commentRepository.manager.transaction(async (manager) => {
      const entity = await manager.save(this._mapper.toOrmProps(props));

      return this._mapper.toDomainProps(entity);
    });
  }
  async findOneById(id: string): Promise<IDomainEntityBase<CommentEntity>> {
    const entity = await this._commentRepository.findOne({
      where: { id },
      relations: ['posts'],
    });

    return entity ? this._mapper.toDomainProps(entity) : null;
  }

  async update(
    conditions: FindOptionsWhere<CommentEntity>,
    fields: Partial<EntityProps<CommentEntity>>,
  ): Promise<UpdateResult> {
    return this._commentRepository.update(conditions, fields);
  }

  delete(id: string, userId: string): Promise<DeleteResult> {
    return this._commentRepository.delete({ id, users: { id: userId } });
  }

  async find(query?: FindManyOptions<CommentEntity>) {
    const entities = await this._commentRepository.find(query);

    return entities.map((entity) => this._mapper.toDomainProps(entity));
  }

  async findPostComments(postId: string) {
    const entities = await this._commentRepository.find({
      where: { post: { id: postId } },
      relations: ['post'],
    });

    return entities.map((entity) => this._mapper.toDomainProps(entity));
  }
}
