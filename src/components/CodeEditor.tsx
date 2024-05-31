import {CODE_SNIPPETS, type Language} from "@/lib/constants";
import {Editor} from "@monaco-editor/react";
import {useRef, useState} from "react";

export default function CodeEditor({
  language,
  onMount,
  value,
  setValue,
}: {
  language: Language;
  onMount: (editor: any) => void;
  value: string | undefined;
  setValue: (value: string) => void;
}) {
  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        width="100%"
        language={language}
        defaultValue={CODE_SNIPPETS[language]}
        onMount={onMount}
        value={value}
        onChange={(value) =>
          setValue(value ?? "" /* Provide a default if value is undefined */)
        }
      />
    </div>
  );
}
