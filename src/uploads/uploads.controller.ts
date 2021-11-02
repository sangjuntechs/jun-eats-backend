import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';

const BUCKET_NAME = 'sangjunjuneats123';

@Controller('uploads')
export class UploadsController {
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    AWS.config.update({
      credentials: {
        accessKeyId: 'AKIARHU5NBZ2W25BVAF6',
        secretAccessKey: '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',
      },
    });
    try {
      const objectName = `${Date.now() + file.originalname}`;
      await new AWS.S3()
        .putObject({
          Body: file.buffer,
          Bucket: BUCKET_NAME,
          Key: objectName,
          ACL: 'public-read',
        })
        .promise();
      const fileUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${objectName}`;
      return { url: fileUrl };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
