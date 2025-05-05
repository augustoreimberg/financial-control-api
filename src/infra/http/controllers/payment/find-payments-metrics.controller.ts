import { Controller, Get } from '@nestjs/common';
import { GetPaymentsMetricsUseCase } from '@/domain/payment/application/use-cases/find-payments-metrics.use-case';

@Controller('metrics')
export class GetPaymentsMetricsController {
  constructor(private getPaymentsMetricsUseCase: GetPaymentsMetricsUseCase) {}

  @Get('payments')
  async handle() {
    const result = await this.getPaymentsMetricsUseCase.execute();

    return {
      total: result.total,
      statuses: {
        paid: result.paid,
        pending: result.pending,
        defeated: result.defeated,
      },
    };
  }
}
