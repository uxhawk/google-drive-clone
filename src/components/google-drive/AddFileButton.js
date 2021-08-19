import React, { useRef } from 'react';
import { storage, database } from '../../firebase';
import { ROOT_FOLDER } from '../../hooks/useFolder';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Intent } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";



export default function AddFileButton({ currentFolder }) {
    const { currentUser } = useAuth();
    const inputFile = useRef(null);

    function handleFileBrowser() {
        inputFile.current.click();
    }
    
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
      <>
        <Button
          onClick={handleFileBrowser}
          icon={"cloud-upload"}
          intent={Intent.SUCCESS}
          style={{ marginRight: "10px" }}
          large={true}
        ></Button>
        <input
          type="file"
          ref={inputFile}
          style={{ display: "none" }}
          onChange={handleUpload}
        ></input>
      </>
    );
}
