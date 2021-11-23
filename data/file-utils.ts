import { ParseLocalConfig } from "./predefined-interfaces";

export interface COMPRESS_FILE_OPTIONS {
  /** @default Number.POSITIVE_INFINITY */
  maxSizeMB?: number;
  /** @default undefined */
  maxWidthOrHeight?: number;
  /** @default false */
  useWebWorker?: boolean;
  /** @default 10 */
  maxIteration?: number;
  /** Default to be the exif orientation from the image file */
  exifOrientation?: number;
  /** A function takes one progress argument (progress from 0 to 100) */
  onProgress?: (progress: number) => void;
  /** Default to be the original mime type from the image file */
  fileType?: string;
  /** @default 1.0 */
  initialQuality?: number;
}

export interface EXPORT_ZIP_OPTIONS {
  files?: { fileName: string; base64?: string | null }[];
  fileName?: string | null;
  download?: boolean;
  returnTypeBlob?: boolean;
}

export interface PARSE_CSV_OPTIONS extends Omit<ParseLocalConfig, "complete"> {
  header?: boolean;
  preview?: number;
  dynamicTyping?:
    | boolean
    | {
        [headerName: string]: boolean;
        [columnNumber: number]: boolean;
      }
    | ((field: string | number) => boolean);
  comments?: string | false | undefined;
  skipEmptyLines?: boolean | "greedy";
  transformHeader?: (header: string, index: number) => string;
  complete?: any;
}
