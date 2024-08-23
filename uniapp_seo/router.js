const pathKeys = {}

/*
不要在首页或者tab页面上设置动态路由 
该路由设置方法在配置前必须先在pages.json配置有该页面才能设置动态路由
/pages/index/id 是你需要实现动态路由的页面 
*/
const seoRoutes = {
	"/pages/index/id": "/id/:id",
}
const hookRoute = (routes) => {
	if (!routes && typeof __uniRoutes !== 'undefined') routes = __uniRoutes
	if (!Array.isArray(routes)) return routes
	const needPush = []
	for (const route of routes) {
		let seoPath = route?.meta?.seoPath || seoRoutes[route.path];
		if (!seoPath) {
			if (!route.path || route.alias) continue;
			const seoPathSplit = route.path.split('/')
			seoPath = `/${seoPathSplit[seoPathSplit.length-1]}`
		}
		const newRoute = {}
		for (const k in route) newRoute[k] = route[k];
		newRoute.path = seoPath
		if (pathKeys[seoPath]) continue;
		pathKeys[seoPath] = newRoute
		needPush.push(pathKeys[seoPath])
	}
	routes.push(...needPush);
	return routes
}

function matchPath(path, routes = pathKeys) {
	if (!path || typeof path !== 'string') return null
	for (const route in routes) {
		const regex = new RegExp('^' + route.replace(/:\w+/g, '[^/]+'));
		if (regex.test(path)) {
			return routes[route];
		}
	}
	return null;
}

function seoHook(path) {
	if (!path || typeof path !== 'string') return null
	path = path.split("?")[0];
	if (pathKeys[path]) return pathKeys[path]
	const hookData = matchPath(path, pathKeys);
	if (hookData) hookData.alias = path;
	return hookData
}

//该拦截器如果跟你的守卫有冲突 需要自行合并到你的守卫代码里 seoHook(args.url)
function addInterceptor() {
	// 要拦截的页面跳转方法列表
	const navigationMethods = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab'];
	// 设置拦截器
	navigationMethods.forEach(method => {
		uni.addInterceptor(method, {
			invoke(args) {
				const seoHookData = seoHook(args.url);
				return true; // 允许跳转
			},
			fail(e) {
				console.error(e)
			}
		});
	});
}
const routes = hookRoute();

// #ifdef H5
if (typeof uni !== 'undefined' && uni.addInterceptor) {
	addInterceptor()
}
// #endif
export default {
	hookRoute,
	routes,
	seoHook,
	addInterceptor,
	pathKeys,
	matchPath,
}