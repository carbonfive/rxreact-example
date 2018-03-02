import { User, Id, Post, Comment } from "../domain";
import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";

export interface API {
  getUsers(): Observable<User[]>;
  getUser(userId: Id): Observable<User>;
  getPostsForUser(userId: Id): Observable<Post[]>;
  getCommentsForPost(postId: Id): Observable<Comment[]>;
}

const api: API = {
  getUsers(): Observable<User[]> {
    return makeAPICall("/users");
  },
  getUser(userId: Id): Observable<User> {
    return makeAPICall(`/users/${userId}`);
  },
  getPostsForUser(userId: Id): Observable<Post[]> {
    return makeAPICall(`/posts?userId=${userId}`);
  },
  getCommentsForPost(postId: Id): Observable<Comment[]> {
    return makeAPICall(`/comments?postId=${postId}`);
  }
};

export default api;

function makeAPICall<T>(path: string): Observable<T> {
  return fromPromise(
    fetch(`https://jsonplaceholder.typicode.com${path}`).then(response =>
      response.json()
    )
  );
}
