import { Err, Ok } from 'ts-results';
import { createStubs } from '../stubs/create.stubs';
import { BadGatewayException } from '@nestjs/common';

const _createStubs = createStubs();

export const commandBus = jest.fn().mockReturnValue({
  execute: jest
    .fn()
    .mockReturnValue({
      map: () => Ok(_createStubs[0]),
    })
    .mockReturnValueOnce({
      map: () => Ok(_createStubs[0]),
    })
    .mockReturnValueOnce({
      map: () => Ok(_createStubs[1]),
    })
    .mockReturnValueOnce({
      map: () => Ok(_createStubs[2]),
    })
    .mockReturnValueOnce({
      map: () => Err({ status: 400, message: 'Error' }),
      mapErr: (err) =>{
        throw new BadGatewayException(err.message)
      },
    }),
});
