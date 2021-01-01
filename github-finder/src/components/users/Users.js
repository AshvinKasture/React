import React from 'react';

import UserItem from './UserItem';
import Spinner from '../layout/Spinner';

const Users = ({ loading, users }) => {
  return loading ? (
    <Spinner />
  ) : (
    <div style={userStyle}>
      {users.map((user) => {
        return <UserItem key={user.id} user={user} />;
        //   return <div key={user.id}>{user.login}</div>;
      })}
    </div>
  );
};
const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem',
};

export default Users;
