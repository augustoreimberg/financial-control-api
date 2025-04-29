import { Body, Controller, Put, Param } from '@nestjs/common';
import { UpdatePolicyUseCase } from '@/domain/policy/application/use-cases/update-policy.use-case';
import { EnumFrequency, EnumPaymentMethod } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

interface UpdatePolicyBody {
  name?: string;
  accountId?: string;
  productId?: string;
  policyNumber?: string;
  validity?: Date;
  frequency?: EnumFrequency;
  monthlyPremium?: number;
  annualPremium?: number;
  paymentMethod?: EnumPaymentMethod;
  dueDate?: Date;
}

@ApiTags('Policies')
@Controller('policies')
export class UpdatePolicyController {
  constructor(private updatePolicyUseCase: UpdatePolicyUseCase) {}

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdatePolicyBody) {
    const result = await this.updatePolicyUseCase.execute({
      id,
      ...body,
    });
    return result;
  }
}
