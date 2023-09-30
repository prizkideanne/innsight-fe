import React from 'react'

function Title({ label, className }) {
    return (
        <h1 className={`text-xl md:text-2xl font-semibold  ${className}`}>
            {label}
        </h1>
    )
}

export default Title