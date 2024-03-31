import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddRelationsBetweenUserBlogAndPOstComment1711531284712
  implements MigrationInterface
{
  name = 'AddRelationsBetweenUserBlogAndPOstComment1711531284712';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('blogs', 'user_id', 'userId');

    await queryRunner.addColumn(
      'comments',
      new TableColumn({
        name: 'postId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    const tables = ['comments', 'posts', 'blogs', 'users'];
    for (const table of tables) {
      await queryRunner.changeColumn(
        table,
        'created_at',
        new TableColumn({
          name: 'created_at',
          type: 'timestamp',
          default: () => 'CURRENT_TIMESTAMP',
        }),
      );
      await queryRunner.changeColumn(
        table,
        'updated_at',
        new TableColumn({
          name: 'updated_at',
          type: 'timestamp',
          default: () => 'CURRENT_TIMESTAMP',
        }),
      );
    }

    await queryRunner.dropColumn('blogs', 'userId');
    await queryRunner.addColumn(
      'blogs',
      new TableColumn({
        name: 'userId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        columnNames: ['postId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'posts',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      }),
    );

    await queryRunner.createForeignKey(
      'blogs',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Удаление внешних ключей
    const tableBlogs = await queryRunner.getTable('blogs');
    const foreignKeyBlogs = tableBlogs.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1,
    );
    if (foreignKeyBlogs) {
      await queryRunner.dropForeignKey('blogs', foreignKeyBlogs);
    }

    const tableComments = await queryRunner.getTable('comments');
    const foreignKeyComments = tableComments.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('postId') !== -1,
    );
    if (foreignKeyComments) {
      await queryRunner.dropForeignKey('comments', foreignKeyComments);
    }

    await queryRunner.changeColumn(
      'users',
      'updated_at',
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: `'2024-03-26 23:45:03.825'`,
      }),
    );
    await queryRunner.changeColumn(
      'users',
      'created_at',
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: '2024-03-26 23:45:03.825',
      }),
    );

    await queryRunner.dropColumn('blogs', 'userId');
    await queryRunner.addColumn(
      'blogs',
      new TableColumn({
        name: 'userId',
        type: 'character varying',
        length: '40',
        isNullable: false,
      }),
    );

    await queryRunner.changeColumn(
      'blogs',
      'updated_at',
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: `'2024-03-26 23:45:03.825'`,
      }),
    );
    await queryRunner.changeColumn(
      'blogs',
      'created_at',
      new TableColumn({
        name: 'created_at',

        type: 'timestamp',
        default: `'2024-03-26 23:45:03.825'`,
      }),
    );
    await queryRunner.changeColumn(
      'posts',
      'updated_at',
      new TableColumn({
        name: 'updated_at',

        type: 'timestamp',
        default: `'2024-03-26 23:45:03.825'`,
      }),
    );
    await queryRunner.changeColumn(
      'posts',
      'created_at',
      new TableColumn({
        name: 'created_at',

        type: 'timestamp',
        default: `'2024-03-26 23:45:03.825'`,
      }),
    );
    await queryRunner.changeColumn(
      'comments',
      'updated_at',
      new TableColumn({
        name: 'updated_at',

        type: 'timestamp',
        default: `'2024-03-26 23:45:03.825'`,
      }),
    );
    await queryRunner.changeColumn(
      'comments',
      'created_at',
      new TableColumn({
        name: 'created_at',

        type: 'timestamp',
        default: `'2024-03-26 23:45:03.825'`,
      }),
    );

    await queryRunner.renameColumn('blogs', 'userId', 'user_id');
  }
}
