import { Component, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Daum, GiphyResponse } from 'src/app/interfaces/giphyResponse';
import { SearchingServiceService } from 'src/app/services/searching-service.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  faStar = faStar;
  regxGiphyName: RegExp = /^[a-zA-Z]+$/;
  showSpinner: boolean = false;
  giphyName: string = '';
  giphyResponse = {} as GiphyResponse;
  originalImages: string[] = [];
  favoriteImages: string[] = [];

  constructor(private searchingServiceService: SearchingServiceService) { }

  ngOnInit(): void {
    this.loadFavoriteImagesFromSessionStorage();
  }

  loadFavoriteImagesFromSessionStorage(): void {
    const favorites = sessionStorage.getItem('favoriteImages');
    if (favorites) {
      this.favoriteImages = JSON.parse(favorites);
      console.log('Favorite images loaded from sessionStorage:', this.favoriteImages);
    } else {
      console.log('No favorite images found in sessionStorage.');
    }
  }

  getGiphyByName(giphyName: string): void {
    this.showSpinner = true;
    this.searchingServiceService.getGiphyByName(giphyName).subscribe((giphyResponse: GiphyResponse) => {
      console.log('Giphy response received:', giphyResponse);
      this.giphyResponse = giphyResponse;
      if (giphyResponse) {
        this.giphyName = '';
        this.giphyResponse.data.forEach((daum: Daum) => {
          this.originalImages.push(daum.images.original.url);
        });
      }
      this.showSpinner = false;
    });
  }

  toggleFavorite(imageId: string): void {
    const index = this.favoriteImages.indexOf(imageId);
    if (index === -1) {
      this.favoriteImages.push(imageId);
      console.log('Image added to favorites:', imageId);
    } else {
      this.favoriteImages.splice(index, 1);
      console.log('Image removed from favorites:', imageId);
    }
    sessionStorage.setItem('favoriteImages', JSON.stringify(this.favoriteImages));
    console.log('Updated favorite images stored in sessionStorage:', this.favoriteImages);
  }

  isFavorite(imageId: string): boolean {
    return this.favoriteImages.includes(imageId);
  }
}
