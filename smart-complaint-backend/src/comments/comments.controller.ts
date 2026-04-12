import {Controller,Post,Get, Body,Param,ParseIntPipe,} from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private service: CommentsService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Get(':complaintId')
  get(@Param('complaintId', ParseIntPipe) id: number) {
    return this.service.getByComplaint(id);
  }
}