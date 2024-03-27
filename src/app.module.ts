import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import typeorm from './config/typeorm';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
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
