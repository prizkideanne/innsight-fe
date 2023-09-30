import React, { useState } from "react";
import AuthLayout from "../components/layouts/AuthLayout";
import api from "../shared/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../components/buttons/Button";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

function ForgotPassword() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await api.post("/auth/forgot-password", values);
        formik.resetForm();
        setErrorMessage("");
        toast.success("Email sent, please check your email");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        toast.error(`Error: ${error.response.data.message}`, {
          duration: 5000,
        });
      }
    },
  });

  return (
    <AuthLayout page="Forgot Password" title={"Forgot Password"}>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
      <form className="space-y-3" onSubmit={formik.handleSubmit}>
        <div>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="address@email.com"
              required
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
        </div>

        <div>
          <Button label={"Submit"} type="submit" />
        </div>
      </form>
    </AuthLayout>
  );
}

export default ForgotPassword;
