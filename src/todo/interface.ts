import { ApiPropertyOptional } from '@nestjs/swagger';
import { ESortBy, EStatus } from 'src/constants/enum';

export class QueryOptions {
  @ApiPropertyOptional()
  search?: string;

  @ApiPropertyOptional({ enum: EStatus })
  status?: EStatus;

  @ApiPropertyOptional({ enum: ESortBy })
  sortBy?: ESortBy;

  @ApiPropertyOptional()
  size?: number;

  @ApiPropertyOptional()
  page?: number;
}
