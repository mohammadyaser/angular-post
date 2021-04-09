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
  private postSub! : Subscription;
  constructor(public postService: PostService) {}
  ngOnInit() {
    this.posts = this.postService.getPost();
    console.log('nginiiiiiiiiiiit', this.posts);
    this.postSub = this.postService.getPostUpdateListener().subscribe((posts: Post[]) => {
      console.log("SUUUUUUUUUUUUUUUUB", posts)
      this.posts = posts;
    });
  }

  ngOnDestroy(){
    this.postSub.unsubscribe();
  }
}
