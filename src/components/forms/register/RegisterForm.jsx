import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { classNames } from "../../../shared/utils";
import Button from "../../buttons/Button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import YupPassword from "yup-password";

YupPassword(Yup);

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string()
    // .matches(
    //   /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
    //   "Phone number is not valid"
    // )
    .required("Phone number is required"),
  password: Yup.string()
    .minUppercase(1, "Password must have at least 1 uppercase")
    .minLowercase(1, "Password must have at least 1 lowercase")
    .minNumbers(1, "Password must have at least 1 number")
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

function RegisterForm({ status, isUser, steps, handleRegister, setFormData }) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setFormData(values);
      handleRegister(values);
    },
  });

  const buttonText = isUser
    ? "Sign Up"
    : steps[0].status === "current"
    ? "Next"
    : "Sign Up";

  return (
    <div
      className={classNames(
        "space-y-4",
        status === "current" ? "block" : "hidden"
      )}
    >
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Name"
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
          />
          {formik.touched.name && formik.errors.name ? (
            <span className="text-red-500 text-sm">{formik.errors.name}</span>
          ) : null}
        </div>

        <div className="space-y-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="address@email.com"
            required
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
          />
          {formik.touched.email && formik.errors.email ? (
            <span className="text-red-500 text-sm">{formik.errors.email}</span>
          ) : null}
        </div>

        <div className="space-y-2">
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            autoComplete="phoneNumber"
            placeholder="0812345678"
            required
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <span className="text-red-500 text-sm">
              {formik.errors.phoneNumber}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex flex-row rounded-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black shadow-sm">
            <input
              id="password"
              name="password"
              type={isShowPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="current-password"
              required
              className="block w-full text-gray-900 sm:text-sm sm:leading-6 px-3 py-1.5 border-y border-l border-gray-300 rounded-l-md"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="w-6 flex items-center justify-center hover:opacity-50 hover:cursor-pointer mx-2"
            >
              {isShowPassword ? (
                <EyeSlashIcon color="#6b7280" />
              ) : (
                <EyeIcon color="#6b7280" />
              )}
            </div>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </div>
          ) : null}
        </div>

        <div className="space-y-2">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            autoComplete="current-password"
            required
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <span className="text-red-500 text-sm">
              {formik.errors.confirmPassword}
            </span>
          ) : null}
        </div>
        <Button
          type="submit"
          label={buttonText}
          className={classNames("mt-5")}
        />
      </form>
    </div>
  );
}

export default RegisterForm;
