import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add user API call
  const addUser = async () => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone }),
      });
      if (res.ok) {
        setName('');
        setPhone('');
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete user API call
  const deleteUser = async (id) => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h1>Users</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <button onClick={addUser}>Add User</button>
      </div>

      <ul>
        {users.map((user) => (
          <li key={user.id} style={{ marginBottom: 8 }}>
            {user.name} - {user.phone}{' '}
            <button onClick={() => deleteUser(user.id)} style={{ marginLeft: 10 }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
