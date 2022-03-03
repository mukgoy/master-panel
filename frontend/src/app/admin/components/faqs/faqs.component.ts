import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FaqService } from '../../services/faq.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BotService } from '../../services/bot.service';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/shared/services';
import { adminNotify } from '../../enums';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';




@Component({
	selector: 'app-faqs',
	templateUrl: './faqs.component.html'
})
export class FaqsComponent implements OnInit {
	botId = ""
	editingFaq = null;
	modalRef?: BsModalRef;
	@ViewChild('faqModel') faqModel?: TemplateRef<any>;

	faqs: any[] = [];

	constructor(
		private route: ActivatedRoute,
		private faqService: FaqService,
		private botService: BotService,
		private modalService: BsModalService,
		private help: HelperService,
		private confirmService: ConfirmationDialogService,

	) { }

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			if (params.botId) {
				this.botId = params.botId;
			}
			this.getFaqs();
			this.getBots();
		});
	}

	getFaqs() {
		this.faqService.getFaqs()
			.subscribe((res: any) => {
				console.log(res);
				this.faqs = res
			}, (error: any) => {
				// this.helperService.notify('error', error);
			});
	}

	mybots: any[] = [];
	getBots() {
		this.botService.getBots()
			.subscribe((res: any) => {
				console.log(res);
				this.mybots = res
			}, (error: any) => {
				// this.helperService.notify('error', error);
			});
	}

	openModal(editingFaq = null) {
		if (this.faqModel) {
			this.editingFaq = editingFaq;
			this.modalRef = this.modalService.show(this.faqModel, { class: 'modal-xl bg-transparent', backdrop: 'static', keyboard: false });
		}
	}

	onSuccess(event: Event) {
		this.getFaqs();
	}

	getFilteredFaqs() {
		if (this.botId) {
			return this.faqs.filter(faq => faq.bot.botId == this.botId)
		} else {
			return this.faqs
		}
	}
	deleteFaqById(faqId: string) {
		console.log(faqId)
		this.confirmService.confirm(adminNotify.confirm.customerDelete).subscribe((result: boolean) => {
			if (result) {
				this.faqService.deleteFaqById(faqId).subscribe((res: any) => {
					console.log(res);
					this.getFaqs();
					this.help.notify('success', adminNotify.success.faqBot);
				}, (error: any) => {
					console.log(error)
					// this.helperService.notify('error', error);
				});
			}
		});
	}
}
