import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonSearchbar, IonButton } from '@ionic/angular/standalone';
import { IArtist } from 'src/interfaces/artists';
import { ArtistService } from 'src/services/artist/artist.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  providers: [ArtistService],
  imports: [IonButton, FormsModule, HttpClientModule, NgFor, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonSearchbar],
})
export class Tab3Page {

  endpoint: string = 'ArtGalley';
  artists: IArtist[] = [];
  toast: boolean = false;
  toastMsg: string = "";

  searchTerm: string = '';
  filteredArtists: IArtist[] = [];

  constructor(
    private service: ArtistService,
    private router: Router
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

  /**
   * Passing data of Featured artist to tab 4 to populate in the form to update
   * @param artist 
   */
  onEdit(artist: IArtist) {
    this.router.navigate(['/tabs/tab4'], { state: { data: artist } });
  }

  /**
   * Deelte Featured Artist from server
   * @param artist 
   */
  onDelete(artist: IArtist) {
    this.service.delete(this.endpoint, artist).subscribe(res => {
      this.getAllFeaturedArtists();
    }, error => {
      this.toast = true;
      this.toastMsg = error;
    });
  }
}
