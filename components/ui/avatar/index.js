import { DefaultImage } from "../../../data";
import React, { useEffect } from "react";
import { useState } from "react";
import StepWizard from "react-step-wizard";
import { Modal } from "../m-ui";
import ChooseImage from "./components/choose-image";
import ImageEditor from "./components/image-editor";

const Avatar = ({
  containerClassName = "",
  containerStyle = {},
  initialImage = null,
  isEditable = true,
  deleteImage = () => {},
  onEditEnd = () => {},
  disabled = false,
}) => {
  const [editor, setEditor] = useState(false);
  const [image, setImage] = useState(initialImage);

  useEffect(() => {
    setImage(initialImage);
  }, [initialImage]);

  const closeModal = () => {
    setImage(null);
    setEditor(false);
  };
  return (
    <>
      <div
        className={["avatar-preview", containerClassName]
          .filter((el) => el)
          .join(" ")}
        style={{
          ...containerStyle,
          cursor: disabled ? "no-drop" : isEditable ? "pointer" : "default",
        }}
      >
        <img src={initialImage || DefaultImage} alt="" />
        {isEditable && !disabled && (
          <div className="update-avatar-div">
            <div>
              <i
                className="fas fa-edit"
                onClick={() => {
                  setImage(initialImage);
                  setEditor(true);
                }}
              />
              {!!initialImage && (
                <>
                  &nbsp;&nbsp;&nbsp;
                  <i className="fas fa-trash" onClick={deleteImage} />
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <Modal isOpen={editor} modalClassName="avatar-editor-modal">
        <StepWizard
          className="avatar-steps-container"
          initialStep={initialImage ? 2 : 1}
        >
          <ChooseImage image={image} close={closeModal} setImage={setImage} />
          <ImageEditor onEditEnd={onEditEnd} close={closeModal} image={image} />
        </StepWizard>
      </Modal>
    </>
  );
};

export default Avatar;
