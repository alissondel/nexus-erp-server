import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
  Get,
  Res,
  Param,
  UseGuards,
} from '@nestjs/common'
import { UserFilesService } from './user-files.service'
import { FileInterceptor } from '@nestjs/platform-express'
import multerConfig from './multer-config'
import { Request, Response } from 'express'
import { join } from 'path'
import { GqlAuthGuard } from '../auth/jwt-auth.guard'
import { Context } from '@nestjs/graphql'

@Controller('files')
export class UserFilesController {
  constructor(private readonly filesService: UserFilesService) {}

  @Get(':filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const regex = /\\/

    const filePath = join(__dirname, '../../../public/upload/user-files')
    const teste = filePath.slice(0, 200) + regex + filename
    res.sendFile(teste)
  }

  @Post()
  @UseGuards(GqlAuthGuard)
  @UseInterceptors(FileInterceptor('arquivo', multerConfig))
  async uploadArquivo(
    @UploadedFile() file: Express.Multer.File, //eslint-disable-line
    @Req() req: Request,
    @Res() res: Response,
    @Context() context,
  ) {
    return await this.filesService.salvarDados(file, req, res, context)
  }
}
