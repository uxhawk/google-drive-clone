import React from "react";
import { Button } from "@blueprintjs/core";
import { storage } from "../../firebase";
import "@blueprintjs/core/lib/css/blueprint.css";

export default function DeleteFolderButton({ folder }) {
  // const collectionRef = database.files;
  // const fileRef = collectionRef.where("file_url", "==", file.url);
  // const fileRef = db
  //   .collection("files")
  //   .where("file_url", "==", file.url);

  function handleDelete() {
    const folderRef = storage.ref().child(folder.id);
    folderRef.delete().then(() => {
        console.log('deleted folder');
    }).catch((error) => {
        console.error(error);
    })
  }

  return (
    <Button
      icon={"trash"}
      minimal={true}
      style={{ marginLeft: "10px", color: "inherit" }}
      onClick={handleDelete}
      className={"tag-link"}
    />
  );
}
