import { Component, OnDestroy, OnInit } from '@angular/core';

import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
import { MatExpansionPanel } from '@angular/material/expansion';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  isUserAuthenticated = false;
  private postSub!: Subscription;
  private authSub!: Subscription;
  constructor(
    public postService: PostService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts();
    this.postSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
    this.isUserAuthenticated = this.authService.getIsAuth();
    this.authSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuth) => {
        this.isUserAuthenticated = isAuth;
      });
  }

  onDelete(postId) {
    console.log(postId);
    this.postService.deletePost(postId);
  }
  ngOnDestroy() {
    this.postSub.unsubscribe();
    this.authSub.unsubscribe();
  }
}
