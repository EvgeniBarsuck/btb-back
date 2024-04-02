import { CommandBus } from '@nestjs/cqrs';
import { CreateController } from '../cqrs/command/create/create.controller';
import { createMockLogger } from './__mocks__/create-logger';
import { commandBus } from './__mocks__/create.command-bus';
import { Logger } from '@nestjs/common';
import { CreateBlogResponseDto } from '../cqrs/command/create/dto/create.response.dto';
import { createStubs } from './stubs/create.stubs';

describe('Unit testing create blog controller', () => {
  let _commandBus: CommandBus;
  let _logger: Logger;
  let createController: CreateController;
  let response: CreateBlogResponseDto;

  beforeAll(async () => {
    _commandBus = commandBus();
    _logger = createMockLogger();
    createController = new CreateController(_commandBus, _logger);
  });

  describe('Testing positive outcomes', () => {
    beforeEach(async () => {
      response = await createController.create(
        { longDescription: '', name: '', shortDescription: '' },
        { sub: '' },
      );
    });

    it('Controller must be defiend', () => {
      expect(createController.create).toBeDefined();
    });

    it('Controller must be return id', async () => {
      expect(JSON.stringify(response)).toBe(JSON.stringify(createStubs()[1]));
    });

    it('Controller must be return id #2', async () => {
      expect(JSON.stringify(response)).toBe(JSON.stringify(createStubs()[2]));
    });
  });

  describe('Testing negative outcomes', () => {
    it('Controller must return err', async () => {
      try {
        response = await createController.create(
          { longDescription: '', name: '', shortDescription: '' },
          { sub: '' },
        );
        expect((response as any).status).toBe(400);
      } catch (e: any) {
        expect(e.status).toBe(400);
      }
    });
  });
});
