import React, { useState, useEffect, forwardRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalC = ({ idOfModal, action, item, submitHandle, show, setShow }) => {
    const [currentItem, setCurrentItem] = useState(item || {});
    const handleClose = () => setShow(false);
    useEffect(() => {
        setCurrentItem(item || {});
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentItem(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false} id={idOfModal}>
                <form id="form" onSubmit={(e) => {
                    submitHandle(e, action, currentItem)
                    setCurrentItem({})
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>{action === 'create' ? 'Add new Item' : 'Update the Item'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-body">
                            <input
                                onChange={handleChange}
                                value={currentItem?.title || ''}
                                name="title"
                                type="text"
                                minLength="5"
                                className="form-control createInput"
                                placeholder="Title"
                                required
                                aria-describedby="basic-addon1"
                            />
                        </div>
                        <div className="modal-body">
                            <input
                                onChange={handleChange}
                                value={currentItem?.duration || ''}
                                name="duration"
                                type="number"
                                min="0"
                                className="form-control createInput"
                                required
                                placeholder="Duration in minutes"
                                aria-describedby="basic-addon1"
                            />
                        </div>
                        <div className="modal-body">
                            <input
                                onChange={handleChange}
                                value={currentItem?.link || ''}
                                name="link"
                                type="url"
                                className="form-control createInput"
                                placeholder="Link"
                                required
                                aria-describedby="basic-addon1"
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type='submit' variant="primary">
                            {action}
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>

    );
}
export default ModalC;
