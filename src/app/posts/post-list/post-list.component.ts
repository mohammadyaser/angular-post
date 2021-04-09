import { Component, Input } from '@angular/core';

import { Post } from '../post.model';
import { PostService } from '../post.service';
import { MatExpansionPanel } from '@angular/material/expansion';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  @Input() posts: Post[] = [];
  constructor(public postService: PostService) {}
}
