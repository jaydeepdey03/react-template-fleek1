/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {useState} from "react";
import {toast} from "sonner";
// import {executeCode} from "./api";
import {Button} from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {SearchIcon} from "lucide-react";
import {Input} from "./ui/input";
import {useContractHook} from "../Context/ContractContract";
import {runPythonScript, publishCode} from "../components/api";

const Output = ({
  editorRef,
  // language,
  contentKey,
  contentValue,
}: {
  editorRef?: any;
  language?: string;
  contentKey?: any;
  contentValue?: any;
}) => {
  const [output, setOutput] = useState<any>([] || null);
  const [, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [openDatasetModal, setOpenDatasetModal] = useState(false);

  const {accessControl} = useContractHook();

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      // const { run: result } = await executeCode(language, sourceCode);
      const result = await runPythonScript(contentKey.ipnsName, contentValue);
      console.log(result, "result");

      setOutput(result);
      !result ? setIsError(true) : setIsError(false);
      console.log(sourceCode, "sourceCode");
    } catch (error: any) {
      console.log(error);
      toast(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const publish = async () => {
    // push code to ipfs
    // get the cid
    // push in ipns using ipns name
    try {
      const {ipnsName} = contentKey;

      await runPythonScript(ipnsName, contentValue);
      const publish = await publishCode(ipnsName);
      console.log(publish, "runCode");

      const res = await accessControl(publish.ipfsHash);
      console.log(res, "accessControl");
      console.log("publishing code");
    } catch (error: any) {
      console.log(error);
      toast(`Error: ${error.message}`);
    }
  };

  return (
    <div className="h-full w-full flex flex-col gap-4 items-end">
      <Dialog open={openDatasetModal} onOpenChange={setOpenDatasetModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              <div className="relative ml-auto flex-1 md:grow-0 mt-5">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg bg-background pl-8 focus-visible:ring-0"
                />
                <div className="grid grid-cols-3 grid-flow-row grid-rows-3 w-full place-items-center pt-5 gap-6">
                  <div className="h-28 w-full border rounded-xl">
                    <div className="flex flex-col gap-3 justify-center h-full w-full items-center">
                      <img
                        src="https://s3.coinmarketcap.com/static-gravity/image/5a8229787b5e4c809b5914eef709b59a.png"
                        className="h-8 w-8"
                        alt="placeholder"
                      />
                      <div className="text-center">
                        <p className="text-sm">Dataset Title</p>
                        <p className="text-xs">Dataset Description</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-28 w-full border rounded-xl">
                    <div className="flex flex-col gap-3 justify-center h-full w-full items-center">
                      <img
                        src="https://s3.coinmarketcap.com/static-gravity/image/5a8229787b5e4c809b5914eef709b59a.png"
                        className="h-8 w-8"
                        alt="placeholder"
                      />
                      <div className="text-center">
                        <p className="text-sm">Dataset Title</p>
                        <p className="text-xs">Dataset Description</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-28 w-full border rounded-xl">
                    <div className="flex flex-col gap-3 justify-center h-full w-full items-center">
                      <img
                        src="https://s3.coinmarketcap.com/static-gravity/image/5a8229787b5e4c809b5914eef709b59a.png"
                        className="h-8 w-8"
                        alt="placeholder"
                      />
                      <div className="text-center">
                        <p className="text-sm">Dataset Title</p>
                        <p className="text-xs">Dataset Description</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-28 w-full border rounded-xl">
                    <div className="flex flex-col gap-3 justify-center h-full w-full items-center">
                      <img
                        src="https://s3.coinmarketcap.com/static-gravity/image/5a8229787b5e4c809b5914eef709b59a.png"
                        className="h-8 w-8"
                        alt="placeholder"
                      />
                      <div className="text-center">
                        <p className="text-sm">Dataset Title</p>
                        <p className="text-xs">Dataset Description</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-28 w-full border rounded-xl">
                    <div className="flex flex-col gap-3 justify-center h-full w-full items-center">
                      <img
                        src="https://s3.coinmarketcap.com/static-gravity/image/5a8229787b5e4c809b5914eef709b59a.png"
                        className="h-8 w-8"
                        alt="placeholder"
                      />
                      <div className="text-center">
                        <p className="text-sm">Dataset Title</p>
                        <p className="text-xs">Dataset Description</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-28 w-full border rounded-xl">
                    <div className="flex flex-col gap-3 justify-center h-full w-full items-center">
                      <img
                        src="https://s3.coinmarketcap.com/static-gravity/image/5a8229787b5e4c809b5914eef709b59a.png"
                        className="h-8 w-8"
                        alt="placeholder"
                      />
                      <div className="text-center">
                        <p className="text-sm">Dataset Title</p>
                        <p className="text-xs">Dataset Description</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-28 w-full border rounded-xl">
                    <div className="flex flex-col gap-3 justify-center h-full w-full items-center">
                      <img
                        src="https://s3.coinmarketcap.com/static-gravity/image/5a8229787b5e4c809b5914eef709b59a.png"
                        className="h-8 w-8"
                        alt="placeholder"
                      />
                      <div className="text-center">
                        <p className="text-sm">Dataset Title</p>
                        <p className="text-xs">Dataset Description</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-28 w-full border rounded-xl">
                    <div className="flex flex-col gap-3 justify-center h-full w-full items-center">
                      <img
                        src="https://s3.coinmarketcap.com/static-gravity/image/5a8229787b5e4c809b5914eef709b59a.png"
                        className="h-8 w-8"
                        alt="placeholder"
                      />
                      <div className="text-center">
                        <p className="text-sm">Dataset Title</p>
                        <p className="text-xs">Dataset Description</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-28 w-full border rounded-xl">
                    <div className="flex flex-col gap-3 justify-center h-full w-full items-center">
                      <img
                        src="https://s3.coinmarketcap.com/static-gravity/image/5a8229787b5e4c809b5914eef709b59a.png"
                        className="h-8 w-8"
                        alt="placeholder"
                      />
                      <div className="text-center">
                        <p className="text-sm">Dataset Title</p>
                        <p className="text-xs">Dataset Description</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="w-full flex justify-between">
        <Button
          className="focus-visible:ring-0"
          variant={"outline"}
          onClick={() => setOpenDatasetModal(true)}
        >
          Select Dataset
        </Button>
        <div className="flex items-center gap-3">
          <Button className="w-[100px]" onClick={runCode}>
            Run Code
          </Button>
          <Button className="w-[100px]" onClick={() => publish()}>
            Publish Code
          </Button>
        </div>
      </div>
      <div className="bg-white w-full h-[500px] lg:h-full rounded-xl flex flex-col gap-2">
        <div
          className={`h-3/4 p-2 border ${
            isError ? "text-red-400" : ""
          } border-1 border-solid rounded-md ${
            isError ? "border-red-500" : "border-gray-300"
          }`}
        >
          {/* {<pre>{JSON.stringify(output, null, 2) || null}</pre>} */}

          {}
          {output &&
            output.messages &&
            output.messages.map((line: any, i: number) => (
              <p key={i}>{line}</p>
            ))}

          {output &&
            output.messages === undefined &&
            output.map((line: any, i: number) => <p key={i}>{line}</p>)}

          {/* {output && output.messages.length === 0 && (
            <p>Click "Run Code" to see the output here</p>
          )} */}

          {output && output.length === 0 && (
            <p>Click "Run Code" to see the output here</p>
          )}

          {output && output.messages && output.length === 0 && (
            <p>Click "Run Code" to see the output here</p>
          )}

          {/* <p>Click "Run Code" to see the output here</p> */}
        </div>
        <div className="border h-[600px] lg:h-full rounded-xl">
          {output && output.imgSrc && (
            <img src={output && output.imgSrc} alt="" />
          )}

          {output && !output.imgSrc && (
            <div className="flex justify-center items-center h-full">
              <p>Click "Run Code" to see the graphs here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Output;
