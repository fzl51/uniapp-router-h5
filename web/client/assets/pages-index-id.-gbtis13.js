import{s as t,r as e,c as a,w as s,i as l,o as n,a as o,b as d,t as i,d as r,e as u,f as c,g as p}from"./index-Br3lLF_Y.js";import{_ as f,r as _,a as m,b as g,c as h}from"./logo.CYWyW8FD.js";const w=f({data(){var e,a,s;const l=null==(a=null==(e=this.$route)?void 0:e.params)?void 0:a.id,n=this.getID(l);return(null==n?void 0:n.title)&&t({title:n.title}),{id:0,content:"无文章内容",path:this.$route.path,route:this.$route.meta.route,args:JSON.stringify((null==(s=this.$route)?void 0:s.params)||{}),...this.getID(l)}},onLoad(){},methods:{getID(t){const e={1:{title:"这是文章1的标题",keywords:"这是文章1的关键词",description:"这是文章1的description",content:"我是文章1的内容"},2:{title:"这是文章2的标题",keywords:"这是文章2的关键词",description:"这是文章2的description",content:"我是文章2的内容"},3:{title:"这是文章3的标题 黑神话悟空",keywords:"这是文章3的关键词",description:"这是文章3的description",content:"文章3：黑神话悟空"},4:{title:"这是文章4的标题 全红婵",keywords:"这是文章4的关键词",description:"这是文章4的description",content:"文章4：全红婵"},5:{title:"这是文章5的标题 AI人工智能",keywords:"这是文章5的关键词",description:"这是文章5的description",content:"文章5：AI人工智能"},default:{keywords:"这是默认的关键词",description:"这是默认的描述",content:"我是默认的内容"}};return e[t]||e.default}}},[["render",function(t,f,w,y,k,v){const I=_(e("page-meta-head"),m),j=_(e("page-meta"),g),$=u,x=c,D=l,b=p;return n(),a(D,{class:"content"},{default:s((()=>[o(j,null,{default:s((()=>[o(I,null,{default:s((()=>[d("title",null,i(t.title)+" - uniapp seo",1),d("meta",{name:"description",content:t.description},null,8,["content"]),d("meta",{name:"keywords",content:t.keywords},null,8,["content"])])),_:1})])),_:1}),o($,{class:"logo",src:h}),o(D,{class:"text-area"},{default:s((()=>[o(x,{class:"title"},{default:s((()=>[r("文章内容："+i(k.content),1)])),_:1})])),_:1}),o(b,{url:"/"},{default:s((()=>[r("首页")])),_:1}),o(b,{url:"/id/1"},{default:s((()=>[r("文章1")])),_:1}),o(b,{url:"/id/2"},{default:s((()=>[r("文章2")])),_:1}),o(b,{url:"/id/3"},{default:s((()=>[r("文章3")])),_:1}),o(b,{url:"/id/4"},{default:s((()=>[r("文章4")])),_:1}),o(b,{url:"/id/5"},{default:s((()=>[r("文章5")])),_:1}),o(b,{url:"/id/0"},{default:s((()=>[r("文章默认")])),_:1}),o(b,{url:"/seo/pages.json"},{default:s((()=>[r("测试pages.json设置的路由")])),_:1}),o(D,null,{default:s((()=>[r("文章id："+i(k.id),1)])),_:1}),o(D,null,{default:s((()=>[r("动态参数："+i(k.args),1)])),_:1}),o(x,null,{default:s((()=>[r("当前页面:"+i(k.path),1)])),_:1}),o(x,null,{default:s((()=>[r("页面组件:"+i(k.route),1)])),_:1})])),_:1})}],["__scopeId","data-v-31dd7c63"]]);export{w as default};