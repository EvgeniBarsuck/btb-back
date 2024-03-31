import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Logger,
  Param,
  Res,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Result } from 'ts-results';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { GetBlogResponseDto } from '@app/blog/cqrs/query/blog/dto/blog.response.dto';
import { BlogQuery } from '@app/blog/cqrs/query/blog/blog.query';
import { BadRequestExceptionDto } from '@libs/exception/dto/bad-request.exception.dto';
import { NotFoundExceptionDto } from '@libs/exception/dto/not-found.exception.dto';

@Controller('blogs')
@ApiTags('Blogs')
export class BlogController {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get(':blogId')
  @ApiOkResponse({
    type: GetBlogResponseDto,
  })
  @ApiBadRequestResponse({
    type: BadRequestExceptionDto,
  })
  @ApiNotFoundResponse({
    type: NotFoundExceptionDto,
  })
  async update(@Res() res: Response, @Param('blogId') blogId: string) {
    this.logger.log('info', 'Get blog by id');

    const blogQuery = new BlogQuery(blogId);

    const blogQueryResult = await this.queryBus.execute<
      BlogQuery,
      Result<GetBlogResponseDto, { found: false }>
    >(blogQuery);

    return blogQueryResult
      .map((val) => {
        this.logger.log('info', 'Get blog by id completed successfully')
        return res.status(HttpStatus.OK).send(val);
      })
      .mapErr((err) => {
        this.logger.error('Get blog by id failed with an error');
        return res.status(HttpStatus.BAD_REQUEST).send(err);
      }).val;
  }
}
