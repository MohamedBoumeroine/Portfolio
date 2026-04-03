import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
    data: { animation: 'Home' },
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./features/about/about.module').then((m) => m.AboutModule),
    data: { animation: 'About' },
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./features/projects/projects.module').then((m) => m.ProjectsModule),
    data: { animation: 'Projects' },
  },
  {
    path: 'experience',
    loadChildren: () =>
      import('./features/experience/experience.module').then((m) => m.ExperienceModule),
    data: { animation: 'Experience' },
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./features/contact/contact.module').then((m) => m.ContactModule),
    data: { animation: 'Contact' },
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
