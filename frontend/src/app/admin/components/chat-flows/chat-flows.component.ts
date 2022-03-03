import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HelperService } from 'src/app/shared/services';
import { adminNotify } from '../../enums';
import { BotService } from '../../services/bot.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-chat-flows',
  templateUrl: './chat-flows.component.html'
})
export class ChatFlowsComponent implements OnInit {

  mybots: any[] = [];
  selectedBot:any
  modalRef: BsModalRef = new BsModalRef();
  @ViewChild('installGuideModel') installGuideModel?: TemplateRef<any>;
  constructor(
    private botService: BotService,
    private modalService: BsModalService,
    private help: HelperService,
		private confirmService: ConfirmationDialogService,
  ) { }

  ngOnInit(): void {
    this.getBots();
  }

  getBots(){
    this.botService.getBots()
    .subscribe((res:any)=>{
      console.log(res);
      this.mybots = res
    },(error:any)=>{
        // this.helperService.notify('error', error);
    });
  }

  openModal(bot:any) {
    this.selectedBot = bot
    if(this.installGuideModel){
      this.modalRef  = this.modalService.show(this.installGuideModel, {class: 'modal-xl bg-transparent',backdrop : 'static',keyboard : false});
    }
  }

  deleteBotById(botId:string){
		this.confirmService.confirm(adminNotify.confirm.customerDelete).subscribe((result:boolean) => {
      if(result){
				this.botService.deleteBotById(botId).subscribe((res:any)=>{
					console.log(res);
					this.getBots();
					this.help.notify('success',adminNotify.success.deleteBot);

				},(error:any)=>{
					console.log(error)
						// this.helperService.notify('error', error);
				});
			}
		});
  }

}
