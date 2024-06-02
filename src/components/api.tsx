/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import {LANGUAGE_VERSIONS} from "@/lib/constants";

const API = axios.create({
  baseURL: "https://loomhub.onrender.com",
});

export const executeCode = async (language: any, sourceCode: any) => {
  const response = await API.post("/execute", {
    language: language,
    version: LANGUAGE_VERSIONS[language as keyof typeof LANGUAGE_VERSIONS],
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};

export const initializeProject = async () => {
  try {
    const res = await API.post("/initializeProject");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// runPythonScript
export const runPythonScript = async (
  ipnsName: string,
  pythonScriptContent: any
) => {
  console.log("hello", ipnsName, pythonScriptContent);
  const response = await API.post("/runPythonScript", {
    pythonScriptContent: pythonScriptContent,
    ipnsName: ipnsName,
  });

  return response.data;
};

// publish
export const publishCode = async (ipnsName: string) => {
  const response = await API.post("/publish", {
    ipnsName: ipnsName,
  });
  return response.data;
};

export const getIpnsRecord = async (ipnsName: string) => {
  console.log("getIpnsRecord");
  const response = await API.get(`/getIpnsRecord?ipnsName=` + ipnsName);

  console.log(response.data, "response.data");

  return response.data;
};

export const getFileContent = async (ipnsName: string) => {
  const response = await API.get(`/getFileContent?ipnsName=` + ipnsName);
  return response.data;
};
