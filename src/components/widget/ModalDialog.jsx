import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import { useEffect } from 'react'

function ModalDialog({ children, show = false, onClose, className }) {
    const [showDialog, setShowDialog] = useState(false)
    const closeDialog = () => {
        setShowDialog(false)
        onClose(true)
    }

    useEffect(() => {
        setShowDialog(show)
    }, [show])
    return (
        <Transition appear show={showDialog} as={Fragment} >
            <Dialog as='div' className="relative z-30" onClose={closeDialog}>
                <Transition.Child as={Fragment} enter='ease-in-out duration-200' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in-out duration-200' leaveFrom='opacity-100' leaveTo='opacity-0' >
                    <div className='fixed inset-0 bg-black/20 ' />
                </Transition.Child>
                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <Transition.Child as={Fragment} enter='ease-in-out duration-200' enterFrom='opacity-0 scale-90' enterTo='opacity-100 scale-100' leave='ease-in-out duration-200' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-90' >
                            <Dialog.Panel className={`w-full max-w-md transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-2xl transition-all ${className}`}>
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default ModalDialog
