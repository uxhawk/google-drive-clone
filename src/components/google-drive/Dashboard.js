import React from 'react'
import Navbar from './Navbar';
import { useFolder } from '../../hooks/useFolder';
import { Container } from 'react-bootstrap';
import Folder from './Folder';
import AddFolderButton from './AddFolderButton';

export default function Dashboard() {
    const { folder, childFolders } = useFolder('2iCUL6pmxkN8YcRF9tfY');
    console.log(childFolders);

    return (
        <>
            <Navbar />
            <Container fluid className='p-4'>
                <AddFolderButton currentFolder={folder} />   
                {childFolders.length > 0 && (
                    <div className='d-flex flex-wrap'>
                        {childFolders.map(childFolder => (
                            <div
                                key={childFolder.id}
                                style={{ maxWidth: '250px' }}
                                className='p-2'
                            >
                                <Folder folder={childFolder} />
                            </div>
                        ))}
                    </div>
                )}
                
                
                {/* {childFolders.length > 0 && (
                    <div className='d-flex flex-wrap'>
                        {childFolders.map(childFolder => (
                            <div
                                key={childFolder.id}
                                style={{ maxWidth: '250px' }}
                                className='p-2'
                            >
                                <Folder folder={childFolder} />
                            </div>
                        ))}
                    </div>
                )}          */}
            </Container>
        </>
    )
}
