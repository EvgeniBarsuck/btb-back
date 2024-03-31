import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const config = {
  global: true,
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '1w' },
};

export default registerAs('jwt', () => config);
