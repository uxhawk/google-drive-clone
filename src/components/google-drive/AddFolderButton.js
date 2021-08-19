import React, { useState, useRef } from 'react';
// import { Modal, Form,  } from 'react-bootstrap';
import { database } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { ROOT_FOLDER } from '../../hooks/useFolder';
import { Button, Intent, Dialog, Classes, FormGroup, InputGroup } from "@blueprintjs/core";

export default function AddFolderButton({ currentFolder }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const { currentUser } = useAuth();
    const folderName = useRef();
    const [disabled, setDisabled] = useState(true);
    
    function openModal() {
      setOpen(true);
      setName("");
    }

    function closeModal() {
        setOpen(false);
        setName('');
        setDisabled(true);
    }

    function checkDisabled() {
      if (folderName.current.value === '') {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
      
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
        <Button
          large={true}
          outlined={false}
          onClick={openModal}
          icon={"folder-new"}
          intent={Intent.SUCCESS}
        />
        <Dialog
          icon={"folder-shared-open"}
          title="Create New Folder"
          isOpen={open}
          canEscapeKeyClose={true}
          canOutsideClickClose={true}
          onClose={closeModal}
        >
          <div className={Classes.DIALOG_BODY}>
            <FormGroup
              labelFor="user-name"
              labelInfo="(required)"
              label={"Folder Name"}
            >
              <InputGroup
                id="folder-name"
                placeholder="Enter folder name"
                inputRef={folderName}
                leftIcon={"folder-open"}
                type={"text"}
                onChange={() => {
                  setName(folderName.current.value);
                  checkDisabled();
                }}
              />
            </FormGroup>
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button rightIcon={"disable"} onClick={closeModal}>
                Cancel
              </Button>
              <Button
                intent={Intent.SUCCESS}
                rightIcon={"folder-new"}
                onClick={handleSubmit}
                disabled={disabled}
              >
                Create Folder
              </Button>
            </div>
          </div>
        </Dialog>
      </>
    );
}
