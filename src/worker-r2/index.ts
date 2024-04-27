import { IEnv, IUploadR2, Method } from '../interfaces';
export default async (
  method: Method,
  { file, fileName }: IUploadR2,
  env: IEnv
) => {
  switch (method) {
    case 'PUT':
      return env.FREEDOME_BUCKET.put(fileName, file);
    case 'GET':
      const object = await env.FREEDOME_BUCKET.get(fileName);
      if (object === null) return null;
      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set('etag', object.httpEtag);
      return { ...object.body, ...headers };
    case 'DELETE':
      return env.FREEDOME_BUCKET.delete(fileName);
  }
};
