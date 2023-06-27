import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

// IMPORT STATE
import { StateEntity } from './entities/state.entity'
import { StatesService } from './states.service'
import { StatesResolver } from './states.resolver'

// IMPORTS MODULES
import { CitiesModule } from '../cities/cities.module'

@Module({
  imports: [TypeOrmModule.forFeature([StateEntity]), CitiesModule],
  providers: [StatesResolver, StatesService],
  exports: [StatesService],
})
export class StatesModule {}
