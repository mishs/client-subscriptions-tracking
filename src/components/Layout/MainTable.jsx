import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Col } from 'react-bootstrap';
import { DevicesContext } from '../../Context/DevicesContext';
import DevicesHeader from '../DevicesHeader';
import LicenseGroups from '../LicenseGroups';

function MainTable(props) {
  const { activeRow, activeGroup, activeSGroup } = useContext(DevicesContext);
  const [width,setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
    };

    window.addEventListener('resize', updateWindowDimensions);

    return () => window.removeEventListener('resize', updateWindowDimensions) 

  });
  return (
    <Col md={(width>1000?(props.filtersOpen ? ((activeRow.selected || activeGroup || activeSGroup) ? (width>1200? 5:7) : (width>1200?9:11)) : (activeRow.selected || activeGroup || activeSGroup) ? 7 : 11):12)} className='mx-auto'>
      <DevicesHeader handleClick={props.handleClick} />
      <LicenseGroups />
    </Col>
  )
}

export default MainTable
