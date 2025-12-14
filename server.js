const WebSocket = require('ws');

// Renderの環境変数からポートを取得するか、デフォルトを使用
const PORT = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', ws => {
  console.log('クライアントが接続しました');
  ws.on('message', message => {
    console.log(`受信メッセージ: ${message}`);
    // メッセージをすべての接続クライアントにブロードキャスト
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`サーバー応答: ${message}`);
      }
    });
  });
  ws.on('close', () => console.log('切断しました'));
});

console.log(`WebSocketサーバーがポート${PORT}で起動しました`);
