import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { PersonalInfo, Skill } from '../../core/models/portfolio.models';
import { Observable } from 'rxjs';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    trigger('skillBarAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('skillListAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(15px)' }),
          stagger(80, [
            animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
          ]),
        ], { optional: true }),
      ]),
    ]),
  ],
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('skillsSection') skillsSection!: ElementRef;

  info$!: Observable<PersonalInfo>;
  skills$!: Observable<Skill[]>;
  activeCategory: Skill['category'] = 'frontend';
  skillsVisible = false;
  private skillsObserver!: IntersectionObserver;

  categories: { key: Skill['category']; label: string }[] = [
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'devops', label: 'DevOps' },
    { key: 'tools', label: 'Tools' },
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.info$ = this.dataService.getPersonalInfo();
    this.skills$ = this.dataService.getSkills();
  }

  ngAfterViewInit(): void {
    this.skillsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => (this.skillsVisible = true), 300);
          this.skillsObserver.unobserve(entries[0].target);
        }
      },
      { threshold: 0.2 }
    );
    if (this.skillsSection) {
      this.skillsObserver.observe(this.skillsSection.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.skillsObserver?.disconnect();
  }

  setCategory(cat: Skill['category']): void {
    this.activeCategory = cat;
    this.skillsVisible = false;
    setTimeout(() => (this.skillsVisible = true), 50);
  }
}
