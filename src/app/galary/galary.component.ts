import { Component, OnInit } from '@angular/core';
import { GridLayout, Image, PlainGalleryConfig, PlainGalleryStrategy, } from 'angular-modal-gallery';

@Component({
  selector: 'app-galary',
  templateUrl: './galary.component.html',
  styleUrls: ['./galary.component.css']
})
export class GalaryComponent implements OnInit {

  constructor() {}

  ngOnInit() {}

  plainGalleryGrid: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.GRID,
    layout: new GridLayout({ width: '50vh', height: '30vh' }, { length:1, wrap: true }, )
  };

  images: Image[] = [
    new Image(
      0,
      { // modal
        img: '../../assets/image1.jpg',
        extUrl: 'http://www.google.com'
      }
    ),
    new Image(
      1,
      { // modal
        img: '../../assets/image2.jpg',
        description: 'Description 2'
      }
    ),
    new Image(
      2,
      { // modal
        img: '../../assets/image3.jpg',
        description: 'Description 3',
        extUrl: 'http://www.google.com'
      },
    ),
    new Image(
      3,
      { // modal
        img: '../../assets/galary/shower2.jpg',
        description: 'Description 4',
        extUrl: 'http://www.google.com'
      }
    ),
    new Image(
      4,
      { // modal
        img: '../../assets/galary/kitchen.JPG'
      },
    ),
     new Image(
      5,
      { // modal
        img: '../../assets/galary/shower.jpg'
      },
    )
  ];
}
