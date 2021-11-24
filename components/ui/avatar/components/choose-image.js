import React, { useState } from "react";
import { compressFile } from "../../../Utility/fileUtils";
import { useDropzone } from "react-dropzone";
import AsyncButton from "../../AsyncButton";

const supportedFormats = ["jpg", "png", "jfif", "jpeg"];
const checkValidity = (name) =>
  supportedFormats.some((el) => name.toLowerCase().endsWith(el));

const ChooseImage = ({ image = null, setImage, nextStep, close }) => {
  const [processing, setProcessing] = useState(false);

  const onDrop = async ([imageFile]) => {
    if (imageFile) {
      if (checkValidity(imageFile.name)) {
        setProcessing(true);
        let data = await compressFile([imageFile], { size: 0.3 });
        setImage(data[0].dataWithPrefix);
        setProcessing(false);
        nextStep();
      } else {
        window.flash("Invalid format", "error");
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: processing,
  });

  return (
    <>
      <div
        className="d-flex justify-content-between"
        style={{ width: "100%", maxWidth: 500, margin: "auto" }}
      >
        <div />
        <div className="d-flex" style={{ gap: 10 }}>
          {image && (
            <AsyncButton onClick={() => nextStep()} className="my-bg-green">
              Continue Editing
            </AsyncButton>
          )}
          <AsyncButton onClick={close} color="danger">
            <i className="nc-icon nc-simple-remove" />
          </AsyncButton>
        </div>
      </div>
      <div
        className={`choose-image-container ${processing ? "skeleton-box" : ""}`}
        {...getRootProps()}
        multiple={false}
        style={{
          outline: "none",
          cursor: processing ? "default" : "pointer",
        }}
      >
        <input {...getInputProps()} />
        {processing ? (
          "Processing..."
        ) : isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Click to select image. Or drag and drop image here</p>
        )}
      </div>
    </>
  );
};

export default ChooseImage;
