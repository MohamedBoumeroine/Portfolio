import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { PersonalInfo } from '../../core/models/portfolio.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  info$!: Observable<PersonalInfo>;
  typedText = '';
  private roles = [
    'Senior R&D Engineer',
    'Angular Specialist',
    'Spring Boot Developer',
    'Microservices Architect',
  ];
  private roleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timer: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.info$ = this.dataService.getPersonalInfo();
    this.tick();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }

  private tick(): void {
    const currentRole = this.roles[this.roleIndex];

    if (this.isDeleting) {
      this.typedText = currentRole.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.typedText = currentRole.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let delay = this.isDeleting ? 40 : 80;

    if (!this.isDeleting && this.charIndex === currentRole.length) {
      delay = 2000; // Pause at end
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      delay = 500;
    }

    this.timer = setTimeout(() => this.tick(), delay);
  }
}
