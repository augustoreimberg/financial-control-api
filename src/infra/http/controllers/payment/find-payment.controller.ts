import { Controller, Get, Param, Query } from '@nestjs/common';
import { FindPaymentUseCase } from '@/domain/payment/application/use-cases/find-payment.use-case';
import { EnumPaymentStatus } from '@prisma/client';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
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
  @ApiQuery({ name: 'policyId', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, enum: EnumPaymentStatus })
  @ApiQuery({
    name: 'dueDateMonth',
    required: false,
    type: Number,
    description: 'Mês de vencimento (1-12)',
  })
  @ApiQuery({
    name: 'dueDateYear',
    required: false,
    type: Number,
    description: 'Ano de vencimento (1900-2100)',
  })
  async findAll(
    @Query('policyId') policyId?: string,
    @Query('status') status?: EnumPaymentStatus,
    @Query('dueDateMonth') dueDateMonth?: number,
    @Query('dueDateYear') dueDateYear?: number,
  ): Promise<FindPaymentResponse> {
    const result = await this.findPaymentUseCase.execute({
      policyId,
      status,
      dueDateMonth: dueDateMonth ? Number(dueDateMonth) : undefined,
      dueDateYear: dueDateYear ? Number(dueDateYear) : undefined,
    });
    return result;
  }
}
