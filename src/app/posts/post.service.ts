import { Injectable } from '@angular/core';
import { Post } from './post.model';
@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  getPost() {
    return [...this.posts];
  }
  addPost(title: String, Content: String) {
    const post: Post = {
      title: title,
      content: Content,
    };
    this.posts.push(post);
  }
}
