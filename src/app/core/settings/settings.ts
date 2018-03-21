import { environment } from '@environment';

const baseUrl = environment.production ? 'http://mgr-api.florin.me/api/' : 'http://localhost:8000/api/';

export const Settings = {
  api: {
    base: baseUrl,
    tasks: {
      boards: `${baseUrl}task/boards/`,
      items: `${baseUrl}task/items/`,
    }
  }
};
