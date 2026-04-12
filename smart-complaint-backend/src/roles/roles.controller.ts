import { Controller, Get } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private service: RolesService) {}

  @Get()
  getRoles() {
    return this.service.findAll();
  }
}