/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {useState} from "react";
import {toast} from "sonner";
import {executeCode} from "./api";
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

const Output = ({editorRef, language}: {editorRef: any; language: string}) => {
  const [output, setOutput] = useState([] || null);
  const [, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [openDatasetModal, setOpenDatasetModal] = useState(false);

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
        <Button className="w-[100px]" onClick={runCode}>
          Run Code
        </Button>
      </div>
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
