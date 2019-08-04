import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class PersistenceService {

  public set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  public get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  public remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error remove data from localStorage', e);
      return null;
    }
  }

  public reset(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error clear data from localStorage', e);
    }
  }

  public size(): number {
    return localStorage.length;
  }

}
