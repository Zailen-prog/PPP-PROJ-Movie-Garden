import {NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./auth/auth.guard";
import {LayoutLoginComponent} from "./layouts/layout-login/layout-login.component";


const routes: Routes = [
  {
    path: '',
    component: LayoutLoginComponent,
    children: [
      {
        path: '',
        redirectTo: "/test",
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
      },
      {
        path: 'test',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'latestMovies',
        loadChildren: () => import('./latest-movie/latest-movie.module').then(m => m.LatestMovieModule),
      },
      {
        path: 'topMovies',
        loadChildren: () => import('./top-movies/top-movie.module').then(m => m.TopMovieModule),
      },
      {
        path: 'movie/:idDetails',
        loadChildren: () => import('./movie-details/movie-details.module').then(m => m.MovieDetailsModule),
      },
      {
        path: 'myAccount',
        loadChildren: () => import('./my-account/my-account.module').then(m => m.MyAccountModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'myReview',
        loadChildren: () => import('./my-review/my-review.module').then(m => m.MyReviewModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'watched',
        loadChildren: () => import('./watched/watched.module').then(m => m.WatchedModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'towatch',
        loadChildren: () => import('./towatch/towatch.module').then(m => m.TowatchModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'favorites',
        loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'reviews/:id',
        loadChildren: () => import('./movie-review/movie-review.module').then(m => m.MovieReviewModule),
      },
      {
        path: 'newReview/:id',
        loadChildren: () => import('./review-form/review-form.module').then(m => m.ReviewFormModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'editReview/:id',
        loadChildren: () => import('./review-form/review-form.module').then(m => m.ReviewFormModule),
        canActivate:[AuthGuard]
      },
    ]
  },


    {path: '**', redirectTo: '/test'}

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
