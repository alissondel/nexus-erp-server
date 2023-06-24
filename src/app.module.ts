import { Module } from '@nestjs/common'
import { join } from 'path'

// IMPORT TYPEORM
import { TypeOrmModule } from '@nestjs/typeorm'

// IMPORT THROTTLER
import { ThrottlerModule } from '@nestjs/throttler'

// IMPORT GRAPHQL
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'

// IMPORT MODULES
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'
import { UserFilesModule } from './modules/user-files/user-files.module'

// IMPORT ENTITIES
import { UserEntity } from './modules/users/entities/user.entity'
import { UserFileEntity } from './modules/user-files/entities/user-file.entity'

// IMPORT DOTENV
import * as dotenv from 'dotenv'
dotenv.config()

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      entities: [UserEntity, UserFileEntity],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    UserFilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
