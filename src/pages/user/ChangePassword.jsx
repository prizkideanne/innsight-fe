import React, { useState } from "react";
import MainContainer from "../../components/layouts/MainContainer";
import * as Yup from "yup";
import { useFormik } from "formik";
import api from "../../shared/api";
import { toast } from "react-hot-toast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import YupPassword from "yup-password";

YupPassword(Yup);

const validationSchema = Yup.object({
  oldPass: Yup.string()
    .minUppercase(1, "Password must have at least 1 uppercase")
    .minLowercase(1, "Password must have at least 1 lowercase")
    .minNumbers(1, "Password must have at least 1 number")
    .min(8, "Password must be at least 8 characters long.")
    .required("Old password is required."),
  newPass: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .minUppercase(1, "Password must have at least 1 uppercase")
    .minLowercase(1, "Password must have at least 1 lowercase")
    .minNumbers(1, "Password must have at least 1 number")
    .required("New password is required."),
  confirmPass: Yup.string()
    .oneOf([Yup.ref("newPass"), null], "Password must match new password.")
    .minUppercase(1, "Password must have at least 1 uppercase")
    .minLowercase(1, "Password must have at least 1 lowercase")
    .minNumbers(1, "Password must have at least 1 number")
    .min(8, "Password must be at least 8 characters long.")
    .required("Confirm password is required."),
});

function ChangePass() {
  const [isShowOldPassword, setIsShowOldPassword] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      oldPass: "",
      newPass: "",
      confirmPass: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await api.patch("/profile/change-password", values);
        formik.resetForm();
        toast.success("Change password success", {
          duration: 5000,
        });
      } catch (error) {
        toast.error(`Error: ${error.response.data.message}`, {
          duration: 5000,
        });
      }
    },
  });

  return (
    <MainContainer>
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center justify-center w-full p-5 max-w-md">
          <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-3xl font-bold text-center">Change Password</h1>
            <p className="text-center text-gray-500">
              Please enter your new password
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-full mt-10">
            <form
              className="flex flex-col items-center justify-center w-full space-y-4"
              onSubmit={formik.handleSubmit}
            >
              {/* Old Pass */}
              <div className="flex flex-col items-start justify-center w-full">
                <label className="text-sm font-bold text-gray-500">
                  Old Password
                </label>
                <div className="flex w-full flex-col space-y-2">
                  <div className="flex flex-row rounded-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black shadow-sm">
                    <input
                      id="password"
                      name="Old Password"
                      type={isShowOldPassword ? "text" : "password"}
                      placeholder="Old Password"
                      autoComplete="current-password"
                      required
                      className="block w-full text-gray-900 sm:text-sm sm:leading-6 px-3 py-1.5 border-y border-l border-gray-300 rounded-l-md"
                      value={formik.values.oldPass}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      {...formik.getFieldProps("oldPass")}
                    />
                    <div
                      onClick={() => setIsShowOldPassword(!isShowOldPassword)}
                      className="w-6 flex items-center justify-center hover:opacity-50 hover:cursor-pointer mx-2"
                    >
                      {isShowOldPassword ? (
                        <EyeSlashIcon color="#6b7280" />
                      ) : (
                        <EyeIcon color="#6b7280" />
                      )}
                    </div>
                  </div>
                  {formik.touched.oldPass && formik.errors.oldPass ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.oldPass}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col items-start justify-center w-full">
                <label className="text-sm font-bold text-gray-500">
                  New Password
                </label>
                <div className="flex w-full flex-col space-y-2">
                  <div className="flex flex-row rounded-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black shadow-sm">
                    <input
                      id="password"
                      name="New Password"
                      type={isShowNewPassword ? "text" : "password"}
                      placeholder="New Password"
                      autoComplete="current-password"
                      required
                      className="block w-full text-gray-900 sm:text-sm sm:leading-6 px-3 py-1.5 border-y border-l border-gray-300 rounded-l-md"
                      value={formik.values.newPass}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      {...formik.getFieldProps("newPass")}
                    />
                    <div
                      onClick={() => setIsShowNewPassword(!isShowNewPassword)}
                      className="w-6 flex items-center justify-center hover:opacity-50 hover:cursor-pointer mx-2"
                    >
                      {isShowNewPassword ? (
                        <EyeSlashIcon color="#6b7280" />
                      ) : (
                        <EyeIcon color="#6b7280" />
                      )}
                    </div>
                  </div>
                  {formik.touched.newPass && formik.errors.newPass ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.newPass}
                    </div>
                  ) : null}
                </div>
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
                  <div className="text-red-500">
                    {formik.errors.confirmPass}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col items-center justify-center w-full pt-5">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-sm font-bold text-white bg-primary rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  Change Pass
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}

export default ChangePass;
