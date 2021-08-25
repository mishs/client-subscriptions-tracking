import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Col } from 'react-bootstrap';
import { DevicesContext} from '../../Context/DevicesContext';
import AsideTab from '../AsideTab';

function ColComposition() {
  const { activeRow, activeGroup, activeSGroup, updateActiveGroup, updateActiveRow, updateActiveSubscriptionGroup } = useContext(DevicesContext);
  const [width,setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
    };

    window.addEventListener('resize', updateWindowDimensions);
    if((activeRow.selected || activeGroup || activeSGroup) && width<=1000){
      document.querySelector('body').style.overflow = 'hidden'
    }else{
      document.querySelector('body').style.overflow = 'visible'
    }

    return () => window.removeEventListener('resize', updateWindowDimensions) 

  });

  useEffect(() => {
    if(width<=1000){
      updateActiveGroup(null);
      updateActiveRow({ selected: false });
      updateActiveSubscriptionGroup(null);
    }
  }, [width])

  return (
    <Col md={width>1000?5:null} className={`details_block ${(activeRow.selected || activeGroup || activeSGroup)? '':'d-none'} ${width<=1000?'create-popup':''}`}>
      {<AsideTab />}
    </Col>
  );
}

export default ColComposition;
