import {useState} from "react";
import {toast} from "sonner";
import {executeCode} from "./api";
import {Button} from "./ui/button";
// import { executeCode } from "../api";

const Output = ({editorRef, language}: {editorRef: any; language: string}) => {
  const [output, setOutput] = useState([] || null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const {run: result} = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
      console.log(sourceCode, "sourceCode");
    } catch (error: any) {
      console.log(error);
      toast(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex flex-col gap-4 items-end">
      <Button className="w-[100px]" onClick={runCode}>
        Run Code
      </Button>
      <div className="bg-white w-full h-full border-2 rounded-xl">
        <div
          className={`h-3/4 p-2 ${
            isError ? "text-red-400" : ""
          } border-1 border-solid rounded-md ${
            isError ? "border-red-500" : "border-gray-300"
          }`}
        >
          {output
            ? output.map((line, i) => <p key={i}>{line}</p>)
            : 'Click "Run Code" to see the output here'}

          {/* <p>Click "Run Code" to see the output here</p> */}
        </div>
      </div>
    </div>
  );
};
export default Output;
