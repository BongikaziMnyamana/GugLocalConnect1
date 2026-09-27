import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Used alongside authGuard on role-specific routes. Reads the required
// role from the route's "data" property (see app.routes.ts) and redirects
// anyone with the wrong role to their own dashboard instead.
export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const requiredRole = route.data['role'];

  const currentRole = auth.currentUser()?.role;

  if (currentRole === requiredRole) {
    return true;
  }

  // Wrong role — send them somewhere that actually makes sense for them
  router.navigate([currentRole === 'BUSINESS_OWNER' ? '/dashboard/business' : '/dashboard']);
  return false;
};