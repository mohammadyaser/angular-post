import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';
  @Output() createdPost = new EventEmitter<Post>();
  onAddPost(form: NgForm) {
    if(form.invalid){
      return
    }
    console.log(form)
    const post: Post = {
      title: form.value.title,
      content: form.value.content,
    };
    this.createdPost.emit(post);
  }
}
