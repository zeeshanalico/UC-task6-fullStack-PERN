import axios from 'axios'
const server_url = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
    }
})

const getItems = async (status) => {
    if (status) {
        url += `?status=${status}`;
    }
    try {
        const response = await server_url.get('/items');
        return response.data;
    } catch (error) {
        console.error('Error fetching Items:', error);
    }
}

const createItem = async (title, duration, link, status) => {//further we have to modify only 4rth param as status to add in hide
    if (!title || !duration || !link) {
        return;
    } try {
        const response = await server_url.post(`/items`, { title, duration, link }, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating Item:', error);
    }
}

const getItem = async (id) => {
    if (!id) return
    try {

        const response = await fetch(`${server_url_BASE_URL}/${id}`, {
            method: 'GET',
        });
        return response.json();
    } catch (error) {
        console.error('Error fetching Item:', error);
    }
}

const updateItem = async (id, title, duration, link) => {
    if (!title || !duration || !link) {
        return;
    } try {
        const response = await server_url.put(`/items/${id}`, { title, duration, link }, {
            headers: { 'Content-Type': 'application/json' },
        });
        return await response.data;
    } catch (error) {
        console.error('Error updating Item:', error);
    }
}

const deleteItem = async (id) => {
    if (!id) return;
    try {
        const response = await server_url.delete(`/items/${id}`);
        return await response.data;
    } catch (error) {
        console.error('Error deleting Item:', error);
    }
}

const changeStatusOfItem = async (id, status) => {
    if (!id) return
    try {
        const response = await server_url.patch(`/items/${id}`, { status }, {
            headers: { 'Content-Type': 'application/json' },
        });
        return await response.data;
    } catch (error) {
        console.error('Error changing status of Item:', error);

    }
}

export default { getItems, createItem, deleteItem, getItem, changeStatusOfItem, updateItem };