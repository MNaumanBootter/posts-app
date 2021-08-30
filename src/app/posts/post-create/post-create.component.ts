import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';

@Component({
	selector: 'app-post-create',
	templateUrl: './post-create.component.html',
	styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  postEnteredTile = '';
  postEnteredContent = '';
  @Output() postCreated = new EventEmitter<Post>();

	constructor() { }

	ngOnInit(): void {
	}

	onAddPost() {
    console.log(this.postEnteredContent);
    console.log(this.postEnteredTile);

    const post: Post = {
      title: this.postEnteredTile,
      content: this.postEnteredContent
    };
    this.postCreated.emit(post);

	}

}
