import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { adminApi } from 'src/app/admin/enums';
import { UploadService } from 'src/app/admin/services/upload.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'admin-image-picker',
  templateUrl: './image-picker.component.html'
})
export class ImagePickerComponent implements OnInit {

  @Input() iconType = "";
  @Input() iconActive = "";
  @Input() bgColor = "";
  @Input() textColor = "";

  @Output() onSelect = new EventEmitter<any>() ;

  constructor(private upload: UploadService,) { }

  ngOnInit(): void {
    this.getUploads();
  }

  systemHeaderIcons() {
    let icons: string[] = [];
    if (this.iconType == 'header') {
      let origin = location.origin;
      icons = [
        origin + "/assets/mybot/images/bot-header-1.svg",
        origin + "/assets/mybot/images/bot-header-2.svg",
        origin + "/assets/mybot/images/bot-header-3.svg",
        origin + "/assets/mybot/images/bot-header-4.svg",
        origin + "/assets/mybot/images/bot-header-5.svg",
        origin + "/assets/mybot/images/bot-header-6.svg",
        origin + "/assets/mybot/images/bot-header-7.svg",
        origin + "/assets/mybot/images/bot-header-8.svg",
        origin + "/assets/mybot/images/bot-header-9.svg"
      ]
      return icons.concat(this.allUploads);
    }
    return [];
  }

  systemLauncherIcons() {
    let icons: string[] = [];
    if (this.iconType == 'launcher') {
      let origin = location.origin;
      icons = [
        origin + "/assets/mybot/images/launcher-1.svg",
        origin + "/assets/mybot/images/launcher-2.svg",
        origin + "/assets/mybot/images/launcher-3.svg",
        origin + "/assets/mybot/images/launcher-4.svg"
      ]
      return icons.concat(this.allUploads);
    }
    return [];
  }

  afterSelect(icon:string){
    this.onSelect.emit(icon);
  }

  allUploads = [];
  getUploads() {
    this.upload.get()
      .subscribe((res : any) => {
        this.allUploads = res.map((item:any)=>{
          return environment.uploads + (item.path.replace("uploads\\",""))
        })
      }, (error: any) => {
        console.log(error);
      });
  }
}
