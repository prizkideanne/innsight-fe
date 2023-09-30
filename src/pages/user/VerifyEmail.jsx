import { useEffect, useState } from 'react'
import axios from "axios";
import { toast } from "react-hot-toast"
import MainContainer from "../../components/layouts/MainContainer";
import { useNavigate, useParams } from "react-router-dom";


const VerifyEmail = () => {
    const navigate = useNavigate("/");
    const { otp, email } = useParams();
    const verifyingEmail = async (e) => {
        await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/auth/verify-email/${otp}/${email}`, {}, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            const data = res.data
            if (data.status) {
                setTimeout(() => {
                    navigate("/")
                }, 3000)
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        })
    }
    useEffect(() => {
        verifyingEmail()
    }, [])
    return (
        <>
            <MainContainer>
                <p>verifying Email</p>
            </MainContainer>
        </>
    )
}

export default VerifyEmail
