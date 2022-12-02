# Electron Study

- #01 Main - Renderer process Communication 

- package.json에 main으로 지정한 스크립트 파일이 electron의 main process를 컨트롤하고 renderer process를 관리한다.

- electron의 main process와 renderer process는 명백하게 맡은 부분이 다 달라서 renderer process(HTML DOM을 관리하는 프로세스)에서 Node.js API를 직접적으로 사용할 수 없고,
반대로도 main process(API 및 컨트롤타워)에서 HTML DOM에 직접적으로 통제가 불가능하다. 이와 같은 문제를 해결하기 위해선 electron의 ipcMain과 ipcRenderer modules을 사용하여 상호 프로세스의 
communication(inter-process communication => IPC)이 이루어져야 한다. 그래서 main process에 handler를 ipcMain.handle이라는 놈으로 setup하고 ipcRenderer.invoke로 해당 handler를 trigger해야하는데 이 trigger는 proload script파일에 지정한다. 
그러니까 쉽게 말해서 preload script에서 handler에 사용될 Function을 정의(지정)한다고 생각하고, handler를 받는 곳은 main process이며, handler의 implement는 renderer process에서 작성한다고 보면 된다.

