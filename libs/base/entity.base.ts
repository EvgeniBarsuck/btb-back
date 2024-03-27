import {
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class EntityBase {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  public id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp without time zone',
    default: new Date(),
  })
  public createdAt: Date;

  @CreateDateColumn({
    name: 'updated_at',
    type: 'timestamp without time zone',
    default: new Date(),
  })
  public updatedAt: Date;
}
