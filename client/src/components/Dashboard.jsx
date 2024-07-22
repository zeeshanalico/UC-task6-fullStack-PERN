import { useEffect, useState, useRef } from 'react';
import api from '../api/api.js';
import Modal from './Modal.jsx';
import Item from './Item.jsx';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { role } = useOutletContext()
  const [list, setList] = useState([]);
  const [status, setStatus] = useState('show'); // show|hide
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const masterCheckBox = useRef()
  const checkBoxesRef = useRef([]);

  const navigate = useNavigate()

  const fetchData = async () => {
    setList(await api.getItems());

  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    const response = await api.deleteItem(id);
    setList(prevList => prevList.filter(item => item.id !== id));
  };

  const handleCheckedItems = (e, id) => {
    const allIsChecked = Array.from(checkBoxesRef.current).every(checkbox => checkbox.checked === true);
    if (allIsChecked) {
      masterCheckBox.current.checked = true;
    } else {
      masterCheckBox.current.checked = false;
    }

    if (e.target.checked) {
      setCheckedItems(prevState => [...prevState, id]);
    } else {
      setCheckedItems(prevState => prevState?.filter(item => item !== id));
    }
  };

  const handleMasterCheck = (e) => {
    const isChecked = e.target.checked;
    const itemIds = list?.filter(item => item.status === status).map(item => item.id);

    checkBoxesRef?.current?.forEach(checkbox => {
      checkbox.checked = isChecked;
    });

    if (isChecked) {
      setCheckedItems(itemIds);
    } else {
      setCheckedItems([]);
    }
  };

  const statusChangeHandler = (status) => {
    checkedItems.map(async id => {
      const response = await api.changeStatusOfItem(id, status);
      fetchData();
      masterCheckBox.current.checked = false;
    });
  };

  const editHandler = (item) => {
    setSelectedItem(item);
    setShowUpdateModal(true)
  };

  const submitHandle = async (e, action, currentItem) => {
    e.preventDefault();
    const { id, title, duration, link, status } = currentItem;
    try {
      if (action === 'create') {
        const response = await api.createItem(title, duration, link, status);
        setSelectedItem(null)
        setShowCreateModal(false)
      } else if (action === 'update') {
        const response = await api.updateItem(id, title, duration, link);
        setShowUpdateModal(false)
      }

      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/', { replace: true })

  }

  const onSwitchList = e => {
    masterCheckBox.current.checked = false;
    setStatus(e.target.value)
    setCheckedItems([])
  }
  return (
    <>
      <div className='d-flex flex-row'>
        <select className='form-select w-25 m-2' onChange={onSwitchList}>

          <option value="show">Show List</option>
          <option value="hide">Hide List</option>
        </select>

        {status === 'show'
          ? <button onClick={() => statusChangeHandler('show-to-hide')} className='m-2 btn btn-outline-primary'>Add to Hide</button>
          : <button onClick={() => statusChangeHandler('hide-to-show')} className='m-2 btn btn-outline-primary'>Add to Show</button>}


        {(role.role == 'ADMIN' || role.role === 'CREATOR') && (<button type="button" className="btn btn-outline-info m-2 me-4 ms-auto " onClick={() => setShowCreateModal(true)}>
          + Add
        </button>)}
        <svg onClick={handleLogout} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" className="bi bi-power mt-2 me-4 ms-auto" viewBox="0 0 16 16">
          <path d="M7.5 1v7h1V1z" />
          <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812" />
        </svg>
      </div>

      <table className='table'>
        <thead>
          <tr>
            <td><input className='form-check-input' onClick={handleMasterCheck} type="checkbox" id="master-checkbox" ref={masterCheckBox} /></td>
            <td className='text-dark'>Title</td>
            <td className='text-dark'>Duration</td>
            <td className='text-dark'>Link</td>
            {(role.role === 'ADMIN' || role.role === 'EDITOR') && <td className='text-dark'>Edit</td>}
            {(role.role === 'ADMIN') && <td className='text-dark'>Delete</td>}
          </tr>
        </thead>
        <tbody>
          {list
            ?.filter(item => item.status === status)
            ?.map((item, keyID) => <Item key={item.id} item={item} handleCheckedItems={handleCheckedItems} editHandler={editHandler} deleteHandler={deleteHandler} role={role} setShowUpdateModal={setShowUpdateModal} keyID={keyID} ref={checkBoxesRef} />)
          }
        </tbody>
      </table>
      <Modal idOfModal='createModal' action='create' submitHandle={submitHandle} show={showCreateModal} setShow={setShowCreateModal} />
      <Modal idOfModal='updateModal' action='update' item={selectedItem} submitHandle={submitHandle} show={showUpdateModal} setShow={setShowUpdateModal} />
    </>
  );
};

export default Dashboard;
