import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BotEntity } from 'src/app/shared/entities';
import { ChannelService } from '../../services/channel.service';
import { NlpService } from '../../services/nlp.service';
import { StoreService } from '../../services/store.service';
import { WelcomeService } from '../../services/welcome.service';

@Component({
  selector: 'app-iframe-window',
  templateUrl: './iframe-window.component.html',
  styleUrls: ['./iframe-window.component.scss']
})
export class IframeWindowComponent implements OnInit {

  botId = "";
  constructor(
    private route: ActivatedRoute,
    public channelService: ChannelService,
    public welcomeService: WelcomeService,
    public nlpService: NlpService,
    public store: StoreService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      if(params.botId){
        this.store.bot = new BotEntity({botId : params.botId});
        this.botId = this.store.bot.botId || ""
        this.channelService.init();
        await this.channelService.getBotConfig();
        await this.channelService.initChatBox();
        this.nlpService.init(this.botId);
        this.welcomeService.init();
      }
    });
    
  }

}
