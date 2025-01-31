import { useState } from "react";
import "./App.css";

type Task = {
  id: string;
  code: string;
  result?: unknown;
};

type Plugin = {
  name: string;
  handler: (input: unknown) => unknown;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [plugin, setPlugins] = useState<Plugin[]>([]);
  const [userCode, setUserCode] = useState("");

  // Todo: Implement safe eval later
  const executeCode = () => {
    try {
      const result = eval(userCode); // TEMPORARY - we'll make this safe later
      setTasks((prev) => [
        ...prev,
        { id: Date.now().toString(), code: userCode, result },
      ]);
    } catch (error) {
      console.error("Execution failed: ", error);
    }
  };

  return (
    <div className="app">
      <h1>Dynamic Task Runner</h1>

      <div className="code-editor">
        <textarea
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          placeholder="Write your dynamic code here...."
          rows={6}
        />
        <button onClick={executeCode}>Run Code</button>
      </div>

      <div className="output">
        <h2>Execution Results</h2>
        {tasks.map((task) => (
          <div key={task.code} className="task-card">
            <code>{task.code}</code>
            <div className="result">
              → Result: {JSON.stringify(task.result)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
