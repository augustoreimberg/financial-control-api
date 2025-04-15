import { Controller, Get, Param, Query } from '@nestjs/common';
import { FindPolicyUseCase } from '@/domain/policy/application/use-cases/find-policy.use-case';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Policies')
@Controller('policies')
export class FindPolicyController {
  constructor(private findPolicyUseCase: FindPolicyUseCase) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    const result = await this.findPolicyUseCase.execute({ id });
    return result;
  }

  @Get()
  async findAll(@Query('policyNumber') policyNumber?: string) {
    const result = await this.findPolicyUseCase.execute({ policyNumber });
    return result;
  }
}
