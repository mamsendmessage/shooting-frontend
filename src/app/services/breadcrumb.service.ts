import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbSubject = new BehaviorSubject<string[]>(['Application', 'Dashboard']);

  constructor() { }

  getBreadcrumb(): Observable<string[]> {
    return this.breadcrumbSubject.asObservable();
  }

  setBreadcrumb(breadcrumb: string[]): void {
    this.breadcrumbSubject.next(breadcrumb);
  }
}