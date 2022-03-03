import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'mybot-widget-wrapper',
  templateUrl: './widget-wrapper.component.html',
  styleUrls: ['./widget-wrapper.component.scss']
})
export class WidgetWrapperComponent implements OnInit {

  
  // botConfig:any = {}
  constructor(public store:StoreService,private ref:ChangeDetectorRef) { }

  ngOnInit(): void {
    // this.store.botConfig.subscribe((botConfig)=>{
    //   this.botConfig = botConfig;
    //   this.ref.detectChanges();
    // })
  }

  ngStyle(){
    // let botConfig = this.botConfig;
    let botConfig = this.store.bot; 
    let styles:any = {}
    styles["color"] = botConfig?.jsondata.textColor;
    
    if(botConfig?.jsondata.isGradient){
        styles["background-image"] = `linear-gradient(-225deg, ${botConfig?.jsondata.bgColor1} 35%, ${botConfig.jsondata.bgColor2} 100%)`;
    }else{
        styles["background-color"] = `${botConfig?.jsondata.bgColor1}`;
    }
    console.log(styles)
    return styles
  }

}
