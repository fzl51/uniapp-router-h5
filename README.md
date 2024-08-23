# uniapp-router-h5  for  <a href="https://uniapp.dcloud.net.cn">uni-app</a>

#### 仅支持uni-app Vue3项目 不支持Vue2 (因为uni-app vue2不支持ssr)

## uni-app ssr(服务器渲染) + 动态路由(伪静态) + seo优化

## 用途：

实现uni-app的h5项目的搜索引擎seo优化提高网站排名终极解决方案。

## 功能：

1. uni-app h5项目(Vue3)动态路由 也就是伪静态路由(网上并没有相关的功能 据说有一家支持但收费)<br><br>
2. ssr(服务器渲染)将uni-app项目在服务器上转为静态页面并实现服务端的动态路由。<br><br>
3. 突破uni-app官方ssr必须托管代码并使用uniCloud(云函数)的限制 可以任何平台运行<br><br>
4. seo优化 支持每个页面设置meta 关键词 描述等 (动态路由设置页面关键词有单独的说明)

## 开始使用：

1. 下载安装

```sh
git clone https://github.com/fzl51/uniapp-router-h5.git
cd uniapp-router-h5
npm install
```

2. 运行

```sh
npm start
```

或者

```sh
node main.js
```

此时打开 http://localhost:8080 鼠标右键查看源码看seo效果
演示：[https://v.yy2169.com](https://v.yy2169.com)
## 使用文档：

### uniapp_seo目录

uni-app项目源码 里面是演示如何使用。<br>

1. 在main.js导入路由 会自动hook路由增加动态路由(伪静态)

```js
//uniapp_seo/main.js
import './router'
```

2. 配置路由方法1: uniapp_seo/router.js (推荐) 2选1

```js
//uniapp_seo/router.js
const seoRoutes = {
    "/pages/index/id": "/id/:id"
}
```

3. 配置路由方法2: 直接在pages.json 设置简单(微信小程序端会有提示 可以加条件编译)
```json
{
    "path": "pages/index/seo",
    "style": {
      // #ifdef H5 
      "seoPath":"/seo/:name",
      // #endif 
      "navigationBarTitleText": "uni-app seo 动态路由 伪静态"
    }
}
```

4. 路由格式：支持动态高级路由(伪静态) /id/:id 这种路径也支持 /h5 这样的静态路径
<br><br>
5. seo优化 在页面级组件直接写下面代码即可
 ```html
#uniapp_seo/pages/index/seo.vue
<page-meta>
    <head>
        <title>标题</title>
        <meta name="description" content="uniapp h5 seo搜索引擎优化 支持伪静态" />
        <meta name="keywords" content="uniapp seo,uniapp ssr,uniapp 伪静态" />
    </head>
</page-meta>
```
6. 动态页面设置不同的meta关键词 页面数据等信息<br>
```js
//uniapp_seo/pages/index/id.vue 具体看这个演示代码
export default {
            data() {
                const idData={
                    "1": {
                        "title": "这是文章1的标题 黑神话悟空",
                        "keywords": "这是文章1的关键词",
                        "description": "这是文章1的description",
                        "content": "文章1：黑神话悟空"
                    },
                    "2": {
                        "title": "这是文章2的标题 全红婵",
                        "keywords": "这是文章2的关键词",
                        "description": "这是文章2的description",
                        "content": "文章2：全红婵"
                    },
                    "default": {
                        "keywords": "这是默认的关键词",
                        "description": "这是默认的描述",
                        "content": "我是默认的内容"
                    }
                }
                return {
                    ...idData[this.$route?.params?.id||"default"]
                }
            }
}
```
7. 也可以在服务端写代码实现动态路由seo优化 我们[演示项目](https://v.yy2169.com)在服务端实现的.<br>为了减少复杂度我们~~删除了服务端实现部分代码~~。<br>不然一会uni-app项目设置一会在服务端代码设置 人都醉了。<br>
服务端设置动态路由seo 优点是每次更改不需要重新编译。<br>注意：⚠️服务端实现seo优化就不要在页面组件实现

```js
//routes.js
const meta={
    "/": {
        "keywords": "这是默认的关键词",
        "description": "这是默认的描述",
    },
    "/id/1": {
        "title": "这是文章1的标题 黑神话悟空",
        "keywords": "这是文章1的关键词",
        "description": "这是文章1的description",
    }
}
const head = meta["/id/1"];//  /id/1 根据请求页面动态获取
if (head) {
    let headStr = ''
    for (const key in head) {
     headStr += key==='title'?`<title>${head[key]}</title>\n`: `<meta name="${key}" content="${head[key]}">\n`
    }
    //finalHtml是routes.js文件里的
    if (headStr) finalHtml = finalHtml.replace(/(<head[^>]*>)(?!.*<head[^>]*>)/i, `$1\n${headStr}\n`);
}
```

## uni-app HBuilder X设置

### 1.在uniapp设置路由mode:   **history**

<img src="./img/1724013127179.jpg">

### 2.发布的时候设置ssr发行 (**Vue3才支持**)

<img src="./img/1724012956765.jpg">


## web 目录

web是uniapp  HBuilder X选择ssr发行H5项目后生成。直接复制到网站目录即可<br>



## 注意事项

1. 不能有环境代码。详情可以看官方的[说明](https://doc.dcloud.net.cn/uni-app-x/web/ssr.html) 比如 window document
2. 还有很多api不支持 比如 uni.getSystemInfoSync uni.createSelectorQuery uni.createAnimation
3. 注意链接是否是onclik事件 需要使用navigator
4. 如果有不兼容的代码 会node报错 不会服务器渲染 但不影响网页运行
5. ssr很多代码不兼容 多到让你怀疑人生 做好心里准备。