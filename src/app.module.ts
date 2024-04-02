import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';

import { UserModule } from '@app/user/user.module';
import { BlogModule } from '@app/blog/blog.module';
import { PostModule } from '@app/post/post.module';
import { CommentModule } from '@app/comment/comment.module';
import typeorm from '@app/config/typeorm';
import jwt from '@app/config/jwt';
import { winstonConfig } from '@app/config/winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm, jwt],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    WinstonModule.forRoot({
      levels: winstonConfig.levels,
      format: winstonConfig.format,
      transports: winstonConfig.transports,
    }),
    UserModule,
    BlogModule,
    PostModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
