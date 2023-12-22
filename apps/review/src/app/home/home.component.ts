import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { UserSelectorService } from '../services/user-selector/user-selector.service';
import { User } from '../types/user.dto';
import { MatButtonModule } from '@angular/material/button';
import { Clipboard } from '@angular/cdk/clipboard';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, forkJoin, map } from 'rxjs';

@Component({
  selector: 'org-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  review: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>(
    []
  );
  employees: User[] = this.userSelector.employees;
  constructor(
    private userSelector: UserSelectorService,
    private clipboard: Clipboard
  ) {}
  ngOnInit() {
    this.runCodeReviewSorter();
  }

  runCodeReviewSorter(): void {
    forkJoin([this.userSelector.defaultArr, this.userSelector.compareArr])
      .pipe(
        map(([def, com]): string[] => {
          return def.map(
            (def: User, i: number) => `${def.name} reviews ${com[i].name}`
          );
        })
      )
      .subscribe((value) => this.review.next(value));
  }

  copyToClipboard(): void {
    const data: string | null | undefined = this.review.value.toString();
    if (data) {
      this.clipboard.copy(data.split(',').join('\r\n\r\n'));
    }
  }

  updateEmployee(employee: User, matCheckboxChange: MatCheckboxChange): void {
    this.employees.map((emp: User) => {
      if (emp.id === employee.id) {
        emp.available = matCheckboxChange.checked;
      }
    });
    this.userSelector.employees = this.employees;
    this.runCodeReviewSorter();
  }
}
