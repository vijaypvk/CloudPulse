import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { VscFileCode, VscSettingsGear, VscSearch,  VscChromeClose, VscServerEnvironment,  VscGlobe, VscTerminal, VscOutput } from "react-icons/vsc";
import { FiCpu, FiSun, FiMoon } from "react-icons/fi";
import { BiNetworkChart } from "react-icons/bi";
import { AiOutlineCloudServer } from "react-icons/ai";
import Header from '../components/header';

export default function CloudpulseUI() {
  const [code, setCode] = useState(`
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  return new Response('Hello serverless world!', {
    headers: { 'content-type': 'text/plain' },
  })
}`);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("console");
  const [path, setPath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deployStatus, setDeployStatus] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  
  
  // Load theme preference from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDarkMode);
    }
  }, []);
  
  // Save theme preference when it changes
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const runCode = async () => {
    setIsLoading(true);
    setOutput("");
    setError("");
    
    try {
      const response = await fetch("http://localhost:5000/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language:"python" })
      });

      const data = await response.json();
      setOutput(data.output || "");
      setError(data.error || "");
    } catch (err) {
      setError("Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  const deployCode = async () => {
    setIsLoading(true);
    setDeployStatus("deploying");
    
    try {
      // Mock deployment process
      await new Promise(resolve => setTimeout(resolve, 1500));
      setDeployStatus("success");
      setOutput("Function deployed successfully to edge network!\n" +
        "Deployment ID: wkr_8f72bc6549e2\n" +
        "Available at: https://my-worker.username.workers.dev");
    } catch (err) {
      setDeployStatus("failed");
      setError("Deployment failed: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Compute theme-dependent classes
  const themeClasses = {
    app: darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900",
    header: darkMode ? "bg-[#1e1e1e] border-gray-800" : "bg-white border-gray-300",
    sidebar: darkMode ? "bg-[#252526] border-gray-800" : "bg-gray-200 border-gray-300",
    sidebarIcon: darkMode ? "text-gray-400 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-300",
    tabBar: darkMode ? "bg-[#252526] border-gray-800" : "bg-gray-200 border-gray-300",
    activeTab: darkMode ? "bg-[#1e1e1e] text-white border-blue-500" : "bg-white text-gray-900 border-blue-500",
    inactiveTab: darkMode ? "text-gray-400 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-300",
    console: darkMode ? "bg-[#1e1e1e] text-white" : "bg-white text-gray-900",
    urlInput: darkMode ? "bg-gray-800 bg-gray-900" : "bg-gray-200 bg-white",
    preview: darkMode ? "bg-white text-black" : "bg-white text-black",
    statusBar: darkMode ? "bg-[#1e1e1e] text-gray-400 border-gray-800" : "bg-gray-200 text-gray-600 border-gray-300",
    fileTab: darkMode ? "bg-[#252526] border-gray-700" : "bg-gray-200 border-gray-300",
  };

  return (
    <div className={`h-screen flex flex-col ${themeClasses.app}`}>
      <div>
        <Header />
      </div>
      {/* Header */}
      <div className={`px-4 py-2 border-b flex items-center ${themeClasses.header}`}>
        <div className="flex items-center">
          <AiOutlineCloudServer className="text-blue-500 text-2xl mr-2" />
          <span className="font-semibold text-lg">Serverless Functions</span>
        </div>
        <div className="ml-auto flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-500 transition-colors"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <FiSun className="text-yellow-400" />
            ) : (
              <FiMoon className="text-blue-600" />
            )}
          </button>
          <div className={`px-3 py-1 rounded-full text-xs flex items-center ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}>
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            <span>Local Environment</span>
          </div>
          <button 
            className={`px-4 py-1 rounded text-sm font-medium ${
              isLoading && deployStatus === "deploying" 
                ? "bg-orange-600 text-white" 
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
            onClick={runCode}
            disabled={isLoading}
          >
            {isLoading && deployStatus === "deploying" ? "Deploying..." : "Deploy to Production"}
          </button>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="flex flex-1">
        {/* Left Sidebar - Actions */}
        <div className={`w-12 flex flex-col items-center space-y-4 py-4 border-r ${themeClasses.sidebar}`}>
          <div className={`p-2 rounded ${themeClasses.sidebarIcon}`}>
            <VscFileCode className="text-2xl" title="Files" />
          </div>
          <div className={`p-2 rounded ${themeClasses.sidebarIcon}`}>
            <VscSearch className="text-2xl" title="Search" />
          </div>
          <div className={`p-2 rounded ${themeClasses.sidebarIcon}`}>
            <VscServerEnvironment className="text-2xl" title="Environment" />
          </div>
          <div className={`p-2 rounded ${themeClasses.sidebarIcon}`}>
            <BiNetworkChart className="text-2xl" title="Network" />
          </div>
          <div className={`p-2 rounded ${themeClasses.sidebarIcon}`}>
            <VscSettingsGear className="text-2xl" title="Settings" />
          </div>
        </div>

        {/* Left Panel - Code Editor */}
        <div className="flex-1 flex flex-col">
          {/* File Tab */}
          <div className={`flex items-center ${themeClasses.fileTab}`}>
            <div className={`px-4 py-2 flex items-center border-r ${themeClasses.fileTab}`}>
              <span className="text-blue-500 text-xs">index.js</span>
              <button className={`ml-2 ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}>
                <VscChromeClose size={14} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="absolute inset-0">
              <Editor
                height="100%"
                defaultLanguage="javascript"
                theme={darkMode ? "vs-dark" : "light"}
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  lineNumbers: "on",
                  renderLineHighlight: "all",
                  tabSize: 2,
                }}
              />
            </div>
          </div>

          {/* Editor Status Bar */}
          <div className={`text-xs p-2 border-t flex justify-between items-center ${themeClasses.statusBar}`}>
            <div className="flex space-x-6">
              <div className="flex items-center">
                <span>JavaScript</span>
              </div>
              <div className="flex items-center">
                <span>UTF-8</span>
              </div>
              <div className="flex items-center">
                <span>LF</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center">
                <FiCpu size={12} className="mr-1" />
                <span>Ready</span>
              </div>
            </div>
          </div>
        </div> 

        {/* Right Panel - Preview & Console */}
        <div className="w-2/5 flex flex-col border-l border-gray-300">
          {/* Tab navigation */}
          <div className={`flex border-b ${themeClasses.tabBar}`}>
            <button 
              className={`px-4 py-2 text-sm flex items-center ${activeTab === "console" ? themeClasses.activeTab : themeClasses.inactiveTab}`}
              onClick={() => setActiveTab("console")}
            >
              <VscTerminal className="mr-2" />
              Console
            </button>
            <button 
              className={`px-4 py-2 text-sm flex items-center ${activeTab === "preview" ? themeClasses.activeTab : themeClasses.inactiveTab}`}
              onClick={() => setActiveTab("preview")}
            >
              <VscGlobe className="mr-2" />
              Preview
            </button>
            <button 
              className={`px-4 py-2 text-sm flex items-center ${activeTab === "logs" ? themeClasses.activeTab : themeClasses.inactiveTab}`}
              onClick={() => setActiveTab("logs")}
            >
              <VscOutput className="mr-2" />
              Logs
            </button>
          </div>

          {activeTab === "preview" && (
            <>
              {/* URL Input */}
              <div className={`p-2 flex ${ darkMode? "bg-gray-800" : "bg-gray-200"}`}>
                <div className={`flex-1 rounded flex items-center px-2 ${darkMode ? "bg-gray-900" : "bg-white border border-gray-300"}`}>
                  <span className={darkMode ? "text-gray-400" : "text-gray-600"}>/</span>
                  <input
                    type="text"
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                    className={`flex-1 bg-transparent border-none outline-none px-2 py-1 ${darkMode ? "text-white" : "text-gray-900"}`}
                    placeholder="Enter path"
                  />
                </div>
                <button 
                  className={`px-4 ml-2 rounded font-medium ${
                    isLoading ? "bg-gray-700 text-gray-400" : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                  onClick={runCode}
                  disabled={isLoading}
                >
                  {isLoading ? "Running..." : "Execute"}
                </button>
              </div>  

              {/* Preview Content */}
              <div className="flex-1 bg-[#252526] text-black overflow-auto p-4">
                {output && <div className="font-mono whitespace-pre-wrap">{output}</div>}
                {!output && !error && !isLoading && (
                  <div className="text-gray-500 flex flex-col items-center justify-center h-full">
                    <VscGlobe className="text-4xl mb-2" />
                    <p>Execute your function to see the response</p>
                  </div>
                )}
                {isLoading && (
                  <div className="text-gray-500 flex flex-col items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                    <p>Running your serverless function...</p>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === "console" && (
            <div className={`flex-1 font-mono text-sm p-2 overflow-auto ${themeClasses.console}`}>
              <div className="flex flex-col space-y-1">
                {isLoading && (
                  <div className="text-yellow-400">&gt; Executing function...</div>
                )}
                {output && (
                  <>
                    <div className="text-green-500">&gt; Function executed successfully</div>
                    <pre className={`whitespace-pre-wrap pl-4 border-l-2 border-green-500 p-2 rounded ${
                      darkMode ? "bg-opacity-10 bg-green-900 text-gray-300" : "bg-green-50 text-gray-800"
                    }`}>
                      {output}
                    </pre>
                  </>
                )}
                {error && (
                  <>
                    <div className="text-red-500">&gt; Function execution failed</div>
                    <pre className={`whitespace-pre-wrap pl-4 border-l-2 border-red-500 p-2 rounded ${
                      darkMode ? "bg-opacity-10 bg-red-900 text-gray-300" : "bg-red-50 text-gray-800"
                    }`}>
                      {error}
                    </pre>
                  </>
                )}
                {deployStatus === "success" && (
                  <div className={`text-green-500 p-2 rounded ${
                    darkMode ? "bg-green-900 bg-opacity-10" : "bg-green-50"
                  }`}>
                    &gt; Deployment successful: Your function is live on the edge network
                  </div>
                )}
                {!output && !error && !isLoading && (
                  <div className={darkMode ? "text-gray-500" : "text-gray-600"}>
                    &gt; Ready to execute. Click "Execute" to run your serverless function.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "logs" && (
            <div className={`flex-1 font-mono text-sm p-2 overflow-auto ${themeClasses.console}`}>
              <div className="flex justify-between mb-2">
                <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Function logs</span>
                <button className="text-xs text-blue-500 hover:underline">Clear logs</button>
              </div>
              <div className={darkMode ? "text-gray-500" : "text-gray-600"}>
                No logs available. Execute your function to generate logs.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}