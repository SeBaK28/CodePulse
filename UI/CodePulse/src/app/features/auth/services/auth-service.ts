import { HttpClient, httpResource, HttpResourceRef, HttpResourceRequest } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { loginResponse, UserResponse } from '../models/auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  http = inject(HttpClient);
  user= signal<UserResponse | null>(null);
  router = inject(Router)

  loadUser(): HttpResourceRef<UserResponse | undefined>{
    return httpResource<UserResponse>(() => {
      const request: HttpResourceRequest ={
        url: `${environment.baseApiUrl}/api/Auth/me`,
        withCredentials: true
      };

      return request;
    });
  }  
  
  login(email:string, password:string) : Observable<loginResponse>{
    return this.http.post<loginResponse>(`${environment.baseApiUrl}/api/Auth/login`, {
      email: email,
      password: password
    },{
      withCredentials: true
    }).pipe(
      tap((userResponse)=> this.user.set(userResponse))
    )
  }

  logout(){
    return this.http.post<void>(`${environment.baseApiUrl}/api/auth/logout`, {}, {
      withCredentials: true      
    }).subscribe({
      next: (() => {
        this.user.set(null);
        this.router.navigate(['']);
      }),
    })
  }
  
  setUser(updatedUser: UserResponse | null){
    if(updatedUser){
      this.user.set({
        email : updatedUser.email,
        roles: updatedUser.roles.map((x) => x.toLowerCase()) 
      });
    }else{
      this.user.set(null);
    }
  }
}
