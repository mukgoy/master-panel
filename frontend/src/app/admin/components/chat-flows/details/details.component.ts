import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { adminNotify } from 'src/app/admin/enums';
import { BotService } from 'src/app/admin/services/bot.service';
import { UploadService } from 'src/app/admin/services/upload.service';
import { BotEntity } from 'src/app/shared/entities';
import { HelperService } from 'src/app/shared/services';
import { EnumType } from 'typescript';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {
  defaultBot: BotEntity = new BotEntity();
  iconActive = {
    header : this.defaultBot.jsondata.header.logo,
    launcher : this.defaultBot.jsondata.launcher.logo,
  }
  colorActive = {
    bgColor1: this.defaultBot.jsondata.bgColor1,
    bgColor2: this.defaultBot.jsondata.bgColor2,
    textColor: this.defaultBot.jsondata.textColor
  }

  botId: string = "";
  editingBot: any = {};
  formSubmited = false;
  formGroup = this.fb.group({
    name: ["", [Validators.required]],
    jsondata: this.fb.group({
      isGradient: [true, [Validators.required]],
      bgColor1: [this.colorActive.bgColor1, [Validators.required]],
      bgColor2: [this.colorActive.bgColor2, [Validators.required]],
      textColor: [this.colorActive.textColor, [Validators.required]],
      header: this.fb.group({
        text: ["", [Validators.required]],
        logo: [this.iconActive.header, [Validators.required]]
      }),
      launcher: this.fb.group({
        text: ["", []],
        logo: [this.iconActive.header, [Validators.required]]
      }),
    })
  });

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
      let httpService;
      let notify:string;
      if (this.botId) {
        let botId = this.botId;
        httpService = this.botService.updateBotById({ ...this.formGroup.value, botId });
        notify = adminNotify.success.updateBot
      } else {
        httpService = this.botService.createBot(this.formGroup.value);
        notify = adminNotify.success.createBot
      }
      httpService.subscribe((res: any) => {
        console.log(res);
        this.help.notify('success', notify);
        this.botId = res.botId;
        this.router.navigate(['/admin/manage-bots',this.botId,'welcome']);
      }, (error) => {
        console.log(error);
      });
    }else{
      // let errors = ValidationService.getError(this.formGroup);
      // console.log(errors);
      // let error = ValidationService.getFirstError(errors);
      // this.help.notify('error', error);
    }
  }

  handleFileInput(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.upload.post(file).subscribe((res: any) => {
        console.log(res);
      }, (err) => {
        console.log(err.message);
      })
    }
  };

  getBotById() {
    this.botService.getBotById(this.botId)
      .subscribe((res: any) => {
        console.log(res);
        this.editingBot = res;
        this.formGroup.patchValue(this.editingBot);

        this.iconActive = {
          header : this.editingBot.jsondata.header.logo,
          launcher : this.editingBot.jsondata.launcher.logo,
        }
        this.colorActive = {
          bgColor1: this.editingBot.jsondata.bgColor1,
          bgColor2: this.editingBot.jsondata.bgColor2,
          textColor: this.editingBot.jsondata.textColor
        }

      }, (error: any) => {
        // this.helperService.notify('error', error);
      });
  }

  onIconSelect(icon:string, iconType: 'header'|'launcher'){
    this.iconActive[iconType] = icon;
    this.formGroup.controls.jsondata.get(iconType)?.patchValue({
      logo : icon
    })
  }
  
  onColorSelect(color:string, colorType:'bgColor1'|'bgColor2'|'textColor'){
    this.colorActive[colorType] = color;
    let obj:any = {};
    obj[colorType] = color
    this.formGroup.controls.jsondata.patchValue(obj)
  }

  openModal() {
    if(this.installGuideModel){
      this.modalRef  = this.modalService.show(this.installGuideModel, {class: 'modal-xl bg-transparent',backdrop : 'static',keyboard : false});
    }
  }
}
