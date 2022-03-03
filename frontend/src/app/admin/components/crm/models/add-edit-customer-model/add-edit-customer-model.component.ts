import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, Validators } from '@angular/forms';
import { BotService } from 'src/app/admin/services/bot.service';
import { CustomerService } from 'src/app/admin/services/customer.service';
import { ValidationService } from 'src/app/shared/services';

@Component({
  selector: 'admin-add-edit-customer-model',
  templateUrl: './add-edit-customer-model.component.html'
})
export class AddEditCustomerModelComponent implements OnInit {

  @Output() onSuccess = new EventEmitter<any>() ;
  @Input() modalRef : BsModalRef = new BsModalRef();
  @Input() editingCustomer: any;

  isEditMode = false;
  formSubmited = false;
  formGroup  = this.fb.group({
    userId     : [""],
    name     : ["",[Validators.required]],
    email  : ["",[Validators.required, Validators.email]],
    phone  : ["",[Validators.required, ValidationService.numeric]],
  });
  constructor(
    private fb : FormBuilder,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void{
    var editingCustomer = changes.editingCustomer.currentValue;
    if(editingCustomer){
      this.isEditMode = true;
      this.formGroup.patchValue(editingCustomer);
    }
  }

  onSubmit() {
    this.formSubmited = true;
    if (this.formGroup.status == 'VALID') {
      let httpService;
      if (this.isEditMode) {
        httpService = this.customerService.updateCustomerById(this.formGroup.value);
      } else {
        httpService = this.customerService.createCustomer(this.formGroup.value);
      }
      httpService.subscribe((res: any) => {
        console.log(res);
        this.onSuccess.emit('success');
        this.modalRef.hide();
      }, (error) => {
        console.log(error);
      });
    }
  }  
}
