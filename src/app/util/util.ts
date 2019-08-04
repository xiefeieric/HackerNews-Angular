import {NewsModel} from '../models/news.model';
import * as moment from 'moment';

export class Util {

  public static updateToFullUrl(item: NewsModel): string {
    let url = '';
    if (!/^http[s]?:\/\//.test(item.url)) {
      url += 'http://';
    }
    url += item.url;

    return url;
  }

  public static getDisplayTime(newsItem: NewsModel): string {
    if (!newsItem || !newsItem.time) {
      return '';
    }
    const publishTimeInMill: number = newsItem.time * 1000;
    let diffTime: number = moment().diff(publishTimeInMill, 'minutes');
    if (diffTime < 60) {
      return `${diffTime} minutes ago`;
    }
    diffTime = moment().diff(publishTimeInMill, 'hours');
    if (diffTime < 24) {
      return `${diffTime} hours ago`;
    }
    diffTime = moment().diff(publishTimeInMill, 'days');
    if (diffTime < 30) {
      return `${diffTime} days ago`;
    }
    diffTime = moment().diff(publishTimeInMill, 'months');
    if (diffTime < 12) {
      return `${diffTime} months ago`;
    }
    diffTime = moment().diff(publishTimeInMill, 'years');
    return `${diffTime} years ago`;
  }
}
