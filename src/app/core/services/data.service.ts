import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';
import { PersonalInfo, Skill, Project, Experience } from '../models/portfolio.models';

interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private data$: Observable<PortfolioData>;

  constructor(private http: HttpClient) {
    this.data$ = this.http
      .get<PortfolioData>('assets/data/portfolio.json')
      .pipe(shareReplay(1));
  }

  getPersonalInfo(): Observable<PersonalInfo> {
    return this.data$.pipe(map((d) => d.personalInfo));
  }

  getSkills(): Observable<Skill[]> {
    return this.data$.pipe(map((d) => d.skills));
  }

  getProjects(): Observable<Project[]> {
    return this.data$.pipe(map((d) => d.projects));
  }

  getFeaturedProjects(): Observable<Project[]> {
    return this.data$.pipe(map((d) => d.projects.filter((p) => p.featured)));
  }

  getExperience(): Observable<Experience[]> {
    return this.data$.pipe(map((d) => d.experience));
  }
}
