import { ErrorAction, CloseAction, MessageTransports, MonacoLanguageClient, MonacoServices } from 'monaco-languageclient';
import { toSocket, WebSocketMessageReader, WebSocketMessageWriter, Trace } from 'vscode-ws-jsonrpc';
import normalizeUrl from 'normalize-url';
import ReconnectingWebSocket from 'reconnecting-websocket';

function createUrl(hostname: string, port: number, path: string): string {
  const protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  return normalizeUrl(`${protocol}://${hostname}:${port}${path}`);
}

function createLanguageClient(transports: MessageTransports): MonacoLanguageClient {
  return new MonacoLanguageClient({
    name: 'Python Language Client',
    clientOptions: {
      // use a language id as a document selector
      documentSelector: ['python'],
      synchronize: {
        configurationSection: 'python',
      },
      errorHandler: {
        error: () => ({ action: ErrorAction.Continue }),
        closed: () => ({ action: CloseAction.DoNotRestart }),
      },

    },
    // create a language client connection from the JSON RPC connection on demand
    connectionProvider: {
      get: () => Promise.resolve(transports),
    },
  });
}

function getLspPort() {
  // get port from url
  const url = new URL(window.location.href);
  const port = url.searchParams.get('pylsp');
  if (port) {
    return parseInt(port, 10);
  }
  return 7788;
}

export function initLsp() {
  MonacoServices.install();
  const url = createUrl('localhost', getLspPort(), '/');
  console.log('connecting to', url);
  const socketOptions = {
    maxReconnectionDelay: 10000,
    minReconnectionDelay: 1000,
    reconnectionDelayGrowFactor: 1.3,
    connectionTimeout: 10000,
    maxRetries: Infinity,
    debug: false,
  };
  const webSocket = new ReconnectingWebSocket(url, [], socketOptions);
  webSocket.onopen = () => {
    console.log('WebSocket opened');
    const socket = toSocket(webSocket as any);
    const reader = new WebSocketMessageReader(socket);
    const writer = new WebSocketMessageWriter(socket);
    const languageClient = createLanguageClient({
      reader,
      writer,
    });
    languageClient.start();
    languageClient.registerProposedFeatures();
    languageClient.setTrace(Trace.Verbose);
    reader.onClose(() => languageClient.stop());
  };
}

