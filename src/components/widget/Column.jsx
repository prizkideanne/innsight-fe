import React from 'react'

function Column({ className, children }) {
    return (
        <div className={`flex flex-col ${className}`}>
            {children}
        </div>
    )
}

export default Column