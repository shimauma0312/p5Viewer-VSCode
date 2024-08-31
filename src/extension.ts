import * as vscode from 'vscode';

function getWebviewContent(jsCode: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>p5.js Preview</title>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
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
  const jsCode = document.getText();

  // Webviewパネルを作成
  const panel = vscode.window.createWebviewPanel(
    'p5jsPreview',
    'p5.js Preview',
    vscode.ViewColumn.One,
    {
      enableScripts: true,
    }
  );

  // WebviewのHTMLコンテンツを設定
  panel.webview.html = getWebviewContent(jsCode);
} else {
  vscode.window.showErrorMessage('No active editor found.');
}
