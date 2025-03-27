import { Public } from '@/infra/auth/public'
import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Health')
@Controller('/health')
@Public()
export class HeatlhCheckController {
  constructor() {}

  @Get()
  async healthCheck() {
    return {
      status: true,
      message: 'Geisom is running',
    }
  }
}
