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
import { StatesModule } from './modules/states/states.module'
import { CitiesModule } from './modules/cities/cities.module'
import { BrandsModule } from './modules/brands/brands.module'
import { CategoriesModule } from './modules/categories/categories.module'
import { GroupsModule } from './modules/groups/groups.module'
import { SubGroupsModule } from './modules/sub_groups/sub_groups.module'
import { ProductsModule } from './modules/products/products.module'

// IMPORT ENTITIES
import { UserEntity } from './modules/users/entities/user.entity'
import { UserFileEntity } from './modules/user-files/entities/user-file.entity'
import { StateEntity } from './modules/states/entities/state.entity'
import { CityEntity } from './modules/cities/entities/city.entity'
import { BrandEntity } from './modules/brands/entities/brand.entity'

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
      entities: [
        UserEntity,
        UserFileEntity,
        StateEntity,
        CityEntity,
        BrandEntity,
      ],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    UserFilesModule,
    StatesModule,
    CitiesModule,
    BrandsModule,
    CategoriesModule,
    GroupsModule,
    SubGroupsModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
