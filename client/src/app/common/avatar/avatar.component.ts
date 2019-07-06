import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {
  @Input() private readonly img: string;
  splitedImg: string;

  constructor() { }

  ngOnInit() {
    this.splitedImg = this.img.split('\\')[4];
  }

}
