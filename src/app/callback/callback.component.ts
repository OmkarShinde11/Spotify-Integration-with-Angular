import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../Service/spotify.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit(): void {
    debugger;
    this.spotifyService.handleSpotifyCallback();
  }

}
