import React, { useState } from "react";
import AuthLayout from "../components/layouts/AuthLayout";
import api from "../shared/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const validationSchema = Yup.object({
  newPass: Yup.string()
    .minUppercase(1, "Password must have at least 1 uppercase")
    .minLowercase(1, "Password must have at least 1 lowercase")
    .minNumbers(1, "Password must have at least 1 number")
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirmPass: Yup.string()
    .oneOf([Yup.ref("newPass"), null], "Passs must match")
    .min(8, "Password must be at least 8 characters long")
    .required("Confirm Pass is required"),
});

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      newPass: "",
      confirmPass: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await api.patch("/auth/reset-password", {
          token,
          password: values.newPass,
        });
        formik.resetForm();
        setErrorMessage("");
        toast.success("Reset password success", {
          duration: 3000,
        });
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        setErrorMessage(error.response.data.message);
        toast.error(`Error: ${error.response.data.message}`, {
          duration: 3000,
        });
      }
    },
  });

  return (
    <AuthLayout page="Reset Password" title={"Reset Password"}>
      <form
        className="flex flex-col items-center justify-center w-full space-y-4"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col items-start justify-center w-full">
          <label className="text-sm font-bold text-gray-500">
            New Password
          </label>
          <input
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            {...formik.getFieldProps("newPass")}
          />
          {formik.touched.newPass && formik.errors.newPass ? (
            <div className="text-red-500">{formik.errors.newPass}</div>
          ) : null}
        </div>
        <div className="flex flex-col items-start justify-center w-full">
          <label className="text-sm font-bold text-gray-500">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            {...formik.getFieldProps("confirmPass")}
          />
          {formik.touched.confirmPass && formik.errors.confirmPass ? (
            <div className="text-red-500">{formik.errors.confirmPass}</div>
          ) : null}
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm text-left w-full">
            {errorMessage}
          </p>
        )}
        <div className="flex flex-col items-center justify-center w-full pt-5">
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-bold text-white bg-primary rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}

export default ResetPassword;
