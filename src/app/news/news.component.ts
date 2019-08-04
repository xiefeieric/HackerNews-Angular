import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NewsService} from '../services/news.service';
import {NewsModel} from '../models/news.model';
import {MatPaginator} from '@angular/material';
import {HeaderService} from '../services/header.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {NewsTypeEnum} from '../util/news-type.enum';
import {Util} from '../util/util';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject<any>();

  public newsIds: number[] = [];
  public news: NewsModel[] = [];
  public isLoading = false;
  public pageIndex = 0;
  public pageSize = 30;
  public newsCurrentType = NewsTypeEnum.TOP;

  @ViewChild('matPaginator', {static: true})
  public matPaginator: MatPaginator;

  constructor(public newsService: NewsService,
              public headerService: HeaderService) {
  }

  ngOnInit() {
    this.initListener();
    this.fetchNews().then(() => console.log('Data loaded!'));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public openNews(item: NewsModel) {
    if (!item.url) {
      return;
    }
    const url = Util.updateToFullUrl(item);
    window.open(url, '_blank');
  }

  public toggleFav(item: NewsModel) {
    this.newsService.toggleFav(item);
  }

  private async fetchNews(): Promise<void> {
    await this.fetchNewsIds();
    await this.fetchNewsForPage();
  }

  private initListener() {
    this.paginatorListener();
    this.headerListener();
  }

  private headerListener() {
    this.headerService.newsType
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async (type: NewsTypeEnum) => {
        if (this.newsCurrentType === type) {
          return;
        }
        this.newsCurrentType = type;
        await this.matPaginator.firstPage();
        if (this.newsCurrentType === NewsTypeEnum.FAVOURITE) {
          this.fetchFavourites();
          return;
        }
        this.fetchNews();
      });
  }

  private fetchFavourites() {
    this.newsIds = this.newsService.getFavIds();
    this.news = this.newsService.getFavourites();
  }

  private paginatorListener() {
    this.matPaginator.page
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async (event: any) => {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        await this.fetchNewsForPage();
      });
  }

  private async fetchNewsForPage(): Promise<void> {
    this.isLoading = true;
    try {
      this.news = await this.newsService.getNewsForPage(this.newsIds, this.pageIndex, this.pageSize);
      this.isLoading = false;
    } catch (e) {
      console.error(e);
      this.isLoading = false;
    }
  }

  private async fetchNewsIds(): Promise<void> {
    this.isLoading = true;
    try {
      this.newsIds = await this.newsService.fetchNewsIds(this.newsCurrentType);
      this.isLoading = false;
    } catch (e) {
      this.isLoading = false;
      console.error(e);
    }
  }
}
