import { Body, Controller, Put, Param } from "@nestjs/common"
import { UpdatePaymentUseCase } from "@/domain/payment/application/use-cases/update-payment.use-case"
import { EnumPaymentStatus } from "@prisma/client"
import { ApiTags } from "@nestjs/swagger"

interface UpdatePaymentBody {
  paymentStatus?: EnumPaymentStatus
  price?: number
}

@ApiTags("Payments")
@Controller("payments")
export class UpdatePaymentController {
  constructor(private updatePaymentUseCase: UpdatePaymentUseCase) {}

  @Put(":id")
  async update(@Param("id") id: string, @Body() body: UpdatePaymentBody) {
    const result = await this.updatePaymentUseCase.execute({
      id,
      ...body,
    })
    return result
  }
}

