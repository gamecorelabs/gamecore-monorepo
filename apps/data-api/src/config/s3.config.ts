import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const S3_CONFIG = {
  bucket: process.env.AWS_S3_BUCKET_NAME!,
  postTempImagesPath: "post/temp",
  boardPostImagePath: "post/board-post",
  newsPostImagesPath: "post/news-post",
};
