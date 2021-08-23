import React, { useRef, useState } from 'react';
import { storage, database } from '../../firebase';
import ReactDOM from 'react-dom';
import { ROOT_FOLDER } from '../../hooks/useFolder';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Intent, ProgressBar, Card, Elevation } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import { v4 as uuidV4 } from "uuid";



export default function AddFileButton({ currentFolder }) {
    const { currentUser } = useAuth();
    const inputFile = useRef(null);
        const [uploadingFiles, setUploadingFiles] = useState([]);


    function handleFileBrowser() {
        inputFile.current.click();
    }
    
    function handleUpload(e) {
      const file = e.target.files[0];
      if (currentFolder == null || file == null) return;

      const id = uuidV4();
      setUploadingFiles((prevUploadingFiles) => [
        ...prevUploadingFiles,
        { id: id, name: file.name, progress: 0, error: false },
      ]);

      const filePath =
        currentFolder === ROOT_FOLDER
          ? `${currentFolder.path.join("/")}/${file.name}`
          : `${currentFolder.path.join("/")}/${currentFolder.name}/${
              file.name
            }`;

      const uploadTask = storage
        .ref(`/files/${currentUser.uid}/${filePath}`)
        .put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = snapshot.bytesTransferred / snapshot.totalBytes;
          setUploadingFiles((prevUploadingFiles) => {
            return prevUploadingFiles.map((uploadFile) => {
              if (uploadFile.id === id) {
                return { ...uploadFile, progress: progress };
              }

              return uploadFile;
            });
          });
        },
        () => {},
        () => {
          setUploadingFiles((prevUploadingFiles) => {
            return prevUploadingFiles.filter((uploadFile) => {
              return uploadFile.id !== id;
            });
          });

          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            database.files.add({
              url: url,
              name: file.name,
              createdAt: database.getCurrentTimestamp(),
              folderId: currentFolder.id,
              userName: currentUser.uid,
            });
          });
        }
      );
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
                // <Toast
                //   onDismiss={() => {
                //     console.log("dismissed");
                //   }}
                //   icon={"cloud-upload"}
                //   key={file.id}
                //   message={
                //     <>
                //       <p>{file.name}</p>
                //       <ProgressBar
                //         intent={Intent.PRIMARY}
                //         animate={true}
                //         value={file.error ? 1 : file.progress}
                //       />
                //     </>
                //   }
                // ></Toast>
                // </Toaster>
                <Card elevation={Elevation.THREE} key={file.id}>
                  <p>{file.name}</p>
                  <ProgressBar
                    intent={Intent.PRIMARY}
                    animate={true}
                    value={file.error ? 1 : file.progress}
                  />
                </Card>
              ))}
            </div>,
            document.body
          )}
      </>
    );
}
