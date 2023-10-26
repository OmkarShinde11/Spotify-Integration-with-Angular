import { Component } from '@angular/core';
import { SpotifyService } from './Service/spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Spotify-app';

  constructor(private spotifyService:SpotifyService){}
  getToken(){
    
    this.spotifyService.getToken().subscribe(resp=>{
      console.log(resp);
    },error=>{
      console.log(error)
    })
  }

  loginWithSpotify(){
    debugger;
    this.spotifyService.loginWithSpotify();
  }
}
