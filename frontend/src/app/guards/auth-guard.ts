import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

export const authGuard = (): boolean | UrlTree => {
  const router = inject(Router);

  const currentUser = localStorage.getItem('currentUser');

  if (currentUser) {
    return true;
  } else {
    return router.parseUrl('/');
  }
};
