import React, { useContext } from 'react';
import { Tabs, Tab, Table } from 'react-bootstrap';
import { faEllipsisV, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DevicesContext } from '../Context/DevicesContext';

function AsideTab() {
  const { activeRow, activeGroup, activeSGroup, updateActiveRow, updateActiveGroup, updateActiveSubscriptionGroup } = useContext(DevicesContext);
  const {
    id,
    name,
    model,
    osversion,
    description,
    androidVersion,
    lastOnlineAction,
    lastStateUpdate,
    online,
  } = activeRow;
  const tabs = [
    {
      eventKey: 'system',
      title: 'System'
    },
    {
      eventKey: 'hardware',
      title: 'Hardware'
    },
    {
      eventKey: 'Networks',
      title: 'Networks'
    },
    {
      eventKey: 'USB',
      title: 'USB'
    },
    {
      eventKey: 'Apps',
      title: 'Apps'
    },
    {
      eventKey: 'Commands',
      title: 'Commands'
    },
  ]

  return (
    <div>
      {(activeRow.selected || activeGroup || activeSGroup) && (
        <div className='d-flex flex-column'>
          <i className='fas fa-times text-danger ml-auto mb-3 mr-2 cur-pointer'
            onClick={
              () => {
                updateActiveGroup(null)
                updateActiveSubscriptionGroup(null)
                updateActiveRow({ selected: false })
              }
            }
          ></i>
          <header className='right-header'>
            <ul>
              <li className={!online ? 'warn' : null}>
                <FontAwesomeIcon icon={faCircle} />
                {online ? `online` : `offline`}
              </li>
              <li>
                <FontAwesomeIcon icon={faCircle} />
                policy
              </li>
              <li>
                <FontAwesomeIcon icon={faCircle} />
                license
              </li>
            </ul>

            <div>
              <p>{activeRow.selected ? name : (activeGroup ? activeGroup.name : activeSGroup.name)}</p>
              <span>{lastOnlineAction}</span>
            </div>

            <div>
              <FontAwesomeIcon icon={faEllipsisV} />
            </div>
          </header>

          <Tabs defaultActiveKey='summary'>
            <Tab eventKey='summary' title='Summary'>
              <p>summary</p>
              <Table size='sm'>
                <tbody>
                  {activeRow.selected && (
                    <>
                      <tr>
                        <td>ID</td>
                        <td>{id}</td>
                      </tr>
                      <tr>
                        <td>model name</td>
                        <td>{model}</td>
                      </tr>
                      <tr>
                        <td>Serial number</td>
                        <td>000000</td>
                      </tr>
                      <tr>
                        <td>Name</td>
                        <td>{name}</td>
                      </tr>
                      <tr>
                        <td>Description</td>
                        <td>{description}</td>
                      </tr>
                      <tr>
                        <td>Android Version</td>
                        <td>{androidVersion}</td>
                      </tr>
                      <tr>
                        <td>Sample Version</td>
                        <td>{osversion}</td>
                      </tr>
                      <tr>
                        <td>last online action</td>
                        <td>{lastOnlineAction}</td>
                      </tr>
                      <tr>
                        <td>last state update</td>
                        <td>{lastStateUpdate}</td>
                      </tr>
                    </>
                  )}
                  {activeGroup && (
                    <>
                      <tr>
                        <td>Name</td>
                        <td>{activeGroup.name}</td>
                      </tr>
                      <tr>
                        <td>Description</td>
                        <td>{activeGroup.description}</td>
                      </tr>
                      <tr>
                        <td>Type</td>
                        <td>{activeGroup.type}</td>
                      </tr>
                      <tr>
                        <td>Creation Date</td>
                        <td>{activeGroup.creationDate}</td>
                      </tr>
                      <tr>
                        <td>Expiration Date</td>
                        <td>{activeGroup.expirationDate}</td>
                      </tr>
                      <tr>
                        <td>No. of Groups</td>
                        <td>{activeGroup.noOfGroups}</td>
                      </tr>
                      <tr>
                        <td>No. of Devices</td>
                        <td>{activeGroup.noOfDevices}</td>
                      </tr>
                    </>
                  )}
                  {activeSGroup && (
                    <>
                      <tr>
                        <td>Name</td>
                        <td>{activeSGroup.name}</td>
                      </tr>
                      <tr>
                        <td>Description</td>
                        <td>{activeSGroup.description}</td>
                      </tr>
                      <tr>
                        <td>No. of Devices</td>
                        <td>{activeSGroup.noOfDevices}</td>
                      </tr>
                      <tr>
                        <td>Policy State</td>
                        <td>{'Policy State'}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </Table>
            </Tab>
            {
              activeRow.selected ?
                tabs.map((tab, index) => {
                  return (
                    <Tab key={index} eventKey={tab.eventKey} title={tab.title}>
                      {tab.eventKey}
                    </Tab>
                  )
                })
                : null
            }
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default AsideTab;
