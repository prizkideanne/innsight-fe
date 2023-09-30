import React, { useState } from "react";
import Button from "../../buttons/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

function LoginForm({ handleLogin }) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });
  return (
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

      <div className="flex flex-col">
        <div className="mt-2 flex flex-row rounded-md  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black shadow-sm">
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

      <div className="flex items-center justify-end">
        <div className="text-sm leading-6">
          <Link
            to="/forgot-password"
            type="button"
            className="font-semibold text-black hover:text-black/80"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <div>
        <Button label={"Sign In"} type="submit" />
      </div>
    </form>
  );
}

export default LoginForm;
