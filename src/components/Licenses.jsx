import React from 'react'
import { Table } from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'
import Highlight from 'react-highlighter'
import { DevicesContext } from '../Context/DevicesContext'

function Licenses(props) {
    const [offset, setOffset] = React.useState(0)
    const [activePage, setActivePage] = React.useState(1)
    let selectedRow
    let licenses = []
    const { updateActiveRow, updateActiveGroup, updateActiveSubscriptionGroup, searchQuery } = React.useContext(DevicesContext)

    function toggleClass(id) {
        props.setActiveId(id);
    }

    function getRow(id) {
        const groups = props.data.map((group) => group.licenses);
        const devices = groups.map((groupLicense) => groupLicense);
        devices.map((device) => device.map((item) => licenses.push(item)));
        selectedRow = licenses.filter((license) => license.id === id);
        selectedRow = Object.assign({ selected: true }, ...selectedRow);
        props.setActiveId(id)
        props.setActiveGrp(null)
        props.setActiveSGrp(null)
        updateActiveRow(selectedRow)
        updateActiveGroup(null)
        updateActiveSubscriptionGroup(null)
    }

    const handleClick = (id) => {
        getRow(id)
        toggleClass(id)
    }
    let pages = []
    for (let i = 1; i <= Math.ceil(props.filteredData.length / 5); i++) {
        pages.push(
            <Pagination.Item key={i} active={activePage === i}
                onClick={
                    () => {
                        setOffset((i - 1) * 5)
                        setActivePage(i)
                    }
                }
            >
                {i}
            </Pagination.Item>
        )
    }
    return (
        <Table key={props.keyToFind}>
            <tbody className='licenses_body'>
                {
                    props.filteredData.filter((paginate, index) => index >= offset && index < (offset + 5)).map((licence, index1) =>
                        <tr onClick={() => handleClick(licence.id)} key={index1} className={`license_row cur-pointer ${licence.id === props.activeId ? 'active' : ''}`} data-selector={licence.id} >
                            <td>
                                {
                                    index1 % 2 === 0 ?
                                        <i className='fas fa-wifi text-white py-2 px-1'></i>
                                        :
                                        <i className='fas fa-calendar-times text-white py-2 px-1'></i>
                                }
                                &nbsp;&nbsp;
                                <Highlight search={searchQuery}>{licence.name}</Highlight></td>
                            <td><Highlight search={searchQuery}>{licence.model}</Highlight></td>
                            <td><Highlight search={searchQuery}>{licence.osversion}</Highlight></td>
                            <td><Highlight search={searchQuery}>{licence.description}</Highlight></td>
                        </tr>
                    )
                }
                <tr>
                    <td>
                        <Pagination className='license_pagination'>
                            <Pagination.Prev
                                disabled={offset < 5}
                                onClick={() => {
                                    setOffset(offset - 5)
                                    setActivePage(activePage - 1)
                                }}
                            />
                            {pages}
                            <Pagination.Next
                                disabled={props.filteredData.length <= (offset + 5)}
                                onClick={() => {
                                    setOffset(offset + 5)
                                    setActivePage(activePage + 1)
                                }}
                            />
                        </Pagination>
                    </td>
                </tr>
            </tbody>
        </Table>
    )
}

export default Licenses
