import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserFileEntity } from './entities/user-file.entity'
import { Request, Response } from 'express'
import { Context } from 'vm'
import {
  DecodeToken,
  ExtractTokenUser,
} from 'src/utils/token/base-64-converter'

@Injectable()
export class UserFilesService {
  constructor(
    @InjectRepository(UserFileEntity)
    private userPhotoRepository: Repository<UserFileEntity>,
  ) {}

  // eslint-disable-next-line
  async salvarDados(file: Express.Multer.File, req: Request, res: Response, context: Context) {
    const token: string | any = await ExtractTokenUser(context.req.rawHeaders)

    const decode = DecodeToken(token)

    const createdFileUser = {
      userId: +decode.id,
      fileName: file.filename,
      contentLength: file.size,
      contentType: file.mimetype,
      url: `${req.protocol}://${req.get('host')}/files/${file.filename}`,
    }

    await this.userPhotoRepository.save(createdFileUser)

    return res.status(200).send(createdFileUser)
  }
}
