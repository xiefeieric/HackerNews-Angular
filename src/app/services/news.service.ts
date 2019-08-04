import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NewsModel} from '../models/news.model';
import {PersistenceService} from './persistence.service';
import {NewsTypeEnum} from '../util/news-type.enum';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(public http: HttpClient, public persistenceService: PersistenceService) {
  }

  public async fetchNewsIds(type: NewsTypeEnum = NewsTypeEnum.TOP): Promise<number[]> {
    return this.http.get<number[]>(`https://hacker-news.firebaseio.com/v0/${type}stories.json?print=pretty`).toPromise<number[]>();
  }

  public async fetchNewsById(id: number): Promise<NewsModel> {
    return this.http.get<NewsModel>(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`).toPromise<NewsModel>();
  }

  public getFavIds(): number[] {
    let ids: number[] = [];
    if (this.persistenceService.get('fav')) {
      ids = this.persistenceService.get('fav');
    }

    return ids;
  }

  public getFavourites(): NewsModel[] {
    if (this.persistenceService.get('fav')) {
      const favIds: number[] = this.persistenceService.get('fav');
      return favIds.map((id: number) => this.persistenceService.get(id.toString()));
    }

    return [];
  }

  public async getNewsForPage(newsIds: number[], page: number = 0, pageSize: number = 30): Promise<NewsModel[]> {
    const startIndex: number = page * pageSize;
    const calculatedEndIndex: number = page * pageSize + pageSize;
    const endIndex: number = calculatedEndIndex < newsIds.length ? calculatedEndIndex : newsIds.length;
    const idsPerPage: number[] = newsIds.slice(startIndex, endIndex);

    const newsItems: NewsModel[] = [];

    for (const id of idsPerPage) {
      let newsItem: NewsModel;
      const cachedNews: NewsModel = this.persistenceService.get(id.toString());
      if (cachedNews) {
        newsItem = cachedNews;
        newsItems.push(newsItem);
        continue;
      }
      newsItem = await this.fetchNewsById(id);
      if (newsItem) {
        newsItem.updatedAt = moment().valueOf();
        this.persistenceService.set(id.toString(), newsItem);
        newsItems.push(newsItem);
        continue;
      }
      const idIndex: number = newsIds.findIndex((itemId: number) => itemId === id);
      if (idIndex !== -1) {
        newsIds.splice(idIndex, 1);
      }
    }

    return newsItems;
  }

  public toggleFav(item: NewsModel): void {
    let favList: number[] = [];
    if (this.persistenceService.get('fav')) {
      favList = this.persistenceService.get('fav');
    }
    if (item.isFav) {
      const updatedFavList = favList.filter((id: number) => id !== item.id);
      this.persistenceService.set('fav', updatedFavList);
    } else {
      favList.push(item.id);
      this.persistenceService.set('fav', favList);
    }
    item.isFav = !item.isFav;
    this.persistenceService.set(item.id.toString(), item);
  }
}
