import React, { useState, useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { database } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { ROOT_FOLDER } from '../../hooks/useFolder';

export default function AddFolderButton({ currentFolder }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const { currentUser } = useAuth();
    const folderName = useRef();
    
    function openModal() {
        setOpen(true);
    }

    function closeModal() {
        setOpen(false);
        setName('');
    }

    function handleSubmit(e) {
        e.preventDefault();

        if(currentFolder == null) return;

        //set up the path variable to display the list of breadcrumbs
        const path = [...currentFolder.path];
        if(currentFolder !== ROOT_FOLDER) {
            path.push({ name: currentFolder.name, id: currentFolder.id});
        }
        
        //create a folder in the database
        database.folders.add({
            name: name,
            parentId: currentFolder.id,
            userName: currentUser.uid,
            path: path,
            createdAt: database.getCurrentTimestamp()
        });
        setName('');
        closeModal();
    }
    
    return (
        <>
            <Button onClick={openModal} variant='outline-success' size='sm'>
                <FontAwesomeIcon icon={faFolderPlus} />  
            </Button>
            <Modal show={open} onHide={closeModal} animation={false}>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Folder Name</Form.Label>
                        <Form.Control 
                        type='text'
                        ref={folderName}
                        required
                        value={name}
                        onChange={() => setName(folderName.current.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeModal}>Cancel</Button>
                    <Button variant='success' type='submit'>Add Folder</Button>
                </Modal.Footer>
            </Form>
            </Modal>
        </>
    )
}
