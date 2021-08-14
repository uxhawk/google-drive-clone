import React, { } from 'react';
// import { Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { storage, database } from '../../firebase';
import { ROOT_FOLDER } from '../../hooks/useFolder';
import { useAuth } from '../../contexts/AuthContext';

export default function AddFileButton({ currentFolder }) {
    const { currentUser } = useAuth();

    function handleUpload(e) {
        const file = e.target.files[0];
        if (currentFolder == null || file == null) return;

        const filePath = 
            currentFolder === ROOT_FOLDER
            ? `${currentFolder.path.join('/')}/${file.name}` 
            : `${currentFolder.path.join('/')}/${currentFolder.name}/${file.name}`

        const uploadTask = storage
            .ref(`/files/${currentUser.uid}/${filePath}`)
            .put(file)

        uploadTask.on('state_changed',
            snapshot => {}, 
            () => {},
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then(url => {
                    database.files.add({
                        url: url,
                        name: file.name,
                        createdAt: database.getCurrentTimestamp(),
                        folderId: currentFolder.id,
                        userName: currentUser.uid,
                    })
                })
            }
        )
    }

    return (
        <label className='btn btn-outline-success btn-sm mx-2'>
            <FontAwesomeIcon icon={faFileUpload} />
            <input 
                type='file' 
                onChange={handleUpload} 
                className='file-upload'
            />
        </label>
    )
}
