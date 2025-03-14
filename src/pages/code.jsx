
import { useState } from "react";
import Editor from "@monaco-editor/react";
import {  VscSettingsGear, VscFileCode } from "react-icons/vsc";

export default function LambdaUI() {
  const [code, setCode] = useState('// Write your Lambda function code here...');
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const runCode = async () => {
    try {
      const response = await fetch("http://localhost:3000/invoke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
      });

      const data = await response.json();
      setOutput(data.output || "");
      setError(data.error || "");
    } catch (err) {
      setError("Failed to connect to server");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      {/* Top Bar */}
      <div className="flex items-center bg-[#252526] px-4 py-2 text-sm">
        <span className="text-blue-400 font-bold">Serverless</span>
      </div>

      <div className="flex flex-1 ">
        {/* Sidebar */}
        <div className="w-16 bg-[#252526] flex flex-col items-center space-y-4 py-4">
          <VscFileCode className="text-gray-400 text-2xl cursor-pointer hover:text-white" title="Code" />
          <VscSettingsGear className="text-gray-400 text-2xl cursor-pointer hover:text-white " title="Configuration" />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col ">
          {/* Code Editor */}
          <div className="flex-1 bg-[#313131]">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme="vs-dark"
              defaultValue={code}
              onChange={(value) => setCode(value)}
            />
          </div>          
        </div>        
      </div>
    </div>
  );
}

