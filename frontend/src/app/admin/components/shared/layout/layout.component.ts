import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdminStoreService } from 'src/app/admin/services/admin-store.service';
import { ResourceUsageService } from 'src/app/admin/services/resource-usage.service';
import { ScriptService } from 'src/app/shared/services';
import { environment } from 'src/environments/environment';
declare var lalabot: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {

  isOpen = true;
  isOpenMobile = false;
  constructor(
		public script: ScriptService, 
		public store: AdminStoreService,
		public usage: ResourceUsageService
	) {
		this.loadLalaBot();
		this.usage.getUsages();
	}

  ngOnInit(): void {
  }

	loadLalaBot() {
		this.script.load([environment.bundleJs]).then(data => {
			console.log('script loaded ', data);
			lalabot.init("61f65d1feaaeab3104cd9f6d");
		}).catch(error => console.log(error));
	}
}
