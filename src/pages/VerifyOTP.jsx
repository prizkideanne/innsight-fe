import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthLayout from "../components/layouts/AuthLayout";
import Button from "../components/buttons/Button";
import api from "../shared/api";
import { useNavigate, useParams } from "react-router-dom";
import jwt from "jwt-decode";
import AuthModal from "../components/modals/AuthModal";
import { useModal } from "../shared/context/ModalContext";
import GeneralModal from "../components/modals/GeneralModal";
import LoadingCard from "../components/cards/LoadingCard";
import { set } from "date-fns";

const otpValidationSchema = Yup.object().shape({
  otp: Yup.array()
    .required("All OTP fields are required")
    .test("length", "Must provide 4 digits", (val) => val && val.length === 4)
    .test("filled", "All OTP fields must be filled", (val) => {
      if (val) {
        return val.every((v) => v !== "");
      }
      return false;
    }),
});

function VerifyOTP() {
  const { openModal } = useModal();
  const [errorMessage, setErrorMessage] = useState("");
  const [otpCounter, setOtpCounter] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate("/");
  const { token } = useParams();
  const formik = useFormik({
    initialValues: {
      otp: Array(4).fill(""),
    },
    validationSchema: otpValidationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setErrorMessage("");
      const otpValue = values.otp.join("");
      await api
        .patch("/auth/verification/" + token, {
          otp: otpValue,
        })
        .then(() => {
          openModal({
            title: "Email Verification",
            buttonText: "Ok",
            content: "Your email has been verified successfully!",
          });
          navigate("/");
        })
        .catch((err) => {
          if (err.response) {
            const { message } = err.response.data;
            setErrorMessage(message);
          }
        });
      setIsLoading(false);
    },
  });
  const inputRefs = useRef([]);

  const resendOTP = async () => {
    setIsLoading(true);
    const { email } = jwt(token);
    await api
      .post("/auth/resend-otp", {
        email,
      })
      .then(({ data }) => {
        setOtpCounter(data.otp_counter);
        setIsOpenModal(true);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
    setIsLoading(false);
  };

  return (
    <AuthLayout page="otp" title={"OTP Verification"}>
      <GeneralModal isOpen={isLoading} closeModal={setIsLoading}>
        <LoadingCard />
      </GeneralModal>
      <AuthModal
        closeModal={() => setIsOpenModal(false)}
        isOpen={isOpenModal}
        buttonLabel="Ok"
        title="Resent Successful!"
        message="We've sent you another OTP. Kindly check your messages."
      />
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs mt-5">
          {formik.values.otp.map((_, index) => (
            <div className="w-14 h-14" key={index}>
              <input
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-full shadow h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                type="tel"
                maxLength={1}
                value={formik.values.otp[index]}
                onChange={(event) => {
                  const updatedOtp = [...formik.values.otp];
                  updatedOtp[index] = event.target.value;
                  formik.setFieldValue("otp", updatedOtp);

                  if (event.target.value && index < 3) {
                    inputRefs.current[index + 1].focus();
                  } else if (!event.target.value && index > 0) {
                    inputRefs.current[index - 1].focus();
                  }
                }}
                onBlur={formik.handleBlur}
                onFocus={(e) => e.target.select()}
              />
            </div>
          ))}
        </div>
        {formik.errors.otp && formik.touched.otp ? (
          <div className="mt-2 text-red-500">{formik.errors.otp}</div>
        ) : null}
        <div className="mt-5 md:mt-10">
          {otpCounter > 0 && (
            <p className="text-xs text-primary">{`Resent attemp: ${otpCounter}`}</p>
          )}
          <p className="mb-3 text-sm">
            If you do not receive OTP code, please click{" "}
            <button
              onClick={(e) => {
                e.preventDefault();
                resendOTP();
              }}
              className="text-primary font-bold cursor-pointer hover:text-primary/80"
            >
              here
            </button>{" "}
            to resend OTP again.{" "}
          </p>
          <Button label={"Verify"} type="submit" />
        </div>
      </form>
    </AuthLayout>
  );
}

export default VerifyOTP;
