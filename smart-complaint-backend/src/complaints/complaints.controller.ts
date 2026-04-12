import {Controller,Post,Get, Delete,Param,Body,Patch,Query,
} from '@nestjs/common';
import { ComplaintsService } from './complaints.service';

@Controller('complaints')
export class ComplaintsController {
  constructor(private service: ComplaintsService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Get()
  findAll(@Query('status') status: string) {
    return this.service.findAll(status);
  }

  @Get('user/:id')
  getUser(@Param('id') id: string) {
    return this.service.findByUser(Number(id));
  }

  @Patch(':id/assign')
  assign(
    @Param('id') id: string,
    @Body('reviewerId') reviewerId: number,
  ) {
    return this.service.assignReviewer(Number(id), reviewerId);
  }

  @Patch(':id/resolve')
  resolve(@Param('id') id: string) {
    return this.service.markResolved(Number(id));
  }

  @Delete(':id/:userId')
  delete(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ) {
    return this.service.delete(Number(id), Number(userId));
  }
}