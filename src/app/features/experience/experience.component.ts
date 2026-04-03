import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Experience } from '../../core/models/portfolio.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit {
  experience$!: Observable<Experience[]>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.experience$ = this.dataService.getExperience();
  }

  formatDate(dateStr: string): string {
    if (dateStr === 'Present') return 'Present';
    const [year, month] = dateStr.split('-');
    const date = new Date(+year, +month - 1);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }
}
