import { Observable, Subject } from "rxjs";
import { Id, User, Post, Comment } from "../domain";

export type UserSelectionSignal = Subject<Id>;
export type ActiveUsersSignal = Observable<User[]>;
export type SelectedUserSignal = Observable<User | undefined>;
export type ActivePostsSignal = Observable<Post[]>;
export type ActivePostsWithCommentsSignal = Observable<
  Array<[Post, Comment[]]>
>;
