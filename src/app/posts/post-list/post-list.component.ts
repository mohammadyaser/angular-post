import { Component, OnDestroy, OnInit } from '@angular/core';

import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
import { MatExpansionPanel } from '@angular/material/expansion';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  private postSub!: Subscription;
  constructor(public postService: PostService) {}
  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts();
    this.postSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }


  onDelete(postId) {
    console.log(postId);
    this.postService.deletePost(postId)
  }
  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}
