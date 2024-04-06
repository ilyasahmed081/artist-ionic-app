import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonSearchbar} from '@ionic/angular/standalone';
import { IArtist } from 'src/interfaces/artists';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [NgFor, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonSearchbar]
})
export class Tab2Page {

  artists: IArtist[] = [
    {
      "artist_id": 4,
      "name": "Terry",
      "dob": "1982-10-29T14:00:00.000Z",
      "gender": "Female",
      "artwork_type": "photograph",
      "contact_info": "terry@photography.net",
      "exhibition_date": "2024-06-19T14:00:00.000Z",
      "special_notes": "Award-winning urban photographer",
      "is_featured_artist": 0
    },
    {
      "artist_id": 92,
      "name": "test_ee",
      "dob": "2024-04-06T13:00:00.000Z",
      "gender": "Unspecified",
      "artwork_type": "video art",
      "contact_info": "+9213123123",
      "exhibition_date": "2024-04-06T13:00:00.000Z",
      "special_notes": "",
      "is_featured_artist": 0
    },
  ];

  constructor(
  ) {}
}
