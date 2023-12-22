import { Injectable } from '@angular/core';
import { User } from '../../types/user.dto';
import { map, Observable, of } from 'rxjs';
import { cloneDeep } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class UserSelectorService {
  private _employees: User[] = [
    { id: 1, name: 'Brian', available: true },
    { id: 2, name: 'Tanner', available: true },
    { id: 3, name: 'Nick', available: true },
    { id: 4, name: 'Sam', available: true },
    { id: 5, name: 'Nathan', available: true },
    { id: 6, name: 'Lily', available: true },
    { id: 7, name: 'Micah', available: true },
    { id: 8, name: 'John', available: true },
    { id: 9, name: 'Bryce', available: true },
  ];

  startDate = new Date(2023, 7, 30, 14);
  todayDate = new Date();
  weekMilli = 1_000 * 60 * 60 * 24 * 7;
  wednesdaysSince = Math.ceil(
    (this.todayDate.getTime() - this.startDate.getTime()) / this.weekMilli
  );

  constructor() {}

  get employees(): User[] {
    return this._employees;
  }

  set employees(employee: User[]) {
    this._employees = employee;
  }

  createNameArray(swapCount = 0): Observable<User[]> {
    const employees: User[] = cloneDeep(this._employees);
    return of(employees).pipe(
      map((): User[] => this.shuffleArray(swapCount))
    );
  }

  private shuffleArray(swapCount: number): User[] {
    const employees: User[] = cloneDeep(this._employees);
    const arr = employees.filter((value) => value.available);
    for (let i = 0; i < Math.abs(swapCount); i++) {
      // @ts-ignore
      arr.push(arr.shift());
    }
    return arr;
  }

  get defaultArr(): Observable<User[]> {
    return this.createNameArray();
  }

  get compareArr(): Observable<User[]> {
    const employees: User[] = cloneDeep(this._employees);
    return this.createNameArray(
      this.wednesdaysSince +
        Math.floor(this.wednesdaysSince / employees.length) +
        1
    );
  }
}
