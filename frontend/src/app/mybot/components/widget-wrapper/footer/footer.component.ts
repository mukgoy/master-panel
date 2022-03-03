import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MsgService } from 'src/app/mybot/services/msg.service';

@Component({
  selector: 'mybot-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  textMsg = "";
  @ViewChild('textMsgBox') textMsgBox: ElementRef<HTMLInputElement> = {} as ElementRef;

  constructor(
    public msgService: MsgService
  ) { }

  ngOnInit(): void {
  }

  previousKey = "";
  onChangeHTML(event: any) {
    let textMsg = this.textMsgBox.nativeElement.textContent || "";
    if (!textMsg) {
      this.textMsgBox.nativeElement.textContent = "";
      return;
    }

    this.textMsg = this.textMsgBox.nativeElement.innerHTML || "";
    this.textMsg = this.textMsg.replace(/<[\/]?div>/gi, "");
    this.textMsg = this.textMsg.replace(/<br\s*[\/]?>/gi, "\n");
    this.textMsg = this.textMsg.trim();

    if (event.key == "Enter" && this.previousKey != "Shift") {
      this.onSubmit();
    } else {
      this.previousKey = event.key;
    }

  }

  onSubmit() {
    this.textMsg = this.htmlToText(this.textMsg);
    console.log(this.textMsg);
    this.textMsgBox.nativeElement.innerHTML = "";
    this.msgService.onUserReply(this.textMsg);
  }

  htmlToText(html: string) {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

}
