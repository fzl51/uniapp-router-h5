const {render} = require(`${webPath}server/entry-server`);
const fs = require('fs');
const path = require('path');
const templatePath = path.resolve(__dirname, `${webPath}server/index.html`);// 读取模板 HTML 文件
const ssrMainFest = require(`${webPath}server/ssr-manifest.json`);
let templateHtml = fs.readFileSync(templatePath, 'utf-8');
//获取路由
const routes = __uniRoutes.reduce((acc, item) => {
    acc[item.path] = item;
    if (item['alias']) {
        acc[item.alias] = item;
    }
    return acc;
}, {});

function matchPath(path) {
    if (!path || typeof path !== 'string') return null
    for (const route in routes) {
        if (route === '/') continue; //跳过首页动态路由 重要
        const regex = new RegExp('^' + route.replace(/:\w+/g, '[^/]+'));
        if (regex.test(path)) {
            return routes[route];
        }
    }
    return null;
}

module.exports = async (req, res, next) => {
    const parentPath = req.path.replace(/^\/|\/$/g, '');
    const rootPath = `/${parentPath}`;
    const pagePath = routes[rootPath] || matchPath(rootPath)
    if (!pagePath) return next()
    try {
        // 调用 render 函数
        const {title, headMeta, preloadLinks, appHtml, appContext} = await render(req, ssrMainFest);
        // 替换模板中的占位符
        let finalHtml = templateHtml
            .replace('<!--preload-links-->', preloadLinks)
            .replace('<!--app-context-->', appContext)
            .replace('<!--app-html-->', `${appHtml}`);
        // 设置标题
        if (headMeta) finalHtml = finalHtml.replace(/(<head[^>]*>)(?!.*<head[^>]*>)/i, `$1\n${headMeta}\n`);
        if(headMeta&&headMeta.indexOf("<title")>=0){ //防止冲突 判断是否在页面设置了动态标题
            finalHtml = finalHtml.replace(/<title>(.*?)<\/title>/g, `<title>${title}</title>`);
        }
        finalHtml = finalHtml.replaceAll('uni-view', `div`);
        finalHtml = finalHtml.replaceAll('uni-text', `span`);
        finalHtml = finalHtml.replaceAll('uni-navigator', `div`);
        finalHtml = finalHtml.replaceAll('uni-app', `div`);
        finalHtml = finalHtml.replaceAll('uni-page-wrapper', `div`);
        finalHtml = finalHtml.replaceAll('uni-page-body', `div`);
        finalHtml = finalHtml.replaceAll('uni-page', `div`);
        //替换注释
        finalHtml = finalHtml.replace(/<!--[\s\S]*?-->|\/\*[\s\S]*?\*\//g, '');
        // 返回最终的 HTML
        return res.send(finalHtml);
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error');
    }

}
