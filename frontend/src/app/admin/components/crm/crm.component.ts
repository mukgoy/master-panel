import { Component, KeyValueDiffer, KeyValueDiffers, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HelperService, PageParamsServer } from 'src/app/shared/services';
import { adminNotify } from '../../enums';
import { CustomerService } from '../../services/customer.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html'
})
export class CrmComponent implements OnInit {

  editingCustomer = null;
  modalRef?: BsModalRef;
  @ViewChild('customerModel') customerModel?: TemplateRef<any>;
  pageParams: PageParamsServer = {} as PageParamsServer;
  dataFatching = false;
  private filterDiffer: KeyValueDiffer<string, any> = {} as KeyValueDiffer<string, any>;
  constructor(
    private help: HelperService,
    private customerService: CustomerService,
    private differs: KeyValueDiffers,
    private modalService: BsModalService,
		private confirmService: ConfirmationDialogService,
  ) { }

  ngOnInit(): void {
    this.initPageParams();
  }

  initPageParams(): void {
    if (!this.pageParams.isInit) {
      this.pageParams = new PageParamsServer();
      this.pageParams.isInit = true
      this.pageParams.emitChange = () => { this.getAllCustomers() };
      this.filterDiffer = this.differs.find(this.pageParams.filters).create();
    }
    this.pageParams.filters.search = "";
  }

  ngDoCheck(): void {
    //used to detect filter object value changes and trigger emitChange()
    const changes = this.filterDiffer.diff(this.pageParams.filters);
    if (changes) {
      console.log("ngDoCheck")
      this.pageParams.page = 1;
      this.pageParams.emitChange();
    }
  }

  getAllCustomers() {
    console.log("getAllCustomers")
    this.dataFatching = true;
    this.customerService.getCustomers(this.pageParams.getObject())
      .subscribe((res: any) => {
        this.dataFatching = false;
        this.pageParams.data = res.data;
        this.pageParams.setPagesCountByItemCount(res.count);
      }, (error) => {
        this.dataFatching = false;
        this.pageParams.data = [];
        this.pageParams.totalPages = 0;
        this.help.notify('error', error);
      });
  }

  openModal(editingCustomer=null) {
    if(this.customerModel){
      this.editingCustomer = editingCustomer;
      this.modalRef = this.modalService.show(this.customerModel, {class: 'modal-md bg-transparent',backdrop : 'static',keyboard : false});
    }
  }

  onSuccess(event : Event){
    this.getAllCustomers();
  }

  export(){
    // console.log("this feature is pending for all export");
    this.help.downloadFile(this.pageParams.data);
  }

  deleteCustomerById(id:any){
		this.confirmService.confirm(adminNotify.confirm.customerDelete).subscribe((result:boolean) => {
      if(result){
        this.customerService.deleteCustomerById(id)
				.subscribe((res:any)=>{
					console.log(res);
					this.getAllCustomers();
					this.help.notify('success',adminNotify.success.deleteCustomer);

				},(error:any)=>{
					console.log(error)
						// this.helperService.notify('error', error);
				});
      }
    });
    
  }
}
