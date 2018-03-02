import {
  makeActiveUsersSignal,
  makeSelectUserSignal,
  makeSelectedUserSignal,
  makeActivePostsSignal,
  makeActivePostsWithCommentsSignal
} from "./signalFactories";
import api from "../http/api";

export const activeUsers$ = makeActiveUsersSignal(api);
export const selectUser$ = makeSelectUserSignal();
export const selectedUser$ = makeSelectedUserSignal(activeUsers$, selectUser$);
export const activePosts$ = makeActivePostsSignal(api, selectUser$);
export const activePostsWithComments$ = makeActivePostsWithCommentsSignal(
  api,
  activePosts$
);
