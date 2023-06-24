import React, { useState } from 'react';

const UserForm = ({ addUser, updateUser, currentUser, setCurrentUser }) => {
  const [name, setName] = useState(currentUser ? currentUser.name : '');
  const [email, setEmail] = useState(currentUser ? currentUser.email : '');
  const [phone, setPhone] = useState(currentUser ? currentUser.phone : '');

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!name || !email || !phone) {
      alert('Please fill in all fields');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (!isValidPhone(phone)) {
      alert('Please enter a valid phone number');
      return;
    }

    
    if (currentUser) {
      updateUser({ id: currentUser.id, name, email, phone });
      setCurrentUser(null); 
    } else {
      addUser({ name, email, phone });
    }

    
    setName('');
    setEmail('');
    setPhone('');
  };

  
  const isValidEmail = (email) => {
    
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  
  const isValidPhone = (phone) => {
    
    return /^\d{10}$/.test(phone);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Phone:
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">{currentUser ? 'Update' : 'Add'} User</button>
    </form>
  );
};


const UserList = ({ users, setCurrentUser, deleteUser }) => {
  if (users.length === 0) {
    return <div>No users found</div>;
  }

  const handleEdit = (user) => {
    setCurrentUser(user);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id);
    }
  };

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <div>Name: {user.name}</div>
          <div>Email: {user.email}</div>
          <div>Phone: {user.phone}</div>
          <button onClick={() => handleEdit(user)}>Edit</button>
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};


const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const addUser = (user) => {
    
    const id = Date.now().toString();

    
    const newUser = { id, ...user };

    
    setUsers([...users, newUser]);
  };

  const updateUser = (updatedUser) => {
    
    const index = users.findIndex((user) => user.id === updatedUser.id);

  
    const updatedUsers = [...users];
    updatedUsers[index] = updatedUser;

    
    setUsers(updatedUsers);
  };

  const deleteUser = (id) => {
    
    const updatedUsers = users.filter((user) => user.id !== id);

    
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h1>User Management Application</h1>
      <UserForm
        addUser={addUser}
        updateUser={updateUser}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <UserList
        users={users}
        setCurrentUser={setCurrentUser}
        deleteUser={deleteUser}
      />
    </div>
  );
};

export default App;
