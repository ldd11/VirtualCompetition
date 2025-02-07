/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-misused-promises */
import axios from 'axios';
import 'url-search-params-polyfill';
const appkeyConfig = {
  dev: '971c9e1b3c93460f9b937df233924e33',
  test: 'ba2f241c32a542dca721a3b5d4980640',
  prod: '63a87c32f0764a6f842220d29ef1e1f8',
  preview: '63a87c32f0764a6f842220d29ef1e1f8',
};

function getEnv() {
  let env = 'prod';
  const { hostname } = window.location;
  if (['dev.coding.qq.com', 'localhost'].includes(hostname)) {
    env = 'dev';
  } else if (hostname === 'test.coding.qq.com') {
    env = 'test';
  } else {
    env = 'prod';
  }

  // TODO: 临时处理
  env = 'test';
  return env;
}

function getServer() {
  const serverMap = {
    prod: 'srv.coding.qq.com',
    test: 'test.srv.coding.qq.com',
    dev: 'dev.srv.coding.qq.com',
  };
  const env = getEnv();
  return serverMap[env];
}

// @ts-ignore
const env = window.envServer ? (window.envServer.getEnv() || 'dev') : getEnv();
// @ts-ignore
const domain = window.envServer ? (window.envServer.getServer('campus').server || 'dev.srv.coding.qq.com') : getServer();

const appkey = appkeyConfig[env];
const wujiVersion = getWujiVersion();
const isPreview = wujiVersion !== null;
const url = isPreview ? `https://${domain}/wuji/api/switch/object` : `https://${domain}/wuji/api/object`;

function getWujiVersion() {
  let searchParams = new URLSearchParams('');
  if (window.location.search) {
    searchParams = new URLSearchParams(window.location.search.slice(1));
  }
  const val = searchParams.get('wuji-version');
  return val;
}

async function get(options: any) {
  return new Promise((async (resolve, reject) => {
    if (typeof options !== 'object') {
      reject(new Error('wuji options error'));
    }

    // 必须提供表名
    if (!options.table) {
      reject(new Error('wuji options.table error'));
    }

    const schemaid = options.table; // 表名
    delete options.table;

    const { id } = options; // 主键
    const reqUrl = id ? `${url}/${id}` : url;

    // 包含字段
    if (Array.isArray(options.include)) {
      options.include = options.include.join(',');
    }

    // 排除一些系统字段
    if (!options.include) {
      const exclude = options.exclude || [];
      const sysKeys = ['_ctime', '_mtime'];
      options.exclude = [...exclude, ...sysKeys];
    }

    // 排除字段
    if (Array.isArray(options.exclude)) {
      options.exclude = options.exclude.join(',');
    }

    const defaultOptions = {
      appid: 'coding',
      appkey,
      version: '',
    };

    if (wujiVersion) {
      defaultOptions.version = wujiVersion;
    }

    try {
      const res = await axios({
        url: reqUrl,
        method: 'get',
        timeout: 3000,
        params: {
          schemaid,
          ...defaultOptions,
          ...options,
        },
      });
      const { data } = res;
      if (data?.data && data.code === 200) {
        resolve(data.data);
      }
      reject(new Error(`wuji get error: ${data}`));
    } catch (err) {
      reject(new Error(`wuji get error: ${err}`));
    }
  }));
}

export {
  get,
};
