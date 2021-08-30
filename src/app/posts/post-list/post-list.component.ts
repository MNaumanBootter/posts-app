import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  @Input() posts: Post[] = [
    // { 'title': 'First post', 'content': 'First post\'s content.' },
    // { 'title': 'Second post', 'content': 'Second post\'s content.' },
    // { 'title': 'Third post', 'content': 'Third post\'s content.' }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
