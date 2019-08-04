import {Component, OnInit} from '@angular/core';
import {HeaderService} from '../services/header.service';
import {NewsTypeEnum} from '../util/news-type.enum';

export interface IMenu {
  name: string;
  path: string;
  type: NewsTypeEnum;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public collapsed = true;
  public menu: IMenu[] = [
    {name: 'Top', path: '/news', type: NewsTypeEnum.TOP},
    {name: 'New', path: '/news', type: NewsTypeEnum.NEW},
    {name: 'Best', path: '/news', type: NewsTypeEnum.BEST},
    {name: 'Favourite', path: '/news', type: NewsTypeEnum.FAVOURITE}
  ];

  constructor(public headerService: HeaderService) {}

  ngOnInit() {}

  public switchNewsType(type: NewsTypeEnum) {
    this.headerService.newsType.next(type);
  }

}
