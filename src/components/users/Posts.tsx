import * as React from "react";
import { Comment, Post } from "../../domain";
import { activePostsWithComments$ } from "../../signalGraph/signalGraph";
import { withViewModel } from "@rxreact/core";
import { startWith } from "rxjs/operators";

interface PostsProps {
  postsWithComments: [Post, Comment[]][];
}

interface PostProps {
  post: Post;
  comments: Comment[];
}

interface CommentProps {
  comment: Comment;
}

let vm = {
  inputs: {
    postsWithComments: activePostsWithComments$.pipe(
      startWith<[Post, Comment[]][]>([])
    )
  },
  outputs: {}
};

let CommentComponent: React.SFC<CommentProps> = ({ comment }) => {
  return (
    <p>
      "{comment.body}" - {comment.name} ({comment.email})
    </p>
  );
};

let PostComponent: React.SFC<PostProps> = ({ post, comments }) => {
  let commentList = comments.map(comment => (
    <li key={comment.id}>
      <CommentComponent comment={comment} />
    </li>
  ));
  return (
    <div>
      <h4>{post.title}</h4>
      <p>{post.body}</p>
      <ul>{commentList}</ul>
    </div>
  );
};

let Posts: React.SFC<PostsProps> = ({ postsWithComments }) => {
  return (
    <ol>
      {postsWithComments.map(([post, comments]) => {
        return (
          <li key={post.id}>
            <PostComponent post={post} comments={comments} />
          </li>
        );
      })}
    </ol>
  );
};

export default withViewModel(vm, Posts);
