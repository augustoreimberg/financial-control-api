import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: true,
    methods: "*",
    credentials: true,
    allowedHeaders: "Content-Type, Accept, Authorization",
  })

  await app.listen(8080)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()

