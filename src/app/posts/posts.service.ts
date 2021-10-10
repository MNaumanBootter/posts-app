import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http"
import { map } from "rxjs/operators";

import { Post } from "./post.model";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(
    private http: HttpClient,
    private router: Router
    ){ }

  getPosts(){
    this.http.get<{message: string, posts: any}>('http://192.168.18.5:3000/api/posts')
      .pipe(map((postData) => {
          return postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id
            }
          });
      }))
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{_id: string, title: string, content: string}>("http://192.168.18.5:3000/api/posts/" + id);
  }

  addPost(title: string, content: string){
    const post: Post = {id: null, title: title, content: content};
    this.http.post<{message: string, postId: string}>("http://192.168.18.5:3000/api/posts", post)
      .subscribe(responseData => {
        const postId = responseData.postId;
        post.id = postId;
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  updatePost(id: string, title: string, content: string){
    const post: Post = { id: id, title: title, content: content};
    this.http.put("http://192.168.18.5:3000/api/posts/" + id, post)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      })
  }

  deletePost(postId: string){
    this.http.delete("http://192.168.18.5:3000/api/posts/" + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id != postId);
        this.posts = updatedPosts;
        this.postUpdated.next([...this.posts]);
      });
  }

}
