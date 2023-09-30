import React from 'react'

function Caption
    ({ label, className }) {
    return (
        <h1 className={`text-xs font-normal text-gray-500 ${className}`}>
            {label}
        </h1>
    )
}

export default Caption
