import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonSearchbar } from '@ionic/angular/standalone';
import { IArtist } from 'src/interfaces/artists';
import { ArtistService } from 'src/services/artist/artist.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  providers: [ArtistService],
  imports: [HttpClientModule, NgFor, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonSearchbar],
})
export class Tab3Page {

  endpoint: string = 'ArtGalley';
  artists: IArtist[] = [];

  constructor(
    private service: ArtistService
  ) { }

  ngOnInit(): void {
    this.getAllFeaturedArtists();
  }

  /**
   * getting all artists from api service
   */
  getAllFeaturedArtists() {
    this.service.get(this.endpoint).subscribe(res => {
      let featuredArtists: IArtist[] = [];

      // filtering featured artists 
      res.forEach((a: IArtist) => {
        if (a.is_featured_artist === 1) {
          featuredArtists.push(a);
        }
      });

      this.artists = featuredArtists;
    })
  }
}
