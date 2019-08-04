import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private newsTypeSubject: Subject<any> = new Subject();

  constructor() { }

  get newsType(): Subject<any> {
    return this.newsTypeSubject;
  }
}
