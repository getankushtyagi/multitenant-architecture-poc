import { Controller, Post, Body } from '@nestjs/common';
import { OrgService } from './org.service';

@Controller('org')
export class OrgController {
  constructor(private readonly orgService: OrgService) {}

  @Post('create')
  async createOrg(@Body('name') name: string) {
    const msg = await this.orgService.createTenant(name);
    return { message: msg };
  }
}