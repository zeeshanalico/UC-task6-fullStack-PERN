import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { createItem, changeStatus, updateItem, deleteItem } from '../store/slices/itemsSlice';
import { logout } from '../store/slices/authSlice';
const Dashboard = () => {
  // Directly use the JSON array instead of parsing

  const dispatch = useDispatch()
  const items = useSelector(state => state.items)

  const handleDelete = (id) => {
    dispatch(deleteItem(id))
  }
  const handleEdit = (id) => {
    dispatch(updateItem(id))
  }

  const handleLogout = () => {
    dispatch(logout())

  }

  return (
    <>
      <button className='btn btn-danger' onClick={handleLogout}>logout</button>
      <table className='table'>
        <thead>
          <tr>
            <td className='text-dark'>Title</td>
            <td className='text-dark'>Duration</td>
            <td className='text-dark'>Link</td>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.duration}</td>
              <td><a href={item.link}>{item.link}</a></td>
              <td className='text-danger' onClick={() => handleDelete(item.id)}>Delete</td>
              <td className='text-danger' onClick={() => handleEdit(item.id)}>Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Dashboard;
