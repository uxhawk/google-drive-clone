import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { ROOT_FOLDER } from '../../hooks/useFolder';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'

export default function FolderBreadcrumbs({ currentFolder }) {
    let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
    if (currentFolder) path = [...path, ...currentFolder.path];

    
    return (
        <Breadcrumb 
            listProps={{ className: 'bg-white p-0 m-0'}}
            className='flex-grow-1 custom-link'
        >
        {path.map((folder, index) => (
           index === 0 ?             
           <Breadcrumb.Item 
                key={folder.id}
                linkAs={Link}
                linkProps={{
                    to: {
                        pathname: folder.id ? `/folder/${folder.id}` : '/',
                        state: { folder: { 
                                ...folder,
                                path: path.slice(1, index)
                            }
                        }
                    }
           }}
                className='text-truncate d-inline-block' 
                style={{ maxWidth: '150px'}} 
            >
                <FontAwesomeIcon icon={faHome} style={{marginRight: '10px'}} />
                {folder.name}
            </Breadcrumb.Item> 
       :    
            <Breadcrumb.Item 
                key={folder.id}
                linkAs={Link}
                linkProps={{
                    to: {
                        pathname: folder.id ? `/folder/${folder.id}` : '/',
                        state: { folder: { 
                                ...folder,
                                path: path.slice(1, index)
                            }
                        }
                    }
            }}
            className='text-truncate d-inline-block' 
            style={{ maxWidth: '150px'}} 
        >
            {folder.name}
        </Breadcrumb.Item>

        
        ))}
        {currentFolder && (
            <Breadcrumb.Item     
                className='text-truncate d-inline-block' 
                style={{ maxWidth: '200px'}} 
                active
            >
                {/* <FontAwesomeIcon icon={faHome} style={{marginRight: '10px'}}  /> */}
                {currentFolder === ROOT_FOLDER ? 
                <> 
                <FontAwesomeIcon icon={faHome} style={{marginRight: '10px'}} />
                {currentFolder.name}
                </>
                :
                currentFolder.name
                }
                {/* {currentFolder.name} */}
            </Breadcrumb.Item>
        )}
        
        </Breadcrumb>
    )
}
