import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import MainContainer from '../../../components/layouts/MainContainer';
import { selectCurrentUser } from '../../../store/auth/authSlice';
import axios from 'axios';
import toast from 'react-hot-toast';


const VerifyPayment = () => {
    const navigate = useNavigate();
    let { verify_code } = useParams()
    const user_id = verify_code.split("-")[1]
    const booking_code = verify_code.split("-")[0]
    const toBeDone = async () => {
        await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/transaction/verify/${booking_code}`, {
            user_id: user_id
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response => {
            if (response.data.status) {
                toast.success(response.data.message)
                navigate("/orderlist")
            } else {
                toast.error(response.data.message)
                navigate("/")
            }
        })
    }
    useEffect(() => {
        toBeDone()
    }, [])
    return (
        <>
            <MainContainer>

            </MainContainer>

        </>
    )
}

export default VerifyPayment
