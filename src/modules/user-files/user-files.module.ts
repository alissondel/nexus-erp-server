import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'

import { UserFilesController } from './user-files.controller'
import { UserFilesService } from './user-files.service'
import { UserFileEntity } from './entities/user-file.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserFileEntity])],
  controllers: [UserFilesController],
  providers: [UserFilesService],
  exports: [UserFilesService],
})
export class UserFilesModule {}
