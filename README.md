# p5viewer README

p5viewer is a Visual Studio Code extension that allows you to preview p5.js sketches directly within the editor. This extension provides a seamless way to see the results of your p5.js code in real-time without leaving the editor.

## Features

- **Real-time Preview**: You can preview your p5.js sketches by right-clicking on the JavaScript file containing the sketch and selecting "Start p5.js Preview" from the context menu.
- **Node.js HTTP Server**: The extension uses a Node.js HTTP server to serve the sketch. By default, it uses port 5511.
- **Integrated with VS Code**: The preview is displayed within a VS Code webview panel, allowing you to stay within the editor while working on your sketches.

## Requirements

- **Node.js**: This extension uses a Node.js HTTP server to serve the p5.js sketches.
- **Visual Studio Code**: This extension requires Visual Studio Code to be installed.

以下のマークダウンをREADMEに追加してください：

## Installation

To get started with the extension, follow these steps:

1. **Install Dependencies**  
   Run the following command to install the required dependencies:
   ```bash
   npm install
   ```

2. **Compile TypeScript Code**  
   Compile the TypeScript code using:
   ```bash
   npm run compile
   ```

3. **Install vsce**  
   Install the `vsce` tool globally:
   ```bash
   npm install -g vsce
   ```

4. **Package the Extension**  
   Package the extension using `vsce`:
   ```bash
   vsce package
   ```

5. **Install the Extension in VS Code**  
   After packaging, install the generated `.vsix` file in VS Code. Open the **Extensions** view in VS Code and select **Install from VSIX...**.

## Known Issues

- **Performance**: Large sketches may cause the preview to be slow.
- **Port Conflicts**: If port 5511 is already in use, the extension may not work correctly. You may need to configure a different port.
- **Browser Compatibility**: Some browser features may not be fully supported within the VS Code webview.

## extension guidelines

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
