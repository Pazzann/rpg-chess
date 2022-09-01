import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { Response } from 'express';
import { readdir, readFile, writeFile } from 'fs/promises';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImagesController {
  constructor(private imageService: ImagesService) {}

  @Get('/assets/:name')
  async getImage(@Param('name') imageName: string, @Res() res: Response) {
    const files = await readdir('./assets');
    if (!files.includes(imageName)) throw new BadRequestException();
    res.sendFile(path.resolve(__dirname + `/../../assets/${imageName}`));
  }

  @Post('/assets')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (file.mimetype != 'image/jpeg' && file.mimetype != 'image/png')
      throw new BadRequestException('File is not an image');
    const name = Date.now() + '-' + file.originalname;
    writeFile(path.resolve(__dirname + `/../../assets/${name}`), file.buffer);
    return name;
  }
}
