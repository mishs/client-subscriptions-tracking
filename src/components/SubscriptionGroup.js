import React, { useEffect, useState } from "react";
import { Accordion, Card, Table } from "react-bootstrap";
import { DevicesContext } from "../Context/DevicesContext";
import Licenses from "./Licenses";
import Highlight from "react-highlighter";
import compareVersions from 'compare-versions';
import { filterData } from "../utilities/utils";

function SubscriptionGroup({
  title,
  data,
  description,
  type,
  creationDate,
  expirationDate,
  noOfDevices,
  grpIndex,
  setActiveGrp,
  setActiveSGrp,
  activeGrpTag,
  activeSubscriptionGrpTag,
  activeId,
  setActiveId,
}) {
  const {
    updateActiveGroup,
    updateActiveSubscriptionGroup,
    updateActiveRow,
    searchQuery,
    filters
  } = React.useContext(DevicesContext);
  let splitedGrp = activeSubscriptionGrpTag && parseInt(activeSubscriptionGrpTag.split("-")[1])
  let splitedSGrp = activeSubscriptionGrpTag && parseInt(activeSubscriptionGrpTag.split("-")[0])
  const [licencesCount, setCount] = useState(0);
  let inStringFilters = JSON.stringify(filters);
  useEffect(() => {
    let count = 0
    data.map(item => {
      let filteredData = filterData(filters, item.licenses)
      count += filteredData.length;
      return item
    })
    setCount(count)
  }, [data, inStringFilters, filters])
  return (
    <div className="subs-group_container" key={grpIndex}>
      <h2
        className={`cur-pointer ${activeGrpTag === grpIndex ? "highlight-box" : ""
          }`}
        onClick={(e) => {
          updateActiveGroup({
            name: title,
            noOfGroups: data.length,
            description,
            type,
            creationDate,
            expirationDate,
            noOfDevices,
          });
          updateActiveRow({ selected: false });
          updateActiveSubscriptionGroup(null);
          setActiveGrp(grpIndex);
          setActiveSGrp(null);
          setActiveId('')
        }}
      >
        {title} &nbsp;&nbsp;
        <span><span>{licencesCount}</span>/{licencesCount + 5}</span>
      </h2>

      <Accordion defaultActiveKey="0">
        {data &&
          data.map((item, index) => {
            let sorted = item.licenses.map(v => v.osversion.replace('^', '').replace('~', '')).sort(compareVersions).filter((v, i, a) => a.indexOf(v) === i);

            // Filtering Data
            let filteredData = filterData(filters, item.licenses)

            // Filtering data end

            return (
              <React.Fragment key={index}>
                {
                  filteredData.length ?
                    <Card key={index}>
                      <Accordion.Toggle
                        as={Card.Header}
                        eventKey={index.toString()}
                        className={`cur-pointer ${(splitedSGrp === index) && (splitedGrp === grpIndex) ? "highlight-box" : ""
                          }`}
                        onClick={() => {
                          setActiveSGrp(index + "-" + grpIndex);
                          setActiveGrp(null);
                          setActiveId('')
                        }}
                      >
                        <i className="fas fa-angle-down togg-arrow mr-1"></i>
                        <Table size="sm">
                          <thead className="license_head">
                            <tr
                              onClick={() => {
                                updateActiveSubscriptionGroup({
                                  name: item.group,
                                  description: item.description,
                                  noOfDevices: item.licenses.length,
                                });
                                updateActiveGroup(null);
                                updateActiveRow({ selected: false });
                              }}
                            >
                              <th>
                                <Highlight search={searchQuery}>{item.group} <span>{filteredData.length}</span></Highlight>
                              </th>
                              <th><Highlight search={searchQuery}>{item.model}</Highlight></th>
                              <th><Highlight search={searchQuery}>{sorted.length > 1 ? (sorted[0] + "-" + sorted[sorted.length - 1]) : sorted[0]}</Highlight></th>
                              <th><Highlight search={searchQuery}>{item.description}</Highlight></th>
                            </tr>
                          </thead>
                        </Table>
                      </Accordion.Toggle>

                      <Accordion.Collapse eventKey={index.toString()}>
                        <Card.Body>
                          <Licenses
                            keyToFind={index}
                            item={item}
                            data={data}
                            filteredData={filteredData}
                            grpIndex={grpIndex}
                            subGIndex={index}
                            activeId={activeId}
                            setActiveId={setActiveId}
                            setActiveGrp={setActiveGrp}
                            setActiveSGrp={setActiveSGrp}
                          />
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    : null
                }
              </React.Fragment>
            )
          })}
      </Accordion>
    </div>
  );
}

export default SubscriptionGroup;
