import {Injectable} from '@angular/core'
import { Post } from './post.model';
import { Subject } from 'rxjs'
@Injectable({providedIn : 'root'})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  getPost() {
    console.log("-------------",this.posts)
    return [...this.posts];
  }
  getPostUpdateListener(){
    return this.postsUpdated.asObservable()
  }
  addPost(title: String, Content: String) {
    const post: Post = {
      title: title,
      content: Content,
    };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts])
    console.log("*******", this.posts)
  }
}
