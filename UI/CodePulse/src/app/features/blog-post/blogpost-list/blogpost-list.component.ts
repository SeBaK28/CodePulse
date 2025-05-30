import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blogpost-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css'
})
export class BlogpostListComponent {

}
