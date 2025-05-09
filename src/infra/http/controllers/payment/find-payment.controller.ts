import { Controller, Get, Param, Query } from '@nestjs/common';
import { FindPaymentUseCase } from '@/domain/payment/application/use-cases/find-payment.use-case';
import { EnumPaymentStatus } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { PaymentWithPolicyInfo } from '@/domain/payment/application/repositories/payment-with-policy-info';

interface FindPaymentResponse {
  payments: PaymentWithPolicyInfo[];
}

@ApiTags('Payments')
@Controller('payments')
export class FindPaymentController {
  constructor(private findPaymentUseCase: FindPaymentUseCase) {}

  @Get(':id')
  async findById(@Param('id') id: string): Promise<FindPaymentResponse> {
    const result = await this.findPaymentUseCase.execute({ id });
    return result;
  }

  @Get()
  async findAll(
    @Query('policyId') policyId?: string,
    @Query('status') status?: EnumPaymentStatus,
  ): Promise<FindPaymentResponse> {
    const result = await this.findPaymentUseCase.execute({ policyId, status });
    return result;
  }
}
