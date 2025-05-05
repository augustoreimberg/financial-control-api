import { Controller, Get, Post, Body, Param, Query } from "@nestjs/common"
import { FindUpcomingPaymentsUseCase } from "@/domain/payment/application/use-cases/find-upcoming-payments.use-case"
import { FindOverduePaymentsUseCase } from "@/domain/payment/application/use-cases/find-overdue-payments.use-case"
import { UpdateOverduePaymentsUseCase } from "@/domain/payment/application/use-cases/update-overdue-payments.use-case"
import { MarkPaymentAsPaidUseCase } from "@/domain/payment/application/use-cases/mark-payment-as-paid.use-case"
import { ApiTags } from "@nestjs/swagger"

@ApiTags("Payment Management")
@Controller("payment")
export class PaymentManagementController {
  constructor(
    private findUpcomingPaymentsUseCase: FindUpcomingPaymentsUseCase,
    private findOverduePaymentsUseCase: FindOverduePaymentsUseCase,
    private updateOverduePaymentsUseCase: UpdateOverduePaymentsUseCase,
    private markPaymentAsPaidUseCase: MarkPaymentAsPaidUseCase,
  ) {}

  @Get("upcoming")
  async findUpcoming(@Query("days") days?: number) {
    return this.findUpcomingPaymentsUseCase.execute({ days: days ? Number(days) : undefined });
  }

  @Get("overdue")
  async findOverdue() {
    return this.findOverduePaymentsUseCase.execute()
  }

  @Post("update-overdue")
  async updateOverdue() {
    return this.updateOverduePaymentsUseCase.execute()
  }

  @Post(":id/mark-as-paid")
  async markAsPaid(@Param("id") id: string, @Body() body: { paymentDate?: Date }) {
    return this.markPaymentAsPaidUseCase.execute({
      id,
      paymentDate: body.paymentDate,
    })
  }
}

