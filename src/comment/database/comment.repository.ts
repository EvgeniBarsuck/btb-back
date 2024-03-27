import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RepositoryBase } from '../../../libs/base/repository.base';
import {
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import {
  EntityProps,
  IDomainEntityBase,
} from '../../../libs/base/domain.entity.base';
import { CommentMapper } from './comment.mapper';
import { CommentEntity } from './comment.entity';

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

  delete(id: string): Promise<DeleteResult> {
    return this._commentRepository.delete(id);
  }

  async find(query?: FindManyOptions<CommentEntity>) {
    const entities = await this._commentRepository.find(query);

    return entities.map((entity) => this._mapper.toDomainProps(entity));
  }

  async findPostComments(postId: string) {
    const entities = await this._commentRepository.find({
      where: { post: { id: postId } },
      relations: ['posts'],
    });

    return entities.map((entity) => this._mapper.toDomainProps(entity));
  }
}
