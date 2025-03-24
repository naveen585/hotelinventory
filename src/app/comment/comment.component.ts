import { Component, OnInit } from '@angular/core';
import { CommentService } from './comment.service';
import { map, Observable, pluck } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Comments } from './comment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment',
  imports: [CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit{
  comments$ : Observable<Comments[]>;

  comment$ : Observable<Comments[]>;

  comments : Comments[] =[];

  constructor(private commentService: CommentService , private route : ActivatedRoute){
    this.comments$ = this.commentService.getComments();
    this.comment$ = this.route.data.pipe(pluck('comments'));
  }

  ngOnInit(): void {
      this.route.data.subscribe((data) => 
        this.comments = data['comments']); // We are prefetching the data
  }
}
