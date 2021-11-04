import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', {
  send: (action: string, ...args: []) => {
    ipcRenderer.send(action, ...args);
  },
  subscribe: (action: string, callback: (...args) => void) => {
    ipcRenderer.on(action, (_, ...args) => callback(...args));
  },
  toggleWidth: (showResult: boolean) => {
    if (showResult) {
      ipcRenderer.send('show-results');
    } else {
      console.log('hiding-results');
      ipcRenderer.send('hide-results');
    }
  },
});
