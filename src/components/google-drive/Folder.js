 import React from 'react'; 
 import { Link } from 'react-router-dom';
//  import { Button } from 'react-bootstrap';
//  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//  import { faFolder } from '@fortawesome/free-solid-svg-icons'
//  import DeleteFolderButton from "./DeleteFolderButton";
 import { Tag, Icon, Intent, Colors } from "@blueprintjs/core";
 import "@blueprintjs/core/lib/css/blueprint.css";



 export default function Folder({ folder }) {
     return (
       <Tag minimal={true} interactive={true} large>
         <Icon
           icon={"folder-open"}
           size={"20px"}
           intent={Intent.MINIMAL}
           style={{ marginRight: "10px" }}
           color={Colors.GRAY1}
         />
         <Link
           to={{
             pathname: `/folder/${folder.id}`,
             state: { folder: folder },
           }}
           style={{ color: "#4a4a4a" }}
         >
           {folder.name}
         </Link>
         {/* <DeleteFolderButton folder={folder} /> */}
       </Tag>
     );
 }



 