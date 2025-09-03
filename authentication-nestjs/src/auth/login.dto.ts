/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class Login {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
