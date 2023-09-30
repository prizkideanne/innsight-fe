import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";

function BuildingImageUpload({ images, onImagesChange, setDeletedImages }) {
  const handleImagesChange = (e) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => resolve(event.target?.result);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });
      })
    ).then((newImages) => {
      onImagesChange([...images, ...newImages]);
    });
  };

  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onImagesChange(newImages);
    setDeletedImages(images[index]);
  };

  return (
    <div className="p-5 rounded-lg border border-gray-300 mt-2 md:mt-5 min-h-[250px]">
      <div
        className={`flex ${
          images.length > 0
            ? "justify-end items-start"
            : "items-center justify-center h-[250px]"
        }`}
      >
        <input
          id="images"
          name="images"
          type="file"
          multiple
          accept=".png, .jpg, .jpeg"
          onChange={handleImagesChange}
          className="hidden"
        />
        <div className="flex flex-col items-center space-y-3">
          {images.length > 0 ? null : (
            <label className="text-center font-medium">
              You can select multiple images <br />
              for your property
            </label>
          )}
          <label
            htmlFor="images"
            className="px-2 py-1.5 text-sm rounded-md text-primary bg-white border-primary border cursor-pointer shadow hover:opacity-90 "
          >
            Select file
          </label>
        </div>
      </div>

      {/* Preview images */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-10">
        {images.map((image, index) => {
          const url = image.img
            ? process.env.REACT_APP_API_BASE_URL + image.img
            : image;
          return (
            <div
              key={index}
              className="bg-gray-50 border flex items-center justify-center rounded-md relative"
            >
              <div
                onClick={() => handleDeleteImage(index)}
                className="absolute -top-2.5 -right-2.5 z-10 md:w-7 md:h-7 h-5 w-5 rounded-full border bg-white hover:cursor-pointer"
              >
                <XMarkIcon className="text-red-400" />
              </div>
              <img
                src={url}
                alt={`Preview ${index}`}
                className="rounded-md w-auto h-[200px] object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BuildingImageUpload;
