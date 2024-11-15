import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
	{ path: "",
		redirect:"/shopping-lists"
	},
	{
		path: '/shopping-lists',
		name: 'Shopping List - List',
		component: () => import('@/plugins/lib@shopping-list/shopping-lists/shopping-lists.vue')
	},
	{
		path: '/shopping-list/:id',
		name: 'Shopping List - Detail',
		component: () => import('@/plugins/lib@shopping-list/shopping-list-detail/a-list.vue')
	},

]

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes
})



export default router