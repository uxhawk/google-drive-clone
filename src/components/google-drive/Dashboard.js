import React from 'react'
import Navbar from './Navbar';
import { useFolder } from '../../hooks/useFolder';
import { Container } from 'react-bootstrap';
import Folder from './Folder';
import AddFolderButton from './AddFolderButton';
import { useParams, useLocation } from 'react-router-dom';
import FolderBreadcrumbs from './FolderBreadcrumbs';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//  import { faHome } from '@fortawesome/free-solid-svg-icons'

export default function Dashboard() {
    const {folderId} = useParams();
    const { state = { } } = useLocation();
    const { folder, childFolders } = useFolder(folderId, state.folder);

    return (
        <>
            <Navbar />
            <Container fluid className='p-4'>
                <div className='d-flex align-items-center mb-3'>
                    <FolderBreadcrumbs  currentFolder={folder}/>
                    <AddFolderButton currentFolder={folder} />   
                </div>
                
                {childFolders.length > 0 && (
                    <div className='d-flex flex-wrap'>
                        {childFolders.map(childFolder => (
                            <div
                                key={childFolder.id}
                                style={{ maxWidth: '250px' }}
                                className='folder-link'
                            >
                                <Folder folder={childFolder} className='folder-link'/>
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </>
    )
}
