import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
declare var Channel: any;

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(public store: StoreService) {
  }

  channel: any = null;
  init() {
    if (window.parent !== window) {
      this.channel = Channel.build({
        // debugOutput:true,
        window: window.parent,
        origin: "*",
        scope: "testScope"
      });
    }
  }

  getBotConfig() {
    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
      if (this.channel) {
        this.channel.call({
          method: "getBotConfig",
          params: {},
          success: (botConfig: any) => {
            this.store.bot = botConfig
            resolve(true)
          }
        });
      } else {
        console.log("channel or getBotConfig not found");
        resolve(false)
      }
    })
  }

  initChatBox() {
    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
      if (this.channel) {
        this.channel.call({
          method: "initChatBox",
          params: {},
          success: function (v: any) {
            resolve(true);
          }
        });
      }
    });
  }

  closeWindow() {
    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
      if (this.channel) {
        this.channel.call({
          method: "closeWindow",
          params: {},
          success: (data: any) => {
            console.log(data);
            resolve(true)
          }
        });
      }
    })
  }
}
