import { Routes } from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { TasksComponent } from './tasks/tasks.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
  },
  {
    path: 'users/:uid',
    component: UserTasksComponent,
    children: [
      {
        path: 'tasks',
        component: TasksComponent // needs a separate router outlet
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent // needs a separate router outlet
      },
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];