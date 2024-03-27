import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationsBetweenUserBlogAndPOstComment1711531284712
  implements MigrationInterface
{
  name = 'AddRelationsBetweenUserBlogAndPOstComment1711531284712';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blogs" RENAME COLUMN "user_id" TO "userId"`,
    );
    await queryRunner.query(`ALTER TABLE "comments" ADD "postId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "comments" ALTER COLUMN "created_at" SET DEFAULT '"2024-03-27T09:21:26.912Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ALTER COLUMN "updated_at" SET DEFAULT '"2024-03-27T09:21:26.912Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ALTER COLUMN "created_at" SET DEFAULT '"2024-03-27T09:21:26.912Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ALTER COLUMN "updated_at" SET DEFAULT '"2024-03-27T09:21:26.912Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "blogs" ALTER COLUMN "created_at" SET DEFAULT '"2024-03-27T09:21:26.912Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "blogs" ALTER COLUMN "updated_at" SET DEFAULT '"2024-03-27T09:21:26.912Z"'`,
    );
    await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "blogs" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT '"2024-03-27T09:21:26.912Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT '"2024-03-27T09:21:26.912Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "blogs" ADD CONSTRAINT "FK_50205032574e0b039d655f6cfd3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blogs" DROP CONSTRAINT "FK_50205032574e0b039d655f6cfd3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT '2024-03-26 23:45:03.825'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT '2024-03-26 23:45:03.825'`,
    );
    await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "blogs" ADD "userId" character varying(40) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "blogs" ALTER COLUMN "updated_at" SET DEFAULT '2024-03-26 23:45:03.825'`,
    );
    await queryRunner.query(
      `ALTER TABLE "blogs" ALTER COLUMN "created_at" SET DEFAULT '2024-03-26 23:45:03.825'`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ALTER COLUMN "updated_at" SET DEFAULT '2024-03-26 23:45:03.825'`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ALTER COLUMN "created_at" SET DEFAULT '2024-03-26 23:45:03.825'`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ALTER COLUMN "updated_at" SET DEFAULT '2024-03-26 23:45:03.825'`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ALTER COLUMN "created_at" SET DEFAULT '2024-03-26 23:45:03.825'`,
    );
    await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "postId"`);
    await queryRunner.query(
      `ALTER TABLE "blogs" RENAME COLUMN "userId" TO "user_id"`,
    );
  }
}
