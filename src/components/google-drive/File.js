import React from 'react'
import "@blueprintjs/core/lib/css/blueprint.css";
import DeleteFileButton from './DeleteFileButton';
import { Tag, Icon, Intent, Colors } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";

export default function File({ file }) {
    return (
      // eslint-disable-next-line react/jsx-no-target-blank
      <Tag minimal={true} interactive={true} large>
        <Icon
          icon={"document"}
          intent={Intent.MINIMAL}
          size={'20px'}
          style={{ marginRight: "10px" }}
          color={Colors.GRAY1}
        />
        <a
          target="_blank"
          rel="noreferrer"
          href={file.url}
          style={{ color: "#4a4a4a" }}
        >
          {file.name}
        </a>
        <DeleteFileButton file={file} />
      </Tag>
    );
}

