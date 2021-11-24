import React, { useState } from "react";
import AvatarEditor from "react-avatar-editor";
import AsyncButton from "../../AsyncButton";
import { useRef } from "react";
import { useEffect } from "react";
import { imageUrlToBase64 } from "../../../Utility/fileUtils";
import { Spinner } from "reactstrap";
import { DefaultImage } from "../../../exports";

const ImageEditor = ({
  image = null,
  previousStep,
  onEditEnd = () => {},
  close = () => {},
}) => {
  const [settings, setSettings] = useState({
    scale: 1.2,
    rotate: 0,
  });
  const [processing, setProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState(null);

  useEffect(() => {
    (async () => {
      // to avoid tainted canvas error, convert image url to base64 format
      if (image && image.startsWith("http")) {
        setProcessing(true);
        try {
          const base64Image = await imageUrlToBase64(image);
          setProcessedImage(`data:image/png;base64,${base64Image}`);
          setProcessing(false);
        } catch {
          window.flash("Failed to Process Image !", "error");
          setProcessing(false);
          close();
        }
      } else setProcessedImage(image || DefaultImage);
    })();
    return () => {};
  }, [image]);

  const imageRef = useRef();

  const changeHandler = ({ target: { value, name } }) => {
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const settingsInputs = [
    {
      name: "scale",
      type: "range",
      value: settings.scale,
      onChange: changeHandler,
      min: 1,
      max: 5,
      step: 0.3,
      displayName: "Zoom",
      // containerStyle: { background: "transparent", padding: 0, margin: 0 },
      style: { padding: "5px 0" },
    },
    {
      name: "rotate",
      type: "range",
      value: settings.rotate,
      onChange: changeHandler,
      min: 0,
      max: 360,
      step: 10,
      displayName: "Rotate",
      // containerStyle: { background: "transparent", padding: 0, margin: 0 },
      style: { padding: "5px 0" },
    },
  ];

  const getCroppedImage = () => {
    const finalImage = imageRef.current.getImageScaledToCanvas().toDataURL();
    onEditEnd(finalImage);
    close();
  };

  return (
    <>
      <div
        className="d-flex justify-content-between"
        style={{ width: "100%", maxWidth: 500, margin: "auto" }}
      >
        <div />
        <AsyncButton onClick={close} color="danger">
          <i className="nc-icon nc-simple-remove" />
        </AsyncButton>
      </div>
      <div className="image-editor-step">
        {processing ? (
          <div
            style={{ width: "100%", height: 200 }}
            className="d-flex flex-center"
          >
            <Spinner />
          </div>
        ) : (
          <>
            <AvatarEditor
              ref={imageRef}
              image={processedImage}
              width={150}
              height={150}
              border={50}
              borderRadius={100}
              color={[57, 57, 57, 0.388]} // RGBA
              disableDrop
              {...settings}
            />
            <div className="editor-settings">
              <h5 style={{ fontWeight: "bold" }}>Options</h5>
              <hr style={{ marignTop: 0, marginBottom: 0 }} />
              {settingsInputs.map((el, index) => (
                <>
                  <div className="d-flex flex-column">
                    <label style={{ fontWeight: "bold" }}>
                      {el.displayName}
                    </label>
                    <input {...el} key={index} />
                  </div>
                  <br />
                </>
              ))}
              <div className="d-flex flex-wrap" style={{ gap: 10 }}>
                <AsyncButton
                  onClick={getCroppedImage}
                  color="success"
                  size="sm"
                >
                  Done
                </AsyncButton>
                <AsyncButton
                  onClick={() => previousStep()}
                  color="danger"
                  size="sm"
                >
                  Change Image
                </AsyncButton>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ImageEditor;
