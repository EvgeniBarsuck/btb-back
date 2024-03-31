import { Injectable } from '@nestjs/common';
import {
  DeleteResult,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '@app/user/database/user.entity';
import { UserMapper } from '@app/user/database/user.mapper';
import { RepositoryBase } from '@libs/base/repository.base';
import { IDomainEntityBase, EntityProps } from '@libs/base/domain.entity.base';

@Injectable()
export class UserRepository implements RepositoryBase<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
    private readonly _mapper: UserMapper,
  ) {}

  async save(
    props: IDomainEntityBase<UserEntity>,
  ): Promise<IDomainEntityBase<UserEntity>> {
    return this._userRepository.manager.transaction(async (manager) => {
      const entity = await manager.save(this._mapper.toOrmProps(props));

      return this._mapper.toDomainProps(entity);
    });
  }
  async findOneById(id: string): Promise<IDomainEntityBase<UserEntity>> {
    const entity = await this._userRepository.findOne({ where: { id } });

    return entity ? this._mapper.toDomainProps(entity) : null;
  }

  async update(
    conditions: FindOptionsWhere<UserEntity>,
    fields: Partial<EntityProps<UserEntity>>,
  ): Promise<UpdateResult> {
    return this._userRepository.update(conditions, fields);
  }

  delete(id: string): Promise<DeleteResult> {
    return this._userRepository.delete(id);
  }

  async findOne(query: FindOneOptions<UserEntity>) {
    const entity = await this._userRepository.findOne(query);

    return entity ? this._mapper.toDomainProps(entity) : null;
  }
}
