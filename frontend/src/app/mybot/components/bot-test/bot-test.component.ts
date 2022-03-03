import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScriptService } from 'src/app/shared/services';
import { environment } from 'src/environments/environment';
declare var lalabot: any;

@Component({
  selector: 'app-bot-test',
  templateUrl: './bot-test.component.html'
})
export class BotTestComponent implements OnInit {

  constructor(
    public script: ScriptService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      if (params.botId) {
        this.script.load([environment.bundleJs]).then(data => {
          console.log('script loaded ', data);
          lalabot.init(params.botId);
        }).catch(error => console.log(error));
      }
    });
  }

}
