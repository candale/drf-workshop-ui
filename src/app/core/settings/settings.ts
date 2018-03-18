import { environment } from '@environment';

const baseUrl = environment.production ? 'http://mgr-api.florin.me/api/' : 'http://localhost:8000/api/';

export const Settings = {
  api: {
    base: baseUrl,
    task: `${baseUrl}task/`,
    list: `${baseUrl}list/`,
    item: `${baseUrl}item/`,
  }
};
