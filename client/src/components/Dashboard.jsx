import { useEffect, useState, useRef } from 'react';
import api from '../api/api.js';
import Modal from './Modal.jsx';
import Item from './Item.jsx';
import { useOutlet, useOutletContext,useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { role } = useOutletContext()
  console.log(role);
  const [list, setList] = useState([]);
  const [status, setStatus] = useState('show'); // show|hide
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const createModalRef = useRef(null);
  const updateModalRef = useRef(null);

  const navigate=useNavigate()
  const fetchData = async () => {
    setList(await api.getItems());

  };

  useEffect(() => {
    fetchData();
    //   const masterCheckBox = document.querySelector('#master-checkbox');
    //  const currentStatusList= list.filter(item => item.status === status)
    //  console.log(currentStatusList.length);

    //   if (currentStatusList.length == 0) {
    //     masterCheckBox.disabled = true;
    //   } else {
    //     masterCheckBox.disabled = false;
    //   }
  }, []);

  const deleteHandler = async (id) => {
    const response = await api.deleteItem(id);
    setList(prevList => prevList.filter(item => item.id !== id));
  };

  const handleCheckedItems = (e, id) => {
    const checkboxes = document.querySelectorAll('.item-checkbox');
    const masterCheckBox = document.querySelector('#master-checkbox');
    const allIsChecked = Array.from(checkboxes).every(checkbox => checkbox.checked === true);
    if (allIsChecked) {
      masterCheckBox.checked = true;
    } else {
      masterCheckBox.checked = false;
    }

    if (e.target.checked) {
      setCheckedItems(prevState => [...prevState, id]);
    } else {
      setCheckedItems(prevState => prevState.filter(item => item !== id));
    }
  };

  const handleMasterCheck = (e) => {
    const isChecked = e.target.checked;
    const allCheckboxes = document.querySelectorAll('.item-checkbox');
    const itemIds = list.filter(item => item.status === status).map(item => item.id);

    allCheckboxes.forEach(checkbox => {
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
    });
  };

  const editHandler = (item) => {
    setSelectedItem(item);
  };

  const hideModal = (ref) => {
    if (ref && ref.current) {
      const modal = bootstrap.Modal.getInstance(ref.current) || new bootstrap.Modal(ref.current);
      modal.hide();
      ref.current.addEventListener('hidden.bs.modal', () => {
        const backdrop = document.querySelector('.modal-backdrop');
        // backdrop.style.display='none'
        // location.reload()
        if (backdrop) {
          backdrop.parentNode.removeChild(backdrop);
        }
      });
    }
  };

  const submitHandle = async (e, action, currentItem) => {
    e.preventDefault();
    const { id, title, duration, link, status } = currentItem;
    try {
      if (action === 'create') {
        const response = await api.createItem(title, duration, link, status);
      } else if (action === 'update') {
        const response = await api.updateItem(id, title, duration, link);
      }
      // hideModal(action === 'create' ? createModalRef : updateModalRef);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/', {replace:true})
    
  }
  return (
    <>
      <div className='d-flex flex-row'>
        <select className='form-select w-25 m-2' onChange={e => setStatus(e.target.value)}>
          <option value="show">Show List</option>
          <option value="hide">Hide List</option>
        </select>

        {status === 'show'
          ? <button onClick={() => statusChangeHandler('show-to-hide')} className='m-2 btn btn-outline-primary'>Add to Hide</button>
          : <button onClick={() => statusChangeHandler('hide-to-show')} className='m-2 btn btn-outline-primary'>Add to Show</button>}


        {(role.role == 'ADMIN' || role.role === 'CREATOR') && (<button type="button" className="btn btn-outline-info m-2 me-4 ms-auto " data-bs-toggle="modal"
          data-bs-target="#createModal">
          + Add
        </button>)}
          <svg onClick={handleLogout} xmlns="http://www.w3.org/2000/svg" width="32" height="32"  fill="red" className="bi bi-power mt-2 me-4 ms-auto" viewBox="0 0 16 16">
            <path d="M7.5 1v7h1V1z" />
            <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812" />
          </svg>
      </div>

      <table className='table'>
        <thead>
          <tr>
            <td><input className='form-check-input' onClick={handleMasterCheck} type="checkbox" id="master-checkbox" /></td>
            <td className='text-dark'>Title</td>
            <td className='text-dark'>Duration</td>
            <td className='text-dark'>Link</td>
            {(role.role === 'ADMIN' || role.role === 'EDITOR') && <td className='text-dark'>Edit</td>}
            {(role.role === 'ADMIN') && <td className='text-dark'>Delete</td>}
          </tr>
        </thead>
        <tbody>
          {list
            .filter(item => item.status === status)
            .map(item => <Item key={item.id} item={item} handleCheckedItems={handleCheckedItems} editHandler={editHandler} deleteHandler={deleteHandler} role={role} />)
          }
        </tbody>
      </table>
      <Modal idOfModal='createModal' action='create' submitHandle={submitHandle} ref={createModalRef} />
      <Modal idOfModal='updateModal' action='update' item={selectedItem} submitHandle={submitHandle} ref={updateModalRef} />
    </>
  );
};

export default Dashboard;
