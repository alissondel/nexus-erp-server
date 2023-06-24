import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserFileEntity } from './entities/user-file.entity'
import { Request } from 'express'

@Injectable()
export class UserFilesService {
  constructor(
    @InjectRepository(UserFileEntity)
    private userPhotoRepository: Repository<UserFileEntity>,
  ) {}

  // eslint-disable-next-line
  async salvarDados(file: Express.Multer.File, req: Request) {
    const arquivo = new UserFileEntity()
    arquivo.fileName = file.filename
    arquivo.contentLength = file.size
    arquivo.contentType = file.mimetype
    arquivo.url = `${req.protocol}://${req.get('host')}/files/${file.filename}`

    return await this.userPhotoRepository.save(arquivo)
  }
}
