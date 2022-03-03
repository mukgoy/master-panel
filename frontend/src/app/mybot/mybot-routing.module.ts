import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BotTestComponent } from './components/bot-test/bot-test.component';
import { IframeWindowComponent } from './components/iframe-window/iframe-window.component';

const routes: Routes = [
  {
    path: '',
    component: IframeWindowComponent
  },
  {
    path: 'bot-test/:botId',
    component: BotTestComponent
  },
  {
    path: ':botId',
    component: IframeWindowComponent
  },
  {
    path: '**',
    component: IframeWindowComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MybotRoutingModule { }
