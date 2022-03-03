import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';

@Injectable({ providedIn: 'root' })
export class HelperService {
  public constructor(
    private notifier: ToastrService
  ) { }
  store: any = {};
  notify(type: string, message: string) {
    if (type == 'success') {
      this.notifier.success(message);
    }
    if (type == 'error') {
      this.notifier.error(message);
    }
  }

  responseProcessor(response: any) {
    if (typeof (response.message) === 'string') {
      this.notify(response.status, response.message);
    } else {
      for (var key in response.message) {
        if (response.message[key])
          this.notify(response.status, response.message[key]);
      }
    }
  }

  randomString(length: number = 10, chars: String = "abcdefghijklmnopqrstuvwxyz") {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  arrayColumn(list: any[], column: string) {
    return list.map(function (item: any) {
      return item[column]
    });
  }

  checkboxToggleAll(list: any[], allChecked: boolean) {
    list.map((item) => { item.checked = allChecked; return item; })
  };
  getChecked(list: any[]) {
    return list.filter((item) => { return item.checked });
  };
  isAllChecked(list: any[]) {
    return list.every((item) => { return item.checked });
  };
  export(onPageArray: any[], filteredArray: any[]) {
    const onPageCheckedArray = this.getChecked(onPageArray);
    let result = [];
    if (onPageCheckedArray.length) {
      result = onPageCheckedArray;
    } else {
      result = filteredArray;
    }
    this.downloadFile(result);
  }
  downloadFile(data: any[]) {
    const replacer = (key:string, value:any) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], {type: 'text/csv' })
    saveAs(blob, "export.csv");
  }

  csvToJSON(csv: string) {
    // let allTextLines = csv.split(/\r|\n|\r/);
    // let headers = allTextLines[0].split(',');
    // let lines = [];
    // for (let i = 1; i < allTextLines.length; i++) {
    //     let data = allTextLines[i].split(',');
    //     if (data.length === headers.length) {
    //         let tarr = {};
    //         for (let j = 0; j < headers.length; j++) {
    //             tarr[headers[j]] = data[j].split("\"").length === 1 ? data[j] : data[j].split("\"")[1] ;
    //         }
    //         lines.push(tarr);
    //     }
    // }
    // return lines;
  }

  // togglebyId(elemId) {
  //   var element = document.getElementById(elemId);
  //   element.classList.toggle("d-none")
  // }

  // dateWithoutTime(dateTime) {
  //     var date = new Date(dateTime.getTime());
  //     date.setHours(0, 0, 0, 0);
  //     return date;
  // }

  // measureStrength(pass: string) {
  //     let score = 0;
  //     // award every unique letter until 5 repetitions
  //     let letters = {};
  //     for (let i = 0; i< pass.length; i++) {
  //         letters[pass[i]] = (letters[pass[i]] || 0) + 1;
  //         score += 5.0 / letters[pass[i]];
  //     }
  //     // bonus points for mixing it up
  //     let variations = {
  //         digits: /\d/.test(pass),
  //         lower: /[a-z]/.test(pass),
  //         upper: /[A-Z]/.test(pass),
  //         nonWords: /\W/.test(pass),
  //     };

  //     let variationCount = 0;
  //     for (let check in variations) {
  //         variationCount += (variations[check]) ? 1 : 0;
  //     }
  //     score += (variationCount - 1) * 10;
  //     return Math.trunc(score);
  // }

  // stringTest(pass, key){
  //     let variations = {
  //         digits: /\d/.test(pass),
  //         lower: /[a-z]/.test(pass),
  //         upper: /[A-Z]/.test(pass),
  //         nonWords: /\W/.test(pass),
  //     };

  //     return variations[key];
  // }

  trackByIndex = (index: number): number => {
    return index;
  };

  date(time: any){
    return time ? new Date(time) : new Date()
  };
}
