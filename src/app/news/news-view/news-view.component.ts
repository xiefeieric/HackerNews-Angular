import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NewsModel} from '../../models/news.model';
import {Util} from '../../util/util';

@Component({
  selector: 'app-news-view',
  templateUrl: './news-view.component.html',
  styleUrls: ['./news-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsViewComponent implements OnInit {

  @Input()
  public news: NewsModel[];

  @Input()
  public pageSize: number;

  @Input()
  public pageIndex: number;

  @Output()
  public favUpdate: EventEmitter<NewsModel> = new EventEmitter<NewsModel>();

  @Output()
  public openNews: EventEmitter<NewsModel> = new EventEmitter<NewsModel>();

  constructor() {
  }

  ngOnInit() {
  }

  public openDoc(item: NewsModel) {
    this.openNews.emit(item);
  }

  public getDisplayTime(newsItem: NewsModel): string {
    return Util.getDisplayTime(newsItem);
  }

  public toggleFav(item: NewsModel) {
    this.favUpdate.emit(item);
  }

}
