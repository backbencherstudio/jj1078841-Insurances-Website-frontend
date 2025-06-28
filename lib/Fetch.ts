import axios from 'axios';
import { AppConfig } from '../config/app.config';

type AdapterOption = 'fetch' | 'axios';

interface HeadersConfig {
  headers?: Record<string, string>;
}

export class Fetch {
  private static _baseUrl = `${AppConfig().app.apiUrl}`;
  private static _adapter: AdapterOption = 'axios';

  static setAdapter(adapter: AdapterOption) {
    this._adapter = adapter;
  }

  static async get(url: string, config?: HeadersConfig) {
    const fullUrl = `${this._baseUrl}${url}`;

    if (this._adapter === 'axios') {
      return await axios.get(fullUrl, config);
    } else {
      const res = await fetch(fullUrl, {
        method: 'GET',
        headers: config?.headers,
      });
      return await res.json();
    }
  }

  static async post(url: string, data: any, config?: HeadersConfig) {
    const fullUrl = `${this._baseUrl}${url}`;
    const isMultipart = config?.headers?.['Content-Type']?.includes('multipart/form-data');

    if (this._adapter === 'axios') {
      return await axios.post(fullUrl, data, config);
    } else {
      const res = await fetch(fullUrl, {
        method: 'POST',
        headers: isMultipart ? undefined : config?.headers,
        body: isMultipart ? data : JSON.stringify(data),
      });
      return await res.json();
    }
  }

  static async put(url: string, data: any, config?: HeadersConfig) {
    const fullUrl = `${this._baseUrl}${url}`;

    if (this._adapter === 'axios') {
      return await axios.put(fullUrl, data, config);
    } else {
      const res = await fetch(fullUrl, {
        method: 'PUT',
        headers: config?.headers,
        body: JSON.stringify(data),
      });
      return await res.json();
    }
  }

  static async patch(url: string, data: any, config?: HeadersConfig) {
    const fullUrl = `${this._baseUrl}${url}`;
    const isMultipart = config?.headers?.['Content-Type']?.includes('multipart/form-data');

    if (this._adapter === 'axios') {
      return await axios.patch(fullUrl, data, config);
    } else {
      const res = await fetch(fullUrl, {
        method: 'PATCH',
        headers: isMultipart ? undefined : config?.headers,
        body: isMultipart ? data : JSON.stringify(data),
      });
      return await res.json();
    }
  }

  static async delete(url: string, config?: HeadersConfig) {
    const fullUrl = `${this._baseUrl}${url}`;

    if (this._adapter === 'axios') {
      return await axios.delete(fullUrl, config);
    } else {
      const res = await fetch(fullUrl, {
        method: 'DELETE',
        headers: config?.headers,
      });
      return await res.json();
    }
  }
}
