import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateTodoDto } from './create-todo.dto';
import { EStatus } from 'src/constants/enum';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional({ enum: EStatus })
  status?: EStatus;
}
