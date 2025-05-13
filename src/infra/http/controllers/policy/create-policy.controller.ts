import { Body, Controller, Post } from '@nestjs/common';
import { CreatePolicyUseCase } from '@/domain/policy/application/use-cases/create-policy.use-case';
import { EnumFrequency, EnumPaymentMethod } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

interface CreatePolicyBody {
  name: string;
  accountId: string;
  productId: string;
  policyNumber: string;
  validity: Date;
  frequency: EnumFrequency;
  monthlyPremium?: number;
  annualPremium?: number;
  paymentMethod: EnumPaymentMethod;
  dueDate: Date;
  paymentDay?: number;
}

@ApiTags('Policies')
@Controller('policies')
export class CreatePolicyController {
  constructor(private createPolicyUseCase: CreatePolicyUseCase) {}

  @Post()
  async create(@Body() body: CreatePolicyBody) {
    const result = await this.createPolicyUseCase.execute(body);
    return result;
  }
}
