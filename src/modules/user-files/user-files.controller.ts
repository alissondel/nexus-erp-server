import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
  Get,
  Res,
  Param,
} from '@nestjs/common'
import { UserFilesService } from './user-files.service'
import { FileInterceptor } from '@nestjs/platform-express'
import multerConfig from './multer-config'
import { Request, Response } from 'express'
import { join } from 'path'

@Controller('files')
export class UserFilesController {
  constructor(private readonly filesService: UserFilesService) {}

  @Get(':filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const regex = /\\/

    const filePath = join(__dirname, '../../../upload/files')
    const teste = filePath.slice(0, 200) + regex + filename
    res.sendFile(teste)
  }

  @Post()
  @UseInterceptors(FileInterceptor('arquivo', multerConfig))
  uploadArquivo(
    @UploadedFile() file: Express.Multer.File, //eslint-disable-line
    @Req() req: Request,
  ) {
    return this.filesService.salvarDados(file, req)
  }
}
