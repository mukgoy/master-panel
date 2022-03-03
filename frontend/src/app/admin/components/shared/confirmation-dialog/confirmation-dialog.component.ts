import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmationDialogComponent implements OnInit {

  public title: string = "";
  public message: string = "";
  public btnOkText: string = "";
  public btnCancelText: string = "";
  public onClose: Subject<boolean> = new Subject();;

  constructor(public _bsModalRef: BsModalRef) { }

  public ngOnInit(): void {
  }

  public onConfirm(): void {
      this.onClose.next(true);
      this._bsModalRef.hide();
  }

  public onCancel(): void {
      this.onClose.next(false);
      this._bsModalRef.hide();
  }

}
