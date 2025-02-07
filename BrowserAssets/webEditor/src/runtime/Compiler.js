/* eslint-disable no-param-reassign */

// import regenerator from 'regenerator';
import { BlockCommonApi } from '@/blockly/generators/JavaScript/blocklyUtil';
import regeneratorRuntime from 'regenerator-runtime';

// eslint-disable-next-line import/prefer-default-export
export const needAwaitKeys = [
  'wait',
  'waitForWhile',
  `${BlockCommonApi.CallUnityApiUntilEnd}`
];

export const entryApiKeys = [
  'wait',
  'onStart',
  'isRunning',
  'waitForWhile',
  'notifyFunMainEnd',
  `${BlockCommonApi.CallUnityApi}`,
  `${BlockCommonApi.CallUnityApiUntilEnd}`,
  `${BlockCommonApi.CallJsApi}`
];

const handleAsyncFunctions = (sCode) => {
  // eslint-disable-next-line no-control-regex
  let code = sCode.replace(/[\t\x0B\f]*(function)[\s*\(|\s*]/gi, ($1) => {
    if ($1.replace(/\s/gi, '') !== 'function') {
      return `async ${$1}`;
    }
    return `async ${$1}`;
  });

  needAwaitKeys.forEach((fnName) => {
    const regex = new RegExp(`s*(${fnName})[s*(|s*]`, 'g');
    code = code.replace(regex, $1 => `await ${$1}`);
  });

  return code;
};

const runCodeLowVersion = async function (scopeClassName, code) {
  const injectScopes = [];
  const injectKeys = [];
  entryApiKeys.forEach((item) => {
    if (typeof this[item] !== 'undefined') {
      if (typeof this[item] === 'function') {
        injectScopes.push(this[item].bind(this));
      } else {
        injectScopes.push(this[item]);
      }
      injectKeys.push(item);
    }
  });

  const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;
  let handler = null;
  try {
    handler = new AsyncFunction(
      ...injectKeys,
      scopeClassName,
      'regeneratorRuntime',
      code
    );
  } catch (e) {
    console.error('create handler error', code);
    if (window.Raven) {
      window.Raven.captureException(e);
    }
  }

  if (handler) {
    try {
      const result = await handler(...injectScopes, this, regeneratorRuntime);
      return result;
    } catch (e) {
      console.warn('[Droplet].runCode error: ', e);
    }
  }

  return {};
};

const compileCode = (sCode) => {
  if (!sCode) return '';
  let code = handleAsyncFunctions(sCode);
  if (/await /.test(code)) {
    code = `(async () => { ${code} })();`;
  }

  // TODO: 临时解决参数为(?), compile时候报错问题，导致每次都要转代码并失败
  code = code.replace(/\(\?\)\;/g, '();');

  // TODO: 要不要加个 await、async 的判断
  // try {
  //   // eslint-disable-next-line prefer-destructuring
  //   code = regenerator.compile(code).code;
  // } catch (e) {
  //   console.error('compileCode error', e);
  //   throw e;
  // }

  return code;
};

const runCode = async (scope, code) => {
  const scopeClassName = scope.constructor.name || 'BlockFuncApi';
  return runCodeLowVersion.bind(scope)(scopeClassName, code);
};

export { compileCode, runCode };
