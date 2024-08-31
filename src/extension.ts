import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

function getWebviewContent(jsCode: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Webview</title>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"></script>
    </head>
    <body>
      <script>
        ${jsCode}
      </script>
    </body>
    </html>
  `;
}

const editor = vscode.window.activeTextEditor;
if (editor) {
  const document = editor.document;
  const fileName = document.fileName;

  if (path.extname(fileName) === '.js') {
    // プロジェクトのルートディレクトリを取得
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders && workspaceFolders.length > 0) {
      const rootPath = workspaceFolders[0].uri.fsPath;
      const port = '5511'; // 使用するポート番号を定義

      const nodeModulesPath = path.resolve(__dirname, '..', 'node_modules', 'http-server', 'bin', 'http-server');

      const jsCode = document.getText();

      const htmlContent = getWebviewContent(jsCode);
      const htmlFilePath = path.join(rootPath, 'index.html');

      fs.writeFileSync(htmlFilePath, htmlContent);

      const server = childProcess.spawn('node', [
        nodeModulesPath,
        rootPath,
        '-p',
        port,
      ]);

      server.stdout.on('data', (data: Buffer) => {
        console.log(`stdout: ${data.toString()}`);
      });

      server.stderr.on('data', (data: Buffer) => {
        console.error(`stderr: ${data.toString()}`);
      });

      server.on('close', (code: number) => {
        console.log(`child process exited with code ${code}`);
      });

      server.on('error', (err) => {
        console.error(err);
      });

      server.stdout.on('data', () => {
        const panel = vscode.window.createWebviewPanel(
          'p5jsPreview',
          'p5.js Preview',
          vscode.ViewColumn.One,
          {
            enableScripts: true,
          }
        );

        panel.webview.html = `
          <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Webview</title>
              <style>
                  body, html {
                  margin: 0;
                  padding: 0;
                  width: 100%;
                  height: 100%;
                  overflow: hidden;
                }
                iframe {
                  width: 100%;
                  height: 100%;
                  border: none;
                }
              </style>
            </head>
            <body>
              <iframe src="http://localhost:${port}/index.html"></iframe>
            </body>
          </html>
        `;
      });
    } else {
      vscode.window.showErrorMessage('No workspace folder is open.');
    }
  } else {
    vscode.window.showErrorMessage('The active file is not a JavaScript file.');
  }
} else {
  vscode.window.showErrorMessage('No active editor found.');
}
