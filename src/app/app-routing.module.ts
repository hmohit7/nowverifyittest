import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'verifyit-dashboard',
    pathMatch: 'full'
  },
  // { path: 'building-management', loadChildren: '../app/Building-Management/building-management.module#BuildingManagementModule' },
  { path: 'login', loadChildren: '../app/login/login.module#LoginPageModule' },

  { path: 'verifyit-dashboard', loadChildren: '../app/Rentals Management/pages/verifyitdashboard/verifyitdashboard.module#VerifyitDashboardPageModule' },
  { path: 'rentals', loadChildren: '../app/Rentals Management/rental-management.module#RentalsManagementModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
