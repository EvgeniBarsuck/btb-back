import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class EntityBase {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp without time zone',
    default: new Date(),
  })
  public createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp without time zone',
    default: new Date(),
  })
  public updatedAt: Date;
}
