import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BookService } from '../../services/book.service';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {
  name: string;
  description: string;
  selectedImage: File = null;
  error: string;

  constructor(
    private readonly router: Router,
    private readonly bookService: BookService
  ) {}

  ngOnInit() {}

  onHandleFileChange(e) {
    this.selectedImage = e.target.files[0];
  }

  onHandleCreate() {
    const fb = new FormData();
    fb.append('name', this.name);
    fb.append('description', this.description);
    fb.append('bookImage', this.selectedImage, this.selectedImage.name);

    this.bookService.createBook(fb).subscribe(
      (data: Book) => {
        if (data) {
          this.router.navigate(['']);
        }
      },
      error => {
        this.error = error;
      }
    );
  }
}
