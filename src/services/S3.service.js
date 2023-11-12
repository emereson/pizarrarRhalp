import { Storage } from 'aws-amplify';
import awsExports from '../aws-exports';

const S3_DOMAIN = 's3.amazonaws.com';

export const ACCESS_LEVELS = {
  PUBLIC: 'public',
  PROTECTED: 'protected',
  PRIVATE: 'private'
};

class S3Service {
  constructor(folder, contentType) {
    this.folder = folder;
    this.contentType = contentType;
    this.prefix = `https://${awsExports.aws_user_files_s3_bucket}.${S3_DOMAIN}/${this.folder}/`;
  }

  async uploadFile({ name, blob }, level = ACCESS_LEVELS.PUBLIC) {
    const { key } = await Storage.put(name, blob, {
      level
    });
    const presignedUrl = await this.getPresignedUrl(key);
    const fileUrl = `${this.prefix}${key}`;
    return { fileUrl, presignedUrl, key };
  }

  getPresignedUrl(key, level = ACCESS_LEVELS.PUBLIC) {
    return Storage.get(key, {
      level
    });
  }

  async uploadImage({ name, blob }, level = ACCESS_LEVELS.PUBLIC) {
    if (blob.type.match(/image.*/)) {
      // TODO: restrict image size
      try {
        return await this.uploadFile({ name, blob }, level);
      } catch (error) {
        console.error('error updating image', error);
        throw error;
      }
    } else {
      throw new Error('Choose an image file');
    }
  }

  async deleteFile(url) {
    const removedPrefix = url.replace(this.prefix, '');
    const result = await Storage.remove(removedPrefix);
    return result.$metadata.httpStatusCode === 204;
  }

  async deleteFileByName(fileName, level = ACCESS_LEVELS.PUBLIC) {
    const result = await Storage.remove(fileName, {
      level
    });
    return result.$metadata.httpStatusCode === 204;
  }
}

export { S3Service };
