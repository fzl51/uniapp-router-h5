<template>
  <view class="content">
    <page-meta>
      <head>
        <title>{{title}} - uniapp seo</title>
        <meta name="description" :content="description"/>
        <meta name="keywords" :content="keywords"/>
      </head>
    </page-meta>
    <image class="logo" src="/static/logo.png"></image>
    <text>当前页面:{{ path }}</text>
    <text>页面组件:{{ route }}</text>
    <navigator url="/id/1">文章1</navigator>
    <navigator url="/id/2">文章2</navigator>
    <navigator url="/id/3">文章3</navigator>
    <navigator url="/id/4">文章4</navigator>
    <navigator url="/id/0">文章默认</navigator>
    <navigator url="/seo/pages.json">测试pages.json设置的路由</navigator>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title:"这是动态路由首页",
      description:"我是首页网站描述词",
      keywords:"我是首页关键词",
      path: this.$route.path,
      route: this.$route.meta.route,
      args: JSON.stringify(this.$route?.params || {})
    }
  },
  onLoad() {
  },
  methods: {

  }
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>