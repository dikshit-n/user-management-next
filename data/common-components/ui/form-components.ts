import { ChangeEvent } from "../../predefined-interfaces";

interface FIELD_PROPS {
  downloadName?: string | null;
  isDownloadable?: boolean | null;
  containerClassName?: string | null;
  convertToBase64?: boolean | null;
}

export interface FILE_INPUT_PROPS {
  onChange?: (
    e: any
  ) => null | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  value?: any;
  supportedFormats?: string[] | null;
  fieldProps?: FIELD_PROPS;
  name?: string | null;
}
