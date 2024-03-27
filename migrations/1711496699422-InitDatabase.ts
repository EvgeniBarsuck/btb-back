import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDatabase1711496699422 implements MigrationInterface {
  name = 'InitDatabase1711496699422';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT '"2024-03-26T23:45:03.825Z"', "updated_at" TIMESTAMP NOT NULL DEFAULT '"2024-03-26T23:45:03.825Z"', "name" character varying(25), "password" character varying(25) NOT NULL, "email" character varying(100) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT '"2024-03-26T23:45:03.825Z"', "updated_at" TIMESTAMP NOT NULL DEFAULT '"2024-03-26T23:45:03.825Z"', "message" character varying(200) NOT NULL, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "blogs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT '"2024-03-26T23:45:03.825Z"', "updated_at" TIMESTAMP NOT NULL DEFAULT '"2024-03-26T23:45:03.825Z"', "name" character varying(30) NOT NULL, "user_id" character varying(40) NOT NULL, "short_description" character varying(200) NOT NULL, "long_description" text NOT NULL, CONSTRAINT "PK_e113335f11c926da929a625f118" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT '"2024-03-26T23:45:03.825Z"', "updated_at" TIMESTAMP NOT NULL DEFAULT '"2024-03-26T23:45:03.825Z"', "name" character varying NOT NULL, "short_description" character varying NOT NULL, "content" text NOT NULL, "blogId" uuid, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_comments_comments" ("usersId" uuid NOT NULL, "commentsId" uuid NOT NULL, CONSTRAINT "PK_bd2bee1dd4f223a5375dfb100de" PRIMARY KEY ("usersId", "commentsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_87f74d1bf427a3b83e3d12bcff" ON "users_comments_comments" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_691655888b469ad18bf0041ec8" ON "users_comments_comments" ("commentsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_55d9c167993fed3f375391c8e31" FOREIGN KEY ("blogId") REFERENCES "blogs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_comments_comments" ADD CONSTRAINT "FK_87f74d1bf427a3b83e3d12bcff4" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_comments_comments" ADD CONSTRAINT "FK_691655888b469ad18bf0041ec8d" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_comments_comments" DROP CONSTRAINT "FK_691655888b469ad18bf0041ec8d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_comments_comments" DROP CONSTRAINT "FK_87f74d1bf427a3b83e3d12bcff4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_55d9c167993fed3f375391c8e31"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_691655888b469ad18bf0041ec8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_87f74d1bf427a3b83e3d12bcff"`,
    );
    await queryRunner.query(`DROP TABLE "users_comments_comments"`);
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`DROP TABLE "blogs"`);
    await queryRunner.query(`DROP TABLE "comments"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
