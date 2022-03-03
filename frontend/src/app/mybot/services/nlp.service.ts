import { Injectable } from '@angular/core';
import { userbotApi } from '../enums';
import { ApiHttpService } from './api-http.service';
declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class NlpService {

  nlp:any;
  constructor(
    public http : ApiHttpService,
  ) { }

  init(botId:string){
    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
      this.http.get(userbotApi.getFaqs + botId).subscribe((faqs:any)=>{
        this.nlpManager(faqs).then(async(nlp)=>{
          this.nlp = nlp;
          resolve(true);
        });
      });
    });
  }

  async nlpManager(faqs:any[]){
    const { containerBootstrap, Nlp, LangEn } = window.nlpjs;
    const container = await containerBootstrap();
    container.use(Nlp);
    container.use(LangEn);
    const nlp = container.get('nlp');
    nlp.settings.autoSave = false;
    nlp.addLanguage('en');
  
    faqs.forEach((faq, index)=>{
      let intent = "intent"+index;
      nlp.addDocument('en', faq.question, intent);
      nlp.addAnswer('en', intent, faq.answer);
    })
    await nlp.train();
    const response = await nlp.process('en', 'cookie clear');
    console.log(response.answer);
    return nlp;
  }

  async process(query:string){
    const response = await this.nlp.process('en', query);
    response.answer = response.answer || "sorry...not understand"
    console.log(response.answer);
    return response.answer;
  }
}
