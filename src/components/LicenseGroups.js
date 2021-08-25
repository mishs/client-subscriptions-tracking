import React, { useContext, useState } from 'react';
import { Table } from 'react-bootstrap';
import SubscriptionGroup from './SubscriptionGroup';
import { DevicesContext } from './../Context/DevicesContext';
import { filterData } from '../utilities/utils';
import Highlight from 'react-highlighter'

function LicenseGroups() {
  const { data, searchResults, searchQuery, filters } =
    useContext(DevicesContext);
  const [activeSubscriptionGrpTag, setActiveSGrp] = useState(null);
  const [activeGrpTag, setActiveGrp] = useState(null);
  const [activeId, setActiveId] = React.useState('');
  const [mArray, setMArray] = React.useState([]);

  return (
    <div>
      <Table size='sm'>
        <thead>
          <tr>
            <th className='tbl-heading tbl-heading1'>Name</th>
            <th className='tbl-heading tbl-heading2'>Model</th>
            <th className='tbl-heading tbl-heading3'>OS version</th>
            <th className='tbl-heading tbl-heading4'>Description</th>
          </tr>
        </thead>
      </Table>
      <Highlight search={searchQuery}>
        {searchQuery === ''
          ? data.map((subscription, i) => {
            let subGroupsFiltered = subscription.groups.filter((val) => {
              let filteredData = filterData(filters, val.licenses)
              if (filteredData.length) {
                return true;
              } else {
                return false;
              }
            });
            return (
              <React.Fragment key={i}>
                {
                  subGroupsFiltered.length ?
                    <SubscriptionGroup
                      key={i}
                      title={subscription.subscription}
                      data={subscription.groups}
                      description={subscription.description}
                      type={subscription.type}
                      creationDate={subscription.creationDate}
                      expirationDate={subscription.expirationDate}
                      noOfDevices={subscription.noOfDevices}
                      grpIndex={i}
                      setActiveGrp={setActiveGrp}
                      setActiveSGrp={setActiveSGrp}
                      activeGrpTag={activeGrpTag}
                      activeSubscriptionGrpTag={activeSubscriptionGrpTag}
                      activeId={activeId}
                      setActiveId={setActiveId}
                      mArray={mArray}
                      setMArray={setMArray}
                    />
                    : null
                }
              </React.Fragment>
            );
          })
          : searchResults.map((subscription, i) => {
            let subGroupsFiltered = subscription.groups.filter((val) => {
              let filteredData = filterData(filters, val.licenses)
              if (filteredData.length) {
                return true;
              } else {
                return false;
              }
            });
            return (
              <React.Fragment key={i}>
                {
                  subGroupsFiltered.length ?
                    <SubscriptionGroup
                      key={i}
                      title={subscription.subscription}
                      data={subscription.groups}
                      description={subscription.description}
                      type={subscription.type}
                      creationDate={subscription.creationDate}
                      expirationDate={subscription.expirationDate}
                      noOfDevices={subscription.noOfDevices}
                      grpIndex={i}
                      setActiveGrp={setActiveGrp}
                      setActiveSGrp={setActiveSGrp}
                      activeGrpTag={activeGrpTag}
                      activeSubscriptionGrpTag={activeSubscriptionGrpTag}
                      activeId={activeId}
                      setActiveId={setActiveId}
                      mArray={mArray}
                      setMArray={setMArray}
                    />
                    : null
                }
              </React.Fragment>
            )
          })}
      </Highlight>
    </div>
  );
}

export default LicenseGroups;
