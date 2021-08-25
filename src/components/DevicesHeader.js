import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import Search from './Search';

function DevicesHeader(props) {
  return (
    <div className='devices-header'>
      <div className='title'>
        <FontAwesomeIcon icon={faHome} />
        <h3>Device Overview</h3>
      </div>
      <div className='search_container'>
        <Button className='mr-4 position-sticky sticky-top'>
          <FontAwesomeIcon icon={faFilter} onClick={props.handleClick} />
        </Button>
        <Search />
      </div>

      <Button>
        <FontAwesomeIcon icon={faPlus} />
        Add
      </Button>
    </div>
  );
}

export default DevicesHeader;
