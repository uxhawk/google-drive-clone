import React from 'react';
import { Button } from "@blueprintjs/core";
import { db } from "../../firebase";
import "@blueprintjs/core/lib/css/blueprint.css";

export default function DeleteFileButton({file}) {
    // const collectionRef = database.files;
    // const fileRef = collectionRef.where("file_url", "==", file.url);
    // const fileRef = db
    //   .collection("files")
    //   .where("file_url", "==", file.url);
    
    function handleDelete() {
        const fileRef = db
            .collection("files")
            .where("url", "==", file.url);
        // console.log(fileRef);
        // fileRef.delete().then(() => {
        //     console.log(`deleted ${file.name}`)
        fileRef.get().then((querySnapshot) =>{
            
            querySnapshot.forEach((doc) => {
                doc.ref.delete();
            })
        }).catch((e) => {
            console.error(e);
        })
    }
    
    return (
      <Button
        icon={"trash"}
        minimal={true}
        style={{ marginLeft: "10px", color:'inherit' }}
        onClick={handleDelete}
        className={"tag-link"}
      />
    );
}
