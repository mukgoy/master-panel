import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, Validators } from '@angular/forms';
import { BotService } from 'src/app/admin/services/bot.service';
import { FaqService } from 'src/app/admin/services/faq.service';
import { HelperService } from 'src/app/shared/services';
import { adminNotify } from 'src/app/admin/enums';


@Component({
  selector: 'admin-add-edit-faq-model',
  templateUrl: './add-edit-faq-model.component.html'
})
export class AddEditFaqModelComponent implements OnInit {

  @Output() onSuccess = new EventEmitter<any>() ;
  @Input() modalRef : BsModalRef = new BsModalRef();
  @Input() editingFaq: any;
  @Input() botId: string = "";

  public Editor = ClassicEditor;

  

  isEditMode = false;
  formSubmited = false;
  formGroup  = this.fb.group({
    botId     : ["",[Validators.required]],
    question  : ["",[Validators.required]],
    answer  : ["",[Validators.required]],
  });
  faqId: any;

  constructor(
    private fb : FormBuilder,
    private botService: BotService,
    private faqService: FaqService,
    private help: HelperService,
  ) { }

  ngOnInit(): void {
    this.getBots();
  }

  ngOnChanges(changes: SimpleChanges): void{
    var editingFaq = changes.editingFaq.currentValue;
    if(editingFaq){
      this.isEditMode = true;
      this.faqId = editingFaq.faqId;
      this.getFaqById();
    }

    var botId = changes.botId.currentValue;
    if(botId){
      this.formGroup.patchValue({botId: botId});
    }
  }

  onSubmit() {
    this.formSubmited = true;
    if (this.formGroup.status == 'VALID') {
      let httpService;
      let notify:string;
      if (this.faqId) {
        let faqId = this.faqId;
        httpService = this.faqService.updateFaqById({ ...this.formGroup.value, faqId });
        notify = adminNotify.success.updateFaq
      } else {
        httpService = this.faqService.createFaq(this.formGroup.value);
        notify = adminNotify.success.createFaq
      }
      httpService.subscribe((res: any) => {
        console.log(res);
        this.help.notify('success', notify);
        this.onSuccess.emit('success');
        this.modalRef.hide();

      }, (error) => {
        console.log(error);
      });
    }
  }

  mybots: any[] = [];

  getBots(){
    this.botService.getBots()
    .subscribe((res:any)=>{
      console.log(res);
      this.mybots = res
    },(error:any)=>{
        // this.helperService.notify('error', error);
    });
  }

  getFaqById() {
    console.log(this.faqId)
    this.faqService.getFaqById(this.faqId)
      .subscribe((res: any) => {
        this.editingFaq = res;
        this.formGroup.patchValue({...this.editingFaq, botId: res.bot.botId});
      }, (error: any) => {
        // this.helperService.notify('error', error);
      });
  }
  
}
