import React from 'react'

function HeadLine({ label, className }) {
    return (
        <h1 className={`text-2xl md:text-4xl font-bold capitalize ${className}`}>
            {label}
        </h1>
    )
}

export default HeadLine