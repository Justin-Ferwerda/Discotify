import { useEffect, useState } from 'react';
import { getAllUsers } from '../api/userData';
import UserCard from '../components/UserCard';

function Community() {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    getAllUsers().then(setUsers);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="userCardContainer">
      {users?.map((user) => (
        <UserCard userObject={user} />
      ))}
    </div>
  );
}

export default Community;
