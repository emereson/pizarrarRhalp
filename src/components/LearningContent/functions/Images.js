import { ACCESS_LEVELS, S3Service } from 'services/S3.service';
import { v4 as uuid } from 'uuid';

const s3Service = new S3Service('public', 'image/png');

export const UploadImageS3 = fileBlob => {
  return new Promise(async (response, reject) => {
    const file = {
      name: `slides/file_branak_${uuid()}.png`,
      blob: fileBlob
    };
    const { key } = await s3Service.uploadFile(file, ACCESS_LEVELS.PUBLIC);

    if (key) response(key);
    else reject('an error has occurred');
  });
};
