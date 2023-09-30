import React from 'react'

function CardView({ children, className }) {
    return (
        <div className={` flex flex-col bg-white w-fit px-4 py-4 rounded-md border ${className}`}>
            {children}
        </div>
    )
}

export default CardView
