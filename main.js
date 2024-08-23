global.webPath = './web/' //设置server跟client文件所在路径
global.navigator = {} //补环境 非必须
const express = require('express');
const app = express();
const webRoutes = require('./routes');
app.use(webRoutes)
app.use(express.static(`${webPath}client`));
process.on('uncaughtException', (err) => {
    console.error('未捕获的异常:', err);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('未处理的 Promise 异常:', reason);
});
// 监听端口
app.listen(8080, () => {
    console.log('Server is running at http://localhost:8080');
});
