import React, { useState, useEffect, forwardRef } from 'react';

const Modal = forwardRef(({ idOfModal, action, item, submitHandle }, ref) => {
    const [currentItem, setCurrentItem] = useState(item || {});

    useEffect(() => {
        setCurrentItem(item || {});
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentItem(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div className="modal fade" data-bs-keyboard="false" data-bs-backdrop="static" id={idOfModal} tabIndex="-1" aria-hidden="true" ref={ref}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {action === 'create' ? 'Add new Item' : 'Update the Item'}
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="form" onSubmit={(e) => submitHandle(e, action, currentItem)}>
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
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <input type="submit" className="btn btn-primary" id="submitButton" value={action} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
});

export default Modal;
