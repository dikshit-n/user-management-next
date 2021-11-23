import { axiosInstance } from "./axios-instance";
import Papa from "papaparse";
import { getDateCollapsed } from "./date-utils";
import compress from "browser-image-compression";
import {
  COMPRESS_FILE_OPTIONS,
  EXPORT_ZIP_OPTIONS,
  PARSE_CSV_OPTIONS,
} from "../data";
const JsZip = require("jszip");

export const imageUrlToBase64 = async (url: string) => {
  try {
    if (url && url.startsWith("http")) {
      let image = await axiosInstance.post("/services/image_to_base64", {
        url,
      });
      const { raw } = image.data;
      return raw;
    } else return url;
  } catch (err) {
    return null;
  }
};

export const compressFile = async (
  file: File,
  options: COMPRESS_FILE_OPTIONS = {}
) => {
  let data = null;
  try {
    data = await compress(file, {
      maxSizeMB: 2, // the max size in MB, defaults to 2MB
      initialQuality: 0.75, // the quality of the image, max is 1,
      maxWidthOrHeight: 1920, // the max width/height of the output image, defaults to 1920px
      ...options,
    });
  } catch (err) {
    console.log(err);
    data = null;
  }
  // data = data.map((el) => ({
  //   ...el,
  //   dataWithPrefix: el.prefix + el.data,
  // }));
  return data;
};

export const downloadLink = ({
  link,
  name,
}: {
  link: string;
  name?: string | null;
}) => {
  name = name || "download";
  let aTag = document.createElement("a");
  aTag.href = link;
  aTag.target = "_blank";
  aTag.download = name;
  aTag.click();
};

export async function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      // console.log(reader.result);
      resolve(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
      resolve(null);
    };
  });
}

export async function parseCSVFile(
  file: File,
  {
    header = true,
    preview = 0,
    dynamicTyping = true,
    comments,
    skipEmptyLines = true,
    transformHeader = (header: any) => header,
  }: PARSE_CSV_OPTIONS = {}
) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (res) => {
        // res = alterResult(res);
        resolve(res);
      },
      error: (err) => reject(err),
      skipEmptyLines,
      header,
      transformHeader,
      preview,
      dynamicTyping,
      comments,
    });
  });
}

export const exportZip = async ({
  files = [],
  fileName = "",
  download = true,
  returnTypeBlob = true, // whether to return the zipped file in a blob format or the same format as we get in the params (so that you can use the returned data in dynamic ways)
}: EXPORT_ZIP_OPTIONS = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const Zip = new JsZip();
      let folder = Zip.folder(fileName);
      files.forEach((el: any) => {
        folder.file(el.fileName, el.base64);
      });
      let res = await Zip.generateAsync({ type: "blob" });
      let blobUrl = URL.createObjectURL(res);
      if (download) {
        downloadLink({
          link: blobUrl,
          name: `${fileName} - createdOn_ ${getDateCollapsed(new Date())}.zip`,
        });
        resolve(null);
      } else resolve(returnTypeBlob ? blobUrl : files);
    } catch (err) {
      console.log(err);
      reject("Failed to export File");
    }
  });

export const exportCSV = (
  { headings = [], rows = [] } = {},
  { download = true, fileName = "", prefix = true } = {}
) => {
  let newDownloadData = [
    headings,
    // convert undefined / null values to empty string
    ...rows.map((el: any) => [
      ...el.map((ele: any) => (ele === 0 ? "0" : ele)),
    ]),
  ];
  let csvContent = prefix
    ? "data:text/csv;charset=utf-8," +
      newDownloadData.map((e) => e.join(",")).join("\n")
    : newDownloadData.map((e) => e.join(",")).join("\n");
  var encodedUri = prefix ? encodeURI(csvContent) : csvContent;
  if (!download) return csvContent;
  // return encodedUri;
  let link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.style.visibility = "hidden";
  link.setAttribute(
    "download",
    `${fileName + ` - createdOn_ ${getDateCollapsed(new Date())}`}.csv`
  );
  document.body.appendChild(link); // Required for FF
  link.click();
};
