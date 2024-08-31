# p5viewer README

p5viewer is a Visual Studio Code extension that allows you to preview p5.js sketches directly within the editor. This extension provides a seamless way to see the results of your p5.js code in real-time without leaving the editor.

## Features

- **Real-time Preview**: You can preview your p5.js sketches by right-clicking on the JavaScript file containing the sketch and selecting "Start p5.js Preview" from the context menu.
- **Node.js HTTP Server**: The extension uses a Node.js HTTP server to serve the sketch. By default, it uses port 5511.
- **Integrated with VS Code**: The preview is displayed within a VS Code webview panel, allowing you to stay within the editor while working on your sketches.

## Requirements

- **Node.js**: This extension uses a Node.js HTTP server to serve the p5.js sketches.
- **Visual Studio Code**: This extension requires Visual Studio Code to be installed.

## Known Issues

- **Performance**: Large sketches may cause the preview to be slow.
- **Port Conflicts**: If port 5511 is already in use, the extension may not work correctly. You may need to configure a different port.
- **Browser Compatibility**: Some browser features may not be fully supported within the VS Code webview.

## extension guidelines

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
