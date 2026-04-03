import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/services/data.service';
import { PersonalInfo } from '../../../core/models/portfolio.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  info$!: Observable<PersonalInfo>;
  currentYear = new Date().getFullYear();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.info$ = this.dataService.getPersonalInfo();
  }
}
