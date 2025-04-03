import { Controller, Get } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { User } from "@/infra/auth/user.decorator"

@ApiTags("Auth")
@Controller("auth")
export class MeController {
  constructor() {}

  @Get("me")
  async me(@User() user: any) {
    return { user };
  }
}

