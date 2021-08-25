import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { Form } from 'react-bootstrap'
import { DevicesContext } from '../../Context/DevicesContext'
import FilterCheck from './FilterCheck'

function Filters(props) {
    const { filters, updateFilters } = useContext(DevicesContext);

    function toggleFilter(checked, category, value) {
        let newFilter = filters
        let newCategoryArray = newFilter[category]
        if (checked) {
            newCategoryArray.push(value)
        } else {
            newCategoryArray = newCategoryArray.filter(v => (v !== value))
        }
        newFilter[category] = newCategoryArray
        updateFilters(newFilter)
    }

    return (
        <Form className='filters-box pl-3'>
            <div className='d-flex align-items-center justify-content-between'>
                <h3>Filter</h3>
                <div className='mr-3'>
                    <FontAwesomeIcon icon={faAngleLeft}
                        onClick={
                            () => {
                                props.setFiltersOpen(false)
                            }
                        }
                    />
                    <FontAwesomeIcon icon={faFilter} />
                </div>
            </div>

            <div className='filters-section'>
                <div>
                    <p>online state</p>
                    <ul>
                        <FilterCheck type='checkbox'
                            name='onlineState'
                            onChange={(e) => toggleFilter(e.target.checked, 'onlineState', 'online')}
                            label='online'
                        />

                        <FilterCheck type='checkbox'
                            name='offlineState'
                            onChange={(e) => toggleFilter(e.target.checked, 'onlineState', 'offline')}
                            label='offline'
                        />

                    </ul>
                </div>

                <div>
                    <p>policy state</p>
                    <ul>
                        <FilterCheck type='checkbox'
                            name='notApplied'
                            onChange={(e) => toggleFilter(e.target.checked, 'policyState', 'applied')}
                            label='applied'
                        />
                        <FilterCheck type='checkbox'
                            name='applied'
                            onChange={(e) => toggleFilter(e.target.checked, 'policyState', 'notApplied')}
                            label='not applied'
                        />

                    </ul>
                </div>

                <div>
                    <p>license</p>
                    <ul>
                        <FilterCheck type='checkbox'
                            name='allOk'
                            onChange={(e) => toggleFilter(e.target.checked, 'licenseState', 'allOk')}
                            label='all ok'
                        />

                        <FilterCheck type='checkbox'
                            name='aboutToExpire'
                            onChange={(e) => toggleFilter(e.target.checked, 'licenseState', 'aboutToExpire')}
                            label='about to expire'
                        />

                        <FilterCheck type='checkbox'
                            name='runOut'
                            onChange={(e) => toggleFilter(e.target.checked, 'licenseState', 'expired')}
                            label='run out'
                        />

                    </ul>
                </div>

                <div>
                    <p>device type</p>
                    <ul>
                        <FilterCheck type='checkbox'
                            name='raspberryPi'
                            onChange={(e) => toggleFilter(e.target.checked, 'deviceState', 'Raspberry Pi 3')}
                            label='Rasberry Pi'
                        />

                        <FilterCheck type='checkbox'
                            name='other'
                            onChange={(e) => toggleFilter(e.target.checked, 'deviceState', 'others')}
                            label='other'
                        />

                    </ul>
                </div>

                <div>
                    <p>OS version</p>
                    <ul>
                        <li>
                            <Form.Group controlId='1.0.0'>
                                <Form.Check type='checkbox' label='1.0.0'
                                    onChange={(e) => toggleFilter(e.target.checked, 'OSVersion', '1.0.0')}
                                />
                            </Form.Group>
                        </li>
                        <li>
                            <Form.Group controlId='1.1.0'>
                                <Form.Check type='checkbox' label='1.1.0'
                                    onChange={(e) => toggleFilter(e.target.checked, 'OSVersion', '1.1.0')}
                                />
                            </Form.Group>
                        </li>
                    </ul>
                </div>
            </div>
        </Form>
    )
}

export default Filters
