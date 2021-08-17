import React, { } from 'react';
import { storage, database } from '../../firebase';
import { ROOT_FOLDER } from '../../hooks/useFolder';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Intent, label, FileInput, input } from "@blueprintjs/core";


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
      //   <>
      //   <Button
      //     onClick={handleUpload}
      //     icon={"cloud-upload"}
      //     intent={Intent.SUCCESS}
      //     style={{ marginRight: "10px" }}
      //   />
      //     <input type="file" onChange={handleUpload} className="file-upload" />
      //   </>

      // <FileInput text="Choose file..." onInputChange={handleUpload} />

      
        <Button
          onClick={handleUpload}
          icon={"cloud-upload"}
          intent={Intent.SUCCESS}
          style={{ marginRight: "10px" }}
          type='file-input'
        > 
        <input type="file"></input>
        </Button> 
      

      //   <label className='btn btn-outline-success btn-sm mx-2'>

      //       <input
      //           type='file'
      //           onChange={handleUpload}
      //           className='file-upload'
      //       />
      //   </label>
    );
}
