import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private http: HttpClient, private router : Router) {}
  getPost(postId) {
    return this.http.get<{_id , title , content}>(`http://localhost:92/api/users/post/${postId}`);
  }
  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(
        'http://localhost:92/api/users/post'
      )
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          });
        })
      )
      .subscribe((transformedPost) => {
        this.posts = transformedPost;
        console.log('++++++++', this.posts);
        this.postsUpdated.next([...this.posts]);
      });
  }
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  addPost(title: string, content: string) {
    const post: Post = { title: title, content: content };
    this.http
      .post<{ message: string }>('http://localhost:92/api/users/post', post)
      .subscribe((message) => {
        console.log(message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
      this.router.navigate(['/']);
  }
  updatePost(id: string, title: string, content: string) {
    const post: Post = { id, title, content };
    this.http
      .put(`http://localhost:92/api/users/post/${id}`, post)
      .subscribe((response) => {
        this.posts = this.posts.map((p) => {
          if (p.id === id) {
            p.title = title;
            p.content = content;
          }
          return p;
        });
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/'])
      });
  }
  deletePost(postId) {
    this.posts = this.posts.filter((post) => post.id != postId);
    this.postsUpdated.next([...this.posts]);
  }
}
