import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';
import { TaskStatus } from 'src/types/task-status.enum';

export class TaskDto {
  @ApiProperty({ example: 'Clean the house' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Daily homework as part of my daily basis' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'Daily homework as part of my daily basis' })
  @IsString()
  status: TaskStatus;

  @IsDateString()
  creationDate: string;
}
