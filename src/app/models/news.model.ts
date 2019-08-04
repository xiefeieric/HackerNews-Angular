export class NewsModel {
  public id: number;
  public deleted?: boolean;
  public type?: 'job' | 'story' | 'comment' | 'poll';
  public by?: string;
  public time?: number;
  public text?: string;
  public dead?: boolean;
  public parent?: number;
  public poll?: number;
  public kids?: number[];
  public url?: string;
  public score?: number;
  public title?: string;
  public parts?: number[];
  public descendants?: number;
  public updatedAt?: number;
  public isFav?: boolean;
}
