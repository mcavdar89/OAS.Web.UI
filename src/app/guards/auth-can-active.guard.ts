import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authCanActiveGuard: CanActivateFn = (route, state) => {
  console.log(route);
  console.log(state);

  let autService: AuthService = inject(AuthService);

  if (autService.isLogin())
    return true;

  let router:Router = inject(Router);

 router.navigate(["login"]);


  //logine yönledirme işlemi yapılacak

  return false;
};
