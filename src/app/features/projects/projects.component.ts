import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Project } from '../../core/models/portfolio.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects$!: Observable<Project[]>;
  selectedProject: Project | null = null;
  filter: 'all' | 'featured' = 'all';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.projects$ = this.dataService.getProjects();
  }

  openModal(project: Project): void {
    this.selectedProject = project;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.selectedProject = null;
    document.body.style.overflow = '';
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeModal();
    }
  }
}
