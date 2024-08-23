<template>
	<view class="content">
		<page-meta>
			<head>
				<title>{{title}} - uniapp seo</title>
				<meta name="description" :content="description" />
				<meta name="keywords" :content="keywords" />
			</head>
		</page-meta>
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">文章内容：{{ content }}</text>
		</view>

		<navigator url="/">首页</navigator>
		<navigator url="/id/1">文章1</navigator>
		<navigator url="/id/2">文章2</navigator>
		<navigator url="/id/3">文章3</navigator>
		<navigator url="/id/4">文章4</navigator>
		<navigator url="/id/5">文章5</navigator>
		<navigator url="/id/0">文章默认</navigator>
		<navigator url="/seo/pages.json">测试pages.json设置的路由</navigator>
		<view>文章id：{{ id }}</view>
		<view>动态参数：{{ args }}</view>
		<text>当前页面:{{ path }}</text>
		<text>页面组件:{{ route }}</text>

	</view>
</template>

<script>
	export default {
		data() {
			const id = this.$route?.params?.id
			const idData=this.getID(id);
			if(idData?.title){
				uni.setNavigationBarTitle({
					title:idData.title
				})
			}
			return {
				id: 0,
				content: "无文章内容",
				path: this.$route.path,
				route: this.$route.meta.route,
				args: JSON.stringify(this.$route?.params || {}),
				...idData
			}
		},
		onLoad() {},
		methods: {
			getID(id) {
				const ids = {
					"1": {
						"title": "这是文章1的标题",
						"keywords": "这是文章1的关键词",
						"description": "这是文章1的description",
						"content": "我是文章1的内容"
					},
					"2": {
						"title": "这是文章2的标题",
						"keywords": "这是文章2的关键词",
						"description": "这是文章2的description",
						"content": "我是文章2的内容"
					},
					"3": {
						"title": "这是文章3的标题 黑神话悟空",
						"keywords": "这是文章3的关键词",
						"description": "这是文章3的description",
						"content": "文章3：黑神话悟空"
					},
					"4": {
						"title": "这是文章4的标题 全红婵",
						"keywords": "这是文章4的关键词",
						"description": "这是文章4的description",
						"content": "文章4：全红婵"
					},
					"5": {
						"title": "这是文章5的标题 AI人工智能",
						"keywords": "这是文章5的关键词",
						"description": "这是文章5的description",
						"content": "文章5：AI人工智能"
					},
					"default": {
						"keywords": "这是默认的关键词",
						"description": "这是默认的描述",
						"content": "我是默认的内容"
					}
				}
				return ids[id] || ids['default']
			}
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