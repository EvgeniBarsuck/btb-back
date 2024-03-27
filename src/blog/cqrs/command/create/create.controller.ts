import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Result } from 'ts-results';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/auth/decorators/user.decorator';

import { CreateBlogRequestBodyDto } from './dto/create.request.dto';
import { CreateResponseDto } from './dto/create.response.dto';
import { CreateCommand } from './create.command';

@Controller('blogs')
@ApiTags('Blogs')
export class CreateController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    type: CreateBlogRequestBodyDto,
  })
  @ApiCreatedResponse({
    type: CreateResponseDto,
  })
  async create(
    @Body() body: CreateBlogRequestBodyDto,
    @Res() res: Response,
    @User() user: { sub: string },
  ) {
    const registerCommand = new CreateCommand({ ...body, userId: user.sub });

    const cretateCommandResult = await this.commandBus.execute<
      CreateCommand,
      Result<CreateResponseDto, { created: false }>
    >(registerCommand);

    cretateCommandResult
      .map((val) => {
        return res.status(HttpStatus.CREATED).send(val);
      })
      .mapErr((err) => {
        return res.status(HttpStatus.BAD_REQUEST).send(err);
      });
  }
}
