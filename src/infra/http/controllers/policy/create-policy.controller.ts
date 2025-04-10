import { Body, Controller, Post } from "@nestjs/common"
import { CreatePolicyUseCase } from "@/domain/policy/application/use-cases/create-policy.use-case"
import { EnumFrequency, EnumPaymentMethod } from "@prisma/client"
import { ApiTags } from "@nestjs/swagger"
import { ResponsibleData } from "@/domain/policy/enterprise/entities/policy.entity"

interface CreatePolicyBody {
  name: string
  clientId: string
  responsible: ResponsibleData
  productId: string
  policyNumber: string
  validity: Date
  frequency: EnumFrequency
  monthlyPremium?: number
  annualPremium?: number
  paymentMethod: EnumPaymentMethod
  dueDate: Date
}

@ApiTags("Policies")
@Controller("policies")
export class CreatePolicyController {
  constructor(private createPolicyUseCase: CreatePolicyUseCase) {}

  @Post()
  async create(@Body() body: CreatePolicyBody) {
    const result = await this.createPolicyUseCase.execute(body);
    return result;
  }
}

