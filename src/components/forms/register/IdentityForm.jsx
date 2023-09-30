import { PhotoIcon } from "@heroicons/react/24/solid";
import React from "react";

function IdentityForm({ isHidden, file, setFile }) {
  const [preview, setPreview] = React.useState(null);

  // create a preview as a side effect, whenever selected file is changed
  React.useEffect(() => {
    if (!file) {
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl); // free memory when ever this component is unmounted
  }, [file]);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  return (
    <div
      className={
        isHidden
          ? "hidden"
          : "flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 h-[144px]"
      }
    >
      {!preview ? (
        <div className="text-center">
          <PhotoIcon
            className="mx-auto h-10 w-10 text-gray-300"
            aria-hidden="true"
          />
          <div className="flex justify-center text-sm leading-6 text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={onSelectFile}
              />
            </label>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PNG, JPG, GIF up to 1MB
          </p>
        </div>
      ) : (
        <label
          htmlFor="file-reupload"
          className="relative w-full h-full cursor-pointer"
        >
          <img
            src={preview}
            alt="identity"
            className="h-full w-full object-contain rounded-lg"
          />
          <input
            id="file-reupload"
            name="file-reupload"
            type="file"
            className="sr-only"
            onChange={onSelectFile}
          />
        </label>
      )}
    </div>
  );
}

export default IdentityForm;
