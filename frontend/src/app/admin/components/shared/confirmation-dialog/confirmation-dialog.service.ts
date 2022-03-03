import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@Injectable({
	providedIn: 'root'
})
export class ConfirmationDialogService {

	public modalRef?: BsModalRef;
	constructor(
		private modalService: BsModalService
	) { }

	public confirm(content:any = {}) {
		let defaultContent = {
			title : "Confirm",
			message: "This action cannot be undo.",
			btnOkText: 'Delete',
			btnCancelText: 'Cancel',
			dialogSize: 'sm'
		}
		content = {...defaultContent, ...content}
		const {title, message, btnOkText, btnCancelText} = content
		this.modalRef = this.modalService.show(ConfirmationDialogComponent, { class: 'modal-md', backdrop: 'static', keyboard: false });
		this.modalRef.content.title = title;
		this.modalRef.content.message = message;
		this.modalRef.content.btnOkText = btnOkText;
		this.modalRef.content.btnCancelText = btnCancelText;
		return this.modalRef.content.onClose;

	}

}
