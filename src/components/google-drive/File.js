// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFile } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import "@blueprintjs/core/lib/css/blueprint.css";
import DeleteButton from './DeleteButton';
import { Tag } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import { Link, Route } from "react-router-dom";


export default function File({ file }) {
    return (
      // eslint-disable-next-line react/jsx-no-target-blank
      <Tag minimal={true} interactive={true} large>
        <a target="_blank" rel="noreferrer" href={file.url} style={{color: '#4a4a4a'}}>
          {file.name}
        </a>
        <DeleteButton file={file}/>
      </Tag>
    );
}

