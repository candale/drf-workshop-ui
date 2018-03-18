import { environment } from '@environment';

const baseUrl = environment.production ? 'http://localhost:8000/api/' : 'http://192.168.1.177:8000/api/';

export const Settings = {
  api: {
    base: baseUrl,
    task: `${baseUrl}task/`,
    list: `${baseUrl}list/`,
    item: `${baseUrl}item/`,
  }
};
