import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite-gifs',
  templateUrl: './favorite-gifs.component.html',
  styleUrls: ['./favorite-gifs.component.css']
})
export class FavoriteGifsComponent implements OnInit {
  favoriteImages: string[] = [];

  ngOnInit(): void {
    this.loadFavoriteImagesFromSessionStorage();
  }

  loadFavoriteImagesFromSessionStorage(): void {
    const favorites = sessionStorage.getItem('favoriteImages');
    if (favorites) {
      this.favoriteImages = JSON.parse(favorites);
    }
  }
}
