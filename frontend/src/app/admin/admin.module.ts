import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChatFlowsComponent } from './components/chat-flows/chat-flows.component';
import { DetailsComponent } from './components/chat-flows/details/details.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { ConversationsComponent } from './components/conversations/conversations.component';
import { CrmComponent } from './components/crm/crm.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerComponent } from './components/shared/utils/color-picker/color-picker.component';
import { ImagePickerComponent } from './components/shared/utils/image-picker/image-picker.component';
import { AddEditFaqModelComponent } from './components/faqs/models/add-edit-faq-model/add-edit-faq-model.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AccordionModule } from 'ngx-bootstrap/accordion'
import { NgPipesModule } from 'ngx-pipes';
import { NgxColorsModule } from 'ngx-colors';
import { InstallGuideModelComponent } from './components/chat-flows/models/install-guide-model/install-guide-model.component';
import { ManageWelcomeComponent } from './components/chat-flows/manage-welcome/manage-welcome.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BotuiFocusDirective, BotuiScrollDirective } from '../shared/directives';
import { SharedModule } from '../shared/shared.module';
import { AddEditCustomerModelComponent } from './components/crm/models/add-edit-customer-model/add-edit-customer-model.component';
import { ConfirmationDialogComponent } from './components/shared/confirmation-dialog/confirmation-dialog.component';




@NgModule({
  declarations: [
    DashboardComponent,
    ChatFlowsComponent,
    DetailsComponent,
    FaqsComponent,
    ConversationsComponent,
    CrmComponent,
    MyprofileComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ColorPickerComponent,
    ImagePickerComponent,
    AddEditFaqModelComponent,
    InstallGuideModelComponent,
    BotuiScrollDirective,
    BotuiFocusDirective,
    ManageWelcomeComponent,
    AddEditCustomerModelComponent,
		ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    CKEditorModule,
    AccordionModule.forRoot(),
    NgPipesModule,
    NgxColorsModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    SharedModule
  ],
	entryComponents: [ConfirmationDialogComponent],
})
export class AdminModule { }
