import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResourceUsageEntity } from '../entities/resource-usage.entity';

@Injectable({
  providedIn: 'root'
})
export class AppStoreService {
  // public usages: BehaviorSubject<ResourceUsageEntity[]> = new BehaviorSubject([new ResourceUsageEntity()]);
}
