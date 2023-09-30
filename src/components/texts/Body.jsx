import React from 'react'

function Body({ label, className }) {
    return (
        <h1 className={`text-sm font-normal  ${className}`}>
            {label}
        </h1>
    )
}

export default Body