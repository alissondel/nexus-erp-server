import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

// IMPORT CITY
import { CityEntity } from './entities/city.entity'
import { CitiesService } from './cities.service'
import { CitiesResolver } from './cities.resolver'

// IMPORT USER
import { UsersModule } from '../users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity]), UsersModule],
  providers: [CitiesResolver, CitiesService],
  exports: [CitiesService],
})
export class CitiesModule {}
