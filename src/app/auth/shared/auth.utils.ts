import { Router } from '@angular/router';
import { UserType } from '../../core/auth/enum/UserType.enum';
import { AuthService } from '../../core/auth/services/auth.service';

export function navigateTo( token: string, router: Router, authService: AuthService){

    authService.storeToken(token);
    const tokenData = authService.decodeToken();

    if(tokenData==null) {
      router.navigate(['/auth/login']).then(r => r);
      return;
    }
    console.log(tokenData);
    if(tokenData.registered){
      console.log("Entro a la condicion");
      tokenData.user_role == UserType.Owner ?
        router.navigate(['/pet-owner/home']) :
        router.navigate(['/vets/home']);
    } else {
      console.log("Entro al else");
        tokenData.user_role == UserType.Owner ?
        router.navigate(['/auth/pet-owner']) :
        router.navigate(['/auth/vet']);
    }

}

