import React, { useRef } from 'react';
import { storage, database } from '../../firebase';
import { ROOT_FOLDER } from '../../hooks/useFolder';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Intent, ProgressBar, Toast } from "@blueprintjs/core";
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
        {uploadingFiles.length > 0 &&
          ReactDOM.createPortal(
            <div
              style={{
                position: "absolute",
                bottom: "1rem",
                right: "1rem",
                maxWidth: "250px",
                marginRight: "50px",
              }}
            >
              {uploadingFiles.map((file) => (
                // <Toaster key={file.id}>
                <Toast
                  onDismiss={() => {
                    console.log("dismissed");
                  }}
                  icon={"cloud-upload"}
                  key={file.id}
                  message={
                    <>
                      <p>{file.name}</p>
                      <ProgressBar
                        intent={Intent.PRIMARY}
                        animate={true}
                        value={file.error ? 1 : file.progress}
                      />
                    </>
                  }
                ></Toast>
                // </Toaster>
              ))}
            </div>,
            document.body
          )}
      </>
    );
}
