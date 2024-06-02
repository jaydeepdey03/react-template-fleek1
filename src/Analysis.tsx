/* eslint-disable @typescript-eslint/no-explicit-any */
import {ArrowLeft} from "lucide-react";
import {useNavigate, useParams} from "react-router-dom";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import CodeEditor from "./components/CodeEditor";
import Output from "./components/Output";
import {useEffect, useRef, useState} from "react";
import {CODE_SNIPPETS, type Language} from "./lib/constants";
import {getIpnsRecord, getFileContent} from "./components/api";
import {useContractHook} from "./Context/ContractContract";

export default function Analysis() {
  const navigate = useNavigate();

  const [language] = useState<Language>("python");
  const [value, setValue] = useState<string | undefined>(
    CODE_SNIPPETS["python"]
  );
  const editorRef = useRef(null);

  const {contract, currentAccount} = useContractHook();

  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  const {id} = useParams();

  const [sheetDetails, setSheetDetails] = useState<any>(null);
  const [contentKey, setContentKey] = useState<{ipnsName: string} | null>(null);

  useEffect(() => {
    const viewSheetDetails = async (id: string | undefined) => {
      try {
        const res = await contract.viewSheetDetails(id);
        console.log(res, "res");
        setSheetDetails(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) viewSheetDetails(id);
  }, [id, contract]);

  useEffect(() => {
    const getIFSHhash = async () => {
      console.log("sheetDetails", sheetDetails);
      const key = await getIpnsRecord(sheetDetails.ipns);
      console.log(key, "key");
      setContentKey(key);
    };

    if (sheetDetails) {
      getIFSHhash();
    }
  }, [sheetDetails]);

  useEffect(() => {
    console.log("contentKey", contentKey);
    const updateCode = async () => {
      const res = await getFileContent(contentKey?.ipnsName ?? "");
      console.log(res, "res");
      setValue(res.content);
    };
    if (contentKey) {
      updateCode();
    }
  }, [contentKey]);

  return (
    <div className="h-screen w-full relative">
      <div className="h-[100px] w-full flex items-center justify-between px-10 bg-gray-900 absolute inset-0">
        <div
          className="flex items-center gap-6 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-8 w-8 p-1 border rounded-full text-white" />
          <p className="text-white text-xl font-semibold">
            {sheetDetails?.name}
          </p>
        </div>
        <div className="flex">
          <Avatar className="h-8 w-8 -ml-4 first:ml-0">
            <AvatarImage src="/usdc.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8 -ml-4">
            <AvatarImage src="/dai.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8 -ml-4">
            <AvatarImage src="/eth.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="w-full h-full flex flex-col lg:flex-row p-7 gap-3">
        <div
          className="lg:w-1/2 w-full h-full translate-y-[100px]"
          style={{
            height: "calc(100% - 100px)",
          }}
        >
          <div className="bg-white w-full h-full border-2 rounded-xl">
            <CodeEditor
              readOnly={
                sheetDetails?.owner.toLowerCase() !==
                currentAccount.toLowerCase()
                  ? true
                  : false
              }
              language={language}
              onMount={onMount}
              value={value}
              setValue={setValue}
            />
          </div>
        </div>
        <div
          className="lg:w-1/2 w-full h-full translate-y-[100px]"
          style={{
            height: "calc(100% - 100px)",
          }}
        >
          <Output
            editorRef={editorRef}
            language={language}
            contentKey={contentKey}
            contentValue={value}
          />
        </div>
      </div>
    </div>
  );
}
