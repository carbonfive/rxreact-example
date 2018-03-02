import * as React from "react";
import "../../App.css";
import { User, Id } from "../../domain";
import { withViewModel } from "@rxreact/core";
import {
  activeUsers$,
  selectUser$,
  selectedUser$
} from "../../signalGraph/signalGraph";
import Posts from "./Posts";

export interface UserProps {
  users: User[];
  selectedUser: User | undefined;
  selectUser: (userId: Id) => void;
}

let vm = {
  inputs: {
    users: activeUsers$.startWith([]),
    selectedUser: selectedUser$.startWith(undefined)
  },
  outputs: {
    selectUser: selectUser$
  }
};

let Users: React.SFC<UserProps> = ({ users, selectedUser, selectUser }) => {
  let userParagraphs = users.map(user => (
    <p key={user.id} onClick={() => selectUser(user.id)}>
      {user.name}
    </p>
  ));
  return (
    <div>
      {userParagraphs}
      <p>Selected User: {selectedUser && selectedUser.name}</p>
      <Posts />
    </div>
  );
};

export default withViewModel(vm, Users);
