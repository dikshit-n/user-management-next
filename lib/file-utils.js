import { axiosInstance } from "./axios-instance";
import Papa from "papaparse";
import { getDateCollapsed } from "./date-utils";
import Compress from "compress.js";
const JsZip = require("jszip");

export const imageUrlToBase64 = async (url) => {
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

export const compressFile = async (files, options = {}) => {
  let compress = new Compress();
  let data = null;
  try {
    data = await compress.compress(files, {
      size: options.size ? options.size : 2, // the max size in MB, defaults to 2MB
      quality: options.quality ? options.quality : 0.75, // the quality of the image, max is 1,
      maxWidth: 1920, // the max width of the output image, defaults to 1920px
      maxHeight: 1920, // the max height of the output image, defaults to 1920px
      resize: options.resize !== undefined ? options.resize : false, // defaults to true, set false if you do not want to resize the image width and height
    });
  } catch (err) {
    console.log(err);
    data = null;
  }
  data = data.map((el) => ({
    ...el,
    dataWithPrefix: el.prefix + el.data,
  }));
  return data;
};

export const downloadLink = ({ link, name }) => {
  let aTag = document.createElement("a");
  aTag.href = link;
  aTag.target = "_blank";
  aTag.download = name;
  aTag.click();
};

export async function getBase64(file) {
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
  file,
  {
    header = true,
    preview = false,
    dynamicTyping = true,
    comments,
    skipEmptyLines = true,
    transformHeader = (header) => header,
  } = {}
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
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const Zip = new JsZip();
      let folder = Zip.folder(fileName);
      files.forEach((el) => {
        folder.file(el.fileName, el.base64);
      });
      let res = await Zip.generateAsync({ type: "blob" });
      let blobUrl = URL.createObjectURL(res);
      if (download) {
        downloadLink({
          link: blobUrl,
          name: `${fileName} - createdOn_ ${getDateCollapsed(new Date())}.zip`,
        });
        resolve();
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
    ...rows.map((el) => [...el.map((ele) => (ele === 0 ? "0" : ele))]),
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
