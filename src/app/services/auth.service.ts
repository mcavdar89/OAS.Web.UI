import { Injectable } from '@angular/core';
import { UserDto } from '../models/user-dto.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
jwtKey:string="oas-token";
constructor() { }

isLogin():boolean{
  let user = localStorage.getItem(this.jwtKey);
  return user?true:false;
}
// getLocalUser():UserDto{
//   let user = localStorage.getItem(this.jwtKey) as UserDto;

//   return (user as UserDto)
// }



}
