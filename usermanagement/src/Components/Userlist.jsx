import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db-hook';
import '../Styles/userlist.css';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Userlist = () => {
  const { getAll, update, deleteRecord } = useIndexedDB('users');
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null); 
  const [editedUsername, setEditedUsername] = useState(''); 

  useEffect(() => {
    getAll().then((usersFromDB) => setUsers(usersFromDB));
  }, [getAll]);

  const handleBlockUnblock = (user) => {
    const updatedUser = { ...user, status: user.status === 'Active' ? 'Blocked' : 'Active' };
    update(updatedUser).then(() => {
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? updatedUser : u))
      );
    });
  };

  const handleDelete = (id) => {
    deleteRecord(id).then(() => {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    });
  };

  const handleEdit = (user) => {
    setEditUserId(user.id); 
    setEditedUsername(user.username); 
  };

  const handleSaveUsername = (user) => {
    const updatedUser = { ...user, username: editedUsername };
    update(updatedUser).then(() => {
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? updatedUser : u))
      );
      setEditUserId(null); 
    });
  };

  const handleCancelEdit = () => {
    setEditUserId(null); 
  };

  return (
    <div style={{ color: "white", backgroundColor: "black", height: "720px" }}>
      <h2>List of Users</h2>
      <Table className='usertable'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editUserId === user.id ? (
                  <input
                    type="text"
                    value={editedUsername}
                    onChange={(e) => setEditedUsername(e.target.value)}
                  />
                ) : (
                  user.username 
                )}
              </td>
              <td>{user.status}</td>
              <td>
  {editUserId === user.id ? (
    <div className="button-container">
      <Button className='savebutton' onClick={() => handleSaveUsername(user)}>Save</Button>
      <Button className='cancelbutton' onClick={handleCancelEdit}>Cancel</Button>
    </div>
  ) : (
    <div className="button-container">
      <Button className='editbutton' onClick={() => handleEdit(user)}>Edit</Button>
      <Button className='blockbutton' onClick={() => handleBlockUnblock(user)}>
        {user.status === 'Active' ? 'Block' : 'Unblock'}
      </Button>
      <Button className='deletebutton' onClick={() => handleDelete(user.id)}>Delete</Button>
    </div>
  )}
</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to={'/'}><Button className='logbtn'>Login</Button></Link>
    </div>
  );
};

export default Userlist;
