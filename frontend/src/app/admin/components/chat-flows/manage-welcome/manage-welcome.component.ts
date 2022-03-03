
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { adminNotify } from 'src/app/admin/enums';
import { BotService } from 'src/app/admin/services/bot.service';
import { UploadService } from 'src/app/admin/services/upload.service';
import { HelperService } from 'src/app/shared/services';

@Component({
  selector: 'app-manage-welcome',
  templateUrl: './manage-welcome.component.html',
})
export class ManageWelcomeComponent implements OnInit {

  botId: string = "";
  editingBot: any = {};
  formSubmited = false;
  formGroup = this.fb.group({
    welcomeMsg: ["", [Validators.required]],
    askEmailMsg: ["",[Validators.required] ],
    askPhoneMsg: ["",[Validators.required] ],
    askNameMsg: ["",[Validators.required] ],
   
  });

  public Editor = ClassicEditor;
  modalRef: BsModalRef = new BsModalRef();
  @ViewChild('installGuideModel') installGuideModel?: TemplateRef<any>;
  constructor(
    private fb: FormBuilder,
    private upload: UploadService,
    private botService: BotService,
    private help: HelperService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.botId){
        this.botId = params.botId;
        this.getBotById();
      }
    });
    
  }

  onSubmit() {
    this.formSubmited = true;
    if (this.formGroup.status == 'VALID') {
      let botId = this.botId;
      this.botService.updateBotById({ onboardjson:this.formGroup.value, botId })
      .subscribe((res: any) => {
        console.log(res);
        this.help.notify('success', adminNotify.success.updateBot);
        this.openModal()
      }, (error) => {
        console.log(error);
      });
    }
    else{
      // let errors = ValidationService.getError(this.formGroup);
      // console.log(errors);
      // let error = ValidationService.getFirstError(errors);
      // this.help.notify('error', error);
    }
  }

  getBotById() {
    this.botService.getBotById(this.botId)
      .subscribe((res: any) => {
        console.log(res);
        this.editingBot = res;
        this.formGroup.patchValue(this.editingBot.onboardjson);
      }, (error: any) => {
        // this.helperService.notify('error', error);
      });
  }

  openModal() {
    if(this.installGuideModel){
      this.modalRef  = this.modalService.show(this.installGuideModel, {class: 'modal-xl bg-transparent',backdrop : 'static',keyboard : false});
    }
  }
}

