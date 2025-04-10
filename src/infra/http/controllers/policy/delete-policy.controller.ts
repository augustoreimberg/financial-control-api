import { Controller, Delete, Param } from "@nestjs/common"
import { DeletePolicyUseCase } from "@/domain/policy/application/use-cases/delete-policy.use-case"
import { ApiTags } from "@nestjs/swagger"

@ApiTags("Policies")
@Controller("policies")
export class DeletePolicyController {
  constructor(private deletePolicyUseCase: DeletePolicyUseCase) {}

  @Delete(":id")
  async delete(@Param("id") id: string) {
    const result = await this.deletePolicyUseCase.execute({ id });
    return result;
  }
}

