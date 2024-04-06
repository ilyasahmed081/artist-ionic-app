import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonSearchbar } from '@ionic/angular/standalone';
import { IArtist } from 'src/interfaces/artists';
import { ArtistService } from 'src/services/artist/artist.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  providers: [ArtistService],
  imports: [FormsModule, IonSearchbar, HttpClientModule, NgFor, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent]
})
export class Tab2Page implements OnInit {

  endpoint: string = 'ArtGalley';
  artists: IArtist[] = [];

  searchTerm: string = '';
  filteredArtists: IArtist[] = [];

  constructor(
    private service: ArtistService
  ) {}

  ngOnInit(): void {
    this.getAllArtists();
  }

  /**
   * getting all artists from api service
   */
  getAllArtists() {
    this.service.get(this.endpoint).subscribe(res => {
      let nonFeaturedArtists: IArtist[] = [];

      // filtering non-featured artists 
      res.forEach((a: IArtist) => {
        if (a.is_featured_artist === 0) {
          nonFeaturedArtists.push(a);
        }
      });

      this.artists = nonFeaturedArtists;
      this.filteredArtists = this.artists;
    })
  }

  /**
   * search artist from the list of artists
   */
  onSearch() {
    if (this.searchTerm.trim() !== '') {
      this.filteredArtists = this.artists.filter(artist =>
        artist.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredArtists = this.artists; // Reset to all artists if search term is empty
    }
  }

}
