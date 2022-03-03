import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResourceUsageEntity } from 'src/app/shared/entities/resource-usage.entity';

@Injectable({
  providedIn: 'root'
})
export class AdminStoreService {
  public usages: BehaviorSubject<ResourceUsageEntity[]> = new BehaviorSubject([new ResourceUsageEntity()]);
}
