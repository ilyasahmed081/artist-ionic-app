import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonSelectOption, IonButton, IonInput, IonTextarea, IonCheckbox } from '@ionic/angular/standalone';
import { ArtistService } from 'src/services/artist/artist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  providers: [ArtistService],
  imports: [HttpClientModule, IonCheckbox, IonTextarea, IonInput, IonButton, IonSelectOption, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class Tab4Page implements OnInit {

  endpoint: string = 'ArtGalley';

  // artist model to store the form data 
  artistFormModel: any = {
    name: '',
    dob: '',
    gender: '',
    artworkType: '',
    contactInfo: '',
    exhibitionDate: '',
    specialNotes: '',
    featuredArtist: 0,
  };
  genderOptions = ['Select Gender', 'Male', 'Female', 'Other'];
  artworkTypeOptions = ['Select Artwork Type', 'Painting', 'Sculpture', 'Photograph', 'Video Art', 'Digital Art', 'Printmaking'];

  constructor(
    private service: ArtistService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    
  }

  onSubmit() {
    // Submit form data
    this.service.post(this.endpoint, this.artistFormModel).subscribe(res => {
      // Navigate to tab2 page after successful submission
      this.router.navigate(['/tabs/tab2']);
    })
  }

  // Method to handle input changes for all fields
  onInputChange(fieldName: string, event: any) {
    this.artistFormModel[fieldName] = event.target.value;
  }

  // Method to handle change in the featured artist checkbox
  onFeaturedChange(event: any) {
    // Update featuredArtist value based on checkbox state
    if (event.detail.checked) {
      this.artistFormModel.featuredArtist = 1;
    } else {
      this.artistFormModel.featuredArtist = 0;
    }
  }

}