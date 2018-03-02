import {
  ActiveUsersSignal,
  UserSelectionSignal,
  SelectedUserSignal,
  ActivePostsSignal,
  ActivePostsWithCommentsSignal
} from "./signalTypes";

import { Subject } from "rxjs";
import { User, Post, Comment } from "../domain";
import { combineLatest } from "rxjs/observable/combineLatest";
import { zip } from "rxjs/observable/zip";
import { map, flatMap, publishReplay, refCount } from "rxjs/operators";
import { API } from "../http/api";

export const makeActiveUsersSignal = (api: API): ActiveUsersSignal =>
  api.getUsers().pipe(publishReplay(1), refCount());

export const makeSelectUserSignal = (): UserSelectionSignal => new Subject();

export const makeSelectedUserSignal = (
  activeUsers$: ActiveUsersSignal,
  selectUser$: UserSelectionSignal
): SelectedUserSignal =>
  combineLatest(activeUsers$, selectUser$).pipe(
    map(([users, selection]) =>
      users.find((user: User) => user.id === selection)
    ),
    publishReplay(1),
    refCount()
  );

export const makeActivePostsSignal = (
  api: API,
  selectUser$: UserSelectionSignal
): ActivePostsSignal =>
  selectUser$.pipe(
    flatMap(id => api.getPostsForUser(id)),
    publishReplay(1),
    refCount()
  );

export const makeActivePostsWithCommentsSignal = (
  api: API,
  activePosts$: ActivePostsSignal
): ActivePostsWithCommentsSignal =>
  activePosts$.pipe(
    flatMap(posts => {
      const postsWithComments = posts.map(post => {
        return api
          .getCommentsForPost(post.id)
          .map((comments): [Post, Comment[]] => [post, comments]);
      });
      return zip(...postsWithComments);
    }),
    publishReplay(1),
    refCount()
  );
