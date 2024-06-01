/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { LANGUAGE_VERSIONS } from "@/lib/constants";

const API = axios.create({
  baseURL: "http://localhost:8000",
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
    const res = await API.post('/initializeProject');
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

// runPythonScript
export const runPythonScript = async (pythonScriptContent: any, ipnsName: string) => {
  const response = await API.post("/runPythonScript", {
    pythonScriptContent: pythonScriptContent,
    ipnsName: ipnsName
  });
  return response.data;
};

// publish
export const publish = async (ipnsName: string) => {
  const response = await API.post("/publish", {
    ipnsName: ipnsName
  });
  return response.data;
};