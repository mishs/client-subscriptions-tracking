import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import Search from './Search';

function DevicesHeader(props) {
  return (
    <div className='devices-header'>
      <div className='title'>
        <Button className='mr-4 position-sticky sticky-top'>
          <FontAwesomeIcon icon={faFilter} onClick={props.handleClick} />
        </Button>
      </div>
      <div className='search_container'>

        <h2> <FontAwesomeIcon icon={faHome} /> Device Overview</h2>
      </div>

      <Search />
    </div>
  );
}

export default DevicesHeader;
