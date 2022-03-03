export enum Action {
	Manage = 'manage',
	Create = 'create',
	Read = 'read',
	Update = 'update',
	Delete = 'delete',
}

export const adminResources = {
	dashboard: {
		basic: "dashboard.basic"
	},
	bot: {
		branding: "bot.branding"
	},
	conversations: {
		livechat: "conversations.livechat"
	},
	crm: {
		basic: "conversations.basic",
		create: "conversations.create",
		export: "conversations.export"
	},
}

export const availablePlans: any = {
	basic: {
		permits: [
			adminResources.dashboard.basic,
			adminResources.crm.basic,
		],
		limits: {
			bot: 2,
			faq: 20,
			lead: 10000,
			upload: 5,
		}
	},
	advance: {
		permits: [
			adminResources.dashboard.basic,
			adminResources.conversations.livechat,
			adminResources.crm.basic,
			adminResources.crm.create,
			adminResources.crm.export,
		],
		limits: {
			bot: 10,
			faq: 1000,
			lead: 100000,
			upload: 10,
		}
	},
	pro: {
		permits: [
			adminResources.dashboard.basic,
			adminResources.bot.branding,
			adminResources.conversations.livechat,
			adminResources.crm.basic,
			adminResources.crm.create,
			adminResources.crm.export,
		],
		limits: {}
	},
}