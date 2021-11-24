import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { compressFile, downloadLink, getBase64 } from "../../../../lib";
import { FILE_INPUT_PROPS } from "../../../../data";
import { CustomButton } from "../../../../components";

const checkValidity = (name: string, supportedFormats: string[] | null = []) =>
  supportedFormats?.some((el) => name.toLowerCase().endsWith(el));

const isImageFile = (name: string) =>
  ["png", "jpg", "jpeg", "jfif", "webp"].some((el) =>
    name.toLowerCase().endsWith(el)
  );

export const FileInput = React.forwardRef<HTMLElement, FILE_INPUT_PROPS>(
  function FileInputElement(
    {
      onChange = (e: any) => null,
      value = null,
      supportedFormats = ["png", "jpg", "jpeg", "jfif"],
      fieldProps: {
        downloadName,
        isDownloadable,
        containerClassName,
        convertToBase64 = true,
      } = {},
      name = "",
      disabled,
    }: FILE_INPUT_PROPS,
    ref
  ) {
    disabled = disabled || undefined;
    const [file, setFile] = useState(value);
    const [fileDetails, setFileDetails] = useState<File | null>(null);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    console.log(ref);

    const onDrop = async ([chosenFile]: File[]) => {
      if (chosenFile) {
        if (checkValidity(chosenFile.name, supportedFormats)) {
          setError(null);
          setFileDetails(chosenFile);
          setProcessing(true);
          // if convertToBase64 is true then convert, else return the file as it is
          if (convertToBase64) {
            // compress, if it is an image file
            if (isImageFile(chosenFile.name)) {
              let data = await compressFile(chosenFile, { maxSizeMB: 0.3 });
              setFile(data);
              onChange(data);
            } else {
              // else don't compress
              let data = await getBase64(chosenFile);
              setFile(data);
              onChange(data);
            }
          } else {
            setFile(chosenFile);
          }
          onChange(chosenFile);
          setProcessing(false);
        } else {
          setFileDetails(null);
          setError(`Invalid format. \nSupported formats: ${supportedFormats}`);
        }
      }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      disabled: processing,
    });

    useEffect(() => {
      setFile(value);
    }, [value]);

    const removeFile = () => {
      setFile(null);
      onChange(null);
      setError(null);
      setFileDetails(null);
    };

    const downloadChoosenFile = () => {
      downloadLink({
        link: file,
        name: downloadName || fileDetails?.name || name,
      });
    };

    return (
      <>
        <div
          className={[
            `choose-file-container ${processing ? "skeleton-box" : ""}`,
            containerClassName,
          ]
            .filter((el) => el)
            .join(" ")}
          {...getRootProps()}
          // onClick={processing ? () => {} : getRootProps().onClick}
          // multiple={false}
          style={{
            outline: "none",
            cursor: processing ? "default" : "pointer",
          }}
        >
          <input {...getInputProps()} disabled={disabled} />
          {processing ? (
            "Processing..."
          ) : isDragActive ? (
            <p style={{ margin: 0 }}>Drop the files here ...</p>
          ) : (
            <p style={{ margin: 0 }}>
              {fileDetails?.name ||
                "Click to select file. Or drag and drop file here"}
            </p>
          )}
        </div>
        {file && (
          <>
            <CustomButton color="error" onClick={removeFile} size="small">
              <i className="nc-icon nc-simple-remove" /> Remove Chosen File
            </CustomButton>
            {isDownloadable && (
              <CustomButton
                color="success"
                size="small"
                onClick={downloadChoosenFile}
              >
                <i className="fas fa-download" /> Download File
              </CustomButton>
            )}
          </>
        )}
        <div className="form-input-error">{error}</div>
      </>
    );
  }
);
