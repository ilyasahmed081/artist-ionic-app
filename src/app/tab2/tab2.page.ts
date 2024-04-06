import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent} from '@ionic/angular/standalone';
import { IArtist } from 'src/interfaces/artists';
import { ArtistService } from 'src/services/artist/artist.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  providers: [ArtistService],
  imports: [HttpClientModule, NgFor, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent]
})
export class Tab2Page implements OnInit {

  endpoint: string = 'ArtGalley';
  artists: IArtist[] = [];

  constructor(
    private service: ArtistService
  ) {}

  ngOnInit(): void {
    this.getAllArtists();
  }

  /**
   * gettign all artists from api service
   */
  getAllArtists() {
    this.service.get(this.endpoint).subscribe(res => {
      let nonFeaturedArtists: IArtist[] = [];

      res.forEach((a: IArtist) => {
        if (a.is_featured_artist === 0) {
          nonFeaturedArtists.push(a);
        }
      });

      this.artists = nonFeaturedArtists;
    })
  }

}
