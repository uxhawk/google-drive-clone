import React from 'react'
import Navbar from './Navbar';
import { useFolder } from '../../hooks/useFolder';
import { Container } from 'react-bootstrap';
import Folder from './Folder';
import File from './File';
import AddFolderButton from './AddFolderButton';
import AddFileButton from './AddFileButton';
import { useParams, useLocation } from 'react-router-dom';
import FolderBreadcrumbs from './FolderBreadcrumbs';
import "@blueprintjs/core/lib/css/blueprint.css";



export default function Dashboard() {
    const {folderId} = useParams();
    const { state = { } } = useLocation();
    const { folder, childFolders, childFiles } = useFolder(folderId, state.folder);

    return (
      <>
        <Navbar />
        <Container fluid className="p-4">
          <div className="d-flex align-items-center mb-3">
            <FolderBreadcrumbs currentFolder={folder} />
            <AddFileButton currentFolder={folder} />
            <AddFolderButton currentFolder={folder} />
          </div>

          {/* print child folders */}
          {childFolders.length > 0 && (
            <div className="d-flex flex-wrap">
              {childFolders.map((childFolder) => (
                <div
                  key={childFolder.id}
                  style={{ maxWidth: "350px" }}
                  className="folders"
                >
                  <Folder folder={childFolder} />
                </div>
              ))}
            </div>
          )}

          {childFolders.length > 0 && childFiles.length > 0 && (
            <>
              <h3 className={"bp3-heading"} style={{ marginBottom: "10px" }}>
                Files
              </h3>
            </>
          )}

          {/* print child files */}
          {childFiles.length > 0 && (
            <div className="d-flex flex-wrap">
              {childFiles.map((childFile) => (
                <div
                  key={childFile.id}
                  // style={{ maxWidth: "350px" }}
                  className="files"
                >
                  <File file={childFile} />
                </div>
              ))}
            </div>
          )}
        </Container>
      </>
    );
}
