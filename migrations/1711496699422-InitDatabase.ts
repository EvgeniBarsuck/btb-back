import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class InitDatabase1711496699422 implements MigrationInterface {
  name = 'InitDatabase1711496699422';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: `'2024-03-26T23:45:03.825Z'`,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: `'2024-03-26T23:45:03.825Z'`,
          },
          {
            name: 'name',
            type: 'character varying',
            length: '25',
            isNullable: true,
          },
          {
            name: 'password',
            type: 'character varying',
            length: '25',
          },
          {
            name: 'email',
            type: 'character varying',
            length: '100',
          },
        ],
        uniques: [
          {
            name: 'UQ_97672ac88f789774dd47f7c8be3',
            columnNames: ['email'],
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'comments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: `'2024-03-26T23:45:03.825Z'`,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: `'2024-03-26T23:45:03.825Z'`,
          },
          {
            name: 'message',
            type: 'character varying',
            length: '200',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'blogs',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: `'2024-03-26T23:45:03.825Z'`,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: `'2024-03-26T23:45:03.825Z'`,
          },
          {
            name: 'name',
            type: 'character varying',
            length: '30',
          },
          {
            name: 'user_id',
            type: 'character varying',
            length: '40',
          },
          {
            name: 'short_description',
            type: 'character varying',
            length: '200',
          },
          {
            name: 'long_description',
            type: 'text',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'posts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: `'2024-03-26T23:45:03.825Z'`,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: `'2024-03-26T23:45:03.825Z'`,
          },
          {
            name: 'name',
            type: 'character varying',
          },
          {
            name: 'short_description',
            type: 'character varying',
          },
          {
            name: 'content',
            type: 'text',
          },
          {
            name: 'blogId',
            type: 'uuid',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'users_comments_comments',
        columns: [
          {
            name: 'usersId',
            type: 'uuid',
          },
          {
            name: 'commentsId',
            type: 'uuid',
          },
        ],
        indices: [
          {
            name: 'IDX_87f74d1bf427a3b83e3d12bcff',
            columnNames: ['usersId'],
          },
          {
            name: 'IDX_691655888b469ad18bf0041ec8',
            columnNames: ['commentsId'],
          },
        ],
        foreignKeys: [
          {
            columnNames: ['usersId'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['commentsId'],
            referencedTableName: 'comments',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'posts',
      new TableForeignKey({
        columnNames: ['blogId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'blogs',
        onDelete: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const usersCommentsCommentsTable = await queryRunner.getTable(
      'users_comments_comments',
    );
    const postsTable = await queryRunner.getTable('posts');

    const fkUsersComments = usersCommentsCommentsTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('usersId') !== -1,
    );
    if (fkUsersComments) {
      await queryRunner.dropForeignKey(
        'users_comments_comments',
        fkUsersComments,
      );
    }

    const fkCommentsUsers = usersCommentsCommentsTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('commentsId') !== -1,
    );
    if (fkCommentsUsers) {
      await queryRunner.dropForeignKey(
        'users_comments_comments',
        fkCommentsUsers,
      );
    }

    const fkPostsBlogs = postsTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('blogId') !== -1,
    );
    if (fkPostsBlogs) {
      await queryRunner.dropForeignKey('posts', fkPostsBlogs);
    }

    await queryRunner.dropIndex(
      'users_comments_comments',
      'IDX_691655888b469ad18bf0041ec8',
    );
    await queryRunner.dropIndex(
      'users_comments_comments',
      'IDX_87f74d1bf427a3b83e3d12bcff',
    );

    await queryRunner.dropTable('users_comments_comments');
    await queryRunner.dropTable('posts');
    await queryRunner.dropTable('blogs');
    await queryRunner.dropTable('comments');
    await queryRunner.dropTable('users');
  }
}
