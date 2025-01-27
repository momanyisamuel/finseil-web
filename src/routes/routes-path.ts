import { lazyLoad } from '../lib/lazyLoad';

export type UIRoutesType = {
	name: string;
	path: string;
	component: React.FC;
	children?: UIRoutesType[];
};

/**
 * Define your routes
 * @type {Record<keyof typeof UIRoutes, UIRoutesType>}
 */
const UIRoutes = {
	register: {
		name: 'navigation.register',
		path: '/register',
		component: lazyLoad(() => import('../page/auth/Register')),
	},
	login: {
		name: 'navigation.login',
		path: '/',
		component: lazyLoad(() => import('../page/auth/Login')),
	},
	verifyAuth: {
		name: 'navigation.verifyAuth',
		path: '/verify-auth',
		component: lazyLoad(() => import('../page/auth/VerifyAuth')),
	},
	dashboard: {
		name: 'navigation.dashboard',
		path: '/dashboard',
		component: lazyLoad(() => import('../page/dashboard/Dashboard')),
	},
	leads: {
		name: 'navigation.leads',
		path: '/leads',
		component: lazyLoad(() => import('../page/leads/Leads')),
	},
	newLead: {
		name: 'navigation.newLead',
		path: '/leads/new',
		component: lazyLoad(() => import('../page/leads/NewLead')),
	},
	editLead: {
		name: 'navigation.editLead',
		path: '/leads/:id',
		component: lazyLoad(() => import('../page/leads/NewLead')),
	},
	agents: {
		name: 'navigation.agents',
		path: '/agents',
		component: lazyLoad(() => import('../page/agents/Agents')),
	},
	newAgent: {
		name: 'navigation.newAgent',
		path: '/agents/new',
		component: lazyLoad(() => import('../page/agents/NewAgent')),
	},
	editAgent: {
		name: 'navigation.editAgent',
		path: '/agents/:id',
		component: lazyLoad(() => import('../page/agents/NewAgent')),
	},
	settings: {
		name: 'navigation.settings',
		path: '/settings',
		component: lazyLoad(() => import('../page/settings/Settings'))
	},
};

export const RoutesPath: Record<keyof typeof UIRoutes, UIRoutesType> = UIRoutes;
