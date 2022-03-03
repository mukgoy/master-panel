import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ChatFlowsComponent } from './components/chat-flows/chat-flows.component';
import { DetailsComponent } from './components/chat-flows/details/details.component';
import { ManageWelcomeComponent } from './components/chat-flows/manage-welcome/manage-welcome.component';
import { ConversationsComponent } from './components/conversations/conversations.component';
import { CrmComponent } from './components/crm/crm.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { LayoutComponent } from './components/shared/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children : [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'manage-bots',
        component: ChatFlowsComponent,
      },
      {
        path: 'manage-bots/create',
        component: DetailsComponent,
      },
      {
        path: 'manage-bots/:botId',
        component: DetailsComponent,
      },
      {
        path: 'manage-faqs',
        component: FaqsComponent,
      },
      {
        path: 'manage-faqs/:botId',
        component: FaqsComponent,
      },
      {
        path: 'conversations',
        component: ConversationsComponent,
      },
      {
        path: 'crm',
        component: CrmComponent,
      },
      {
        path: 'myprofile',
        component: MyprofileComponent,
      },
      {
        path: 'manage-bots/:botId/welcome',
        component: ManageWelcomeComponent,
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
