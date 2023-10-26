import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  client_id = 'f9ab27c92b024606b7e7605bca743665';
  client_secret = '8fa8481a016d442d92a674ed410754dc';
  // client_id='1466e07d121a452192851df2d64231cf';
  // client_secret='96894ea5210a484aa04fa94dff348a28'
  apiUrl = 'https://accounts.spotify.com/api/token';
  redirectUri = 'http://localhost:4200/callback';
  stateKey = 'spotify_auth_state';
   headers = new HttpHeaders({  
   'Authorization': 'Basic ' + btoa(this.client_id + ':' + this.client_secret)
  });
  body={
    grant_type: 'Authorization code'
  }
  
  constructor(private http:HttpClient,private router:Router) { }
  loginWithSpotify(){
    const state=this.getrandomcharcter(16);
    localStorage.setItem(this.stateKey,state);
    const scope = 'user-read-private user-read-email';
    const authUrl=`https://accounts.spotify.com/authorize?response_type=code&client_id=${this.client_id}&scope=${scope}&redirect_uri=${encodeURIComponent(this.redirectUri)}&state=${state}`
    window.location.href = authUrl;
    this.router.navigate(['/callback'])
  }

  handleSpotifyCallback(){
    debugger;
    const urlParams = new URLSearchParams(window.location.search);
    const code=urlParams.get('code');
    const state = urlParams.get('state');
    const storedState = localStorage.getItem(this.stateKey);

    if(code && state ===storedState){
      this.requestAccessToken(code);
      localStorage.removeItem(this.stateKey);
    }
    else{
      console.error('Invalid state or missing code.');
    }
  }

  buildTokenRequestData(code){
   const body=new HttpParams().set('grant_type', 'authorization_code').set('code', code).set('redirect_uri', this.redirectUri) ;
   return body
  }
  requestAccessToken(code){
    const requestData = this.buildTokenRequestData(code);
    return this.http.post(this.apiUrl,requestData,{
      headers:new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(this.client_id + ':' + this.client_secret)
      })
    }).subscribe(data=>{
      console.log(data);
    })
  }

  getToken(){
   return this.http.post(this.apiUrl,this.body,{ 
    headers:new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.client_id + ':' + this.client_secret)
    })
    })
  }

  private getrandomcharcter(length){
    let charcter='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result='';
    let charcterLength=charcter.length;

    for(let i=0; i<length; i++){
      let randomIndex=Math.floor(Math.random()* charcterLength);
      result+=charcter.charAt(randomIndex);
    }
    return result;
  }
}
