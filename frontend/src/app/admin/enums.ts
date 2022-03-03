import { environment } from "src/environments/environment"

export const adminConfig = {
    uploads : environment.uploads,
    backend : environment.backend + "api/v1/admin/",
    frontend : environment.frontend,
    botEntity : "bot",
    faqEntity : "faq",
    customerEntity : "customer",
    resourceUsageEntity : "resource-usage",
    report : "report",
}

export const adminApi = {
    bot:{
        create: adminConfig.backend + adminConfig.botEntity,
        findAll: adminConfig.backend + adminConfig.botEntity,
        findOne: adminConfig.backend + adminConfig.botEntity,
        update: adminConfig.backend + adminConfig.botEntity,
        remove: adminConfig.backend + adminConfig.botEntity,
    },
    faq:{
        create: adminConfig.backend + adminConfig.faqEntity,
        findAll: adminConfig.backend + adminConfig.faqEntity,
        findOne: adminConfig.backend + adminConfig.faqEntity,
        update: adminConfig.backend + adminConfig.faqEntity,
        remove: adminConfig.backend + adminConfig.faqEntity,
    },
    customer:{
        create: adminConfig.backend + adminConfig.customerEntity,
        findAll: adminConfig.backend + adminConfig.customerEntity,
        findOne: adminConfig.backend + adminConfig.customerEntity,
        update: adminConfig.backend + adminConfig.customerEntity,
        remove: adminConfig.backend + adminConfig.customerEntity,
    },
    report:{
        leadcount: adminConfig.backend + adminConfig.report+'/leadcount',
        usercount: adminConfig.backend + adminConfig.report+'/usercount',
        visitorcount: adminConfig.backend + adminConfig.report+'/visitorcount',
    },
		resourceUsage:{
			create: adminConfig.backend + adminConfig.resourceUsageEntity,
			findAll: adminConfig.backend + adminConfig.resourceUsageEntity,
			findOne: adminConfig.backend + adminConfig.resourceUsageEntity,
			update: adminConfig.backend + adminConfig.resourceUsageEntity,
			remove: adminConfig.backend + adminConfig.resourceUsageEntity,
	},
    upload: adminConfig.backend + "upload"
}

export const adminNotify = {
    success : {
        createBot: 'Bot have been created.',
        updateBot: 'Bot have been updated.',
        createFaq: 'Faq have been created.',
        updateFaq: 'Faq have been updated.',
        copyContent: 'Copied successfully.',
        deleteBot: 'Delete successfully.',
        faqBot: 'Delete successfully',
        deleteCustomer: 'Delete successfully',
        
    },
    error : {
        updateProfileDetails: 'Some thing is not correct.',
    },
    confirm : {
        botDelete: {title:"Delete bot"},
        faqDelete: {title:"Delete faq"},
        customerDelete: {title:"Delete customer"},
        resourceLimit: {
					title:"Create resource limit",
					message:"you have reached to create new resourse limit",
					btnOkText:"Buy Now"
				},
    },
    texts : {
        noDataToDisplay : "No data to display",
        dataFatching : "Please wait... data is fatching from server."
    }
}