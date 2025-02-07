declare module 'react-resize-panel';

declare module '@tencent/ec-console';

// window
declare interface Window {
  editor: monaco.editor.IStandaloneCodeEditor;
  AddPythonOutput: (output: string) => void;
  AddPythonError: (error: string) => void;
  SetPythonCode: (data: { code: string; toolbox: string }) => void;
  ClearPythonOutput: () => void;
  [key: string]: any;
}
