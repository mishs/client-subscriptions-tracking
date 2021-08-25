import React from 'react'

function FilterCheck(props) {
    return (
        <li>
            <label>
                <input type='checkbox'
                className='mr-2'
                    defaultChecked={false}
                    {...props}
                />
                {props.label}
            </label>
        </li>
    )
}

export default FilterCheck
