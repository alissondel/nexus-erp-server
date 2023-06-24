import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

// IMPORT INTERCEPTORS
import { ConflictInterceptor } from './commom/errors/interceptors/conflict.interceptors'
import { UnauthorizedInterceptor } from './commom/errors/interceptors/unauthorized.interceptors'
import { NotFoundInterceptor } from './commom/errors/interceptors/notfound.interceptors'

import helmet from 'helmet'
import { NestExpressApplication } from '@nestjs/platform-express'

// IMPORT DOTENV
import * as dotenv from 'dotenv'
dotenv.config()

const port = normalizePort(process.env.PORT || '8080')

const configCors = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.enableCors(configCors)
  app.use(helmet())

  app.useGlobalInterceptors(new ConflictInterceptor())
  app.useGlobalInterceptors(new UnauthorizedInterceptor())
  app.useGlobalInterceptors(new NotFoundInterceptor())

  await app.listen(+port)
  console.log(`🚀 Server is running at port: http://localhost:${port} 🚀`)
}

function normalizePort(val: string) {
  const port = parseInt(val, 10)

  if (isNaN(port)) return val

  if (port >= 0) return port

  return false
}

bootstrap()
