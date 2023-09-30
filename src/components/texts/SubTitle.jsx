import React from 'react'

function SubTitle({ label, className }) {
    return (
        <h1 className={`text-base font-medium  ${className}`}>
            {label}
        </h1>
    )
}

export default SubTitle