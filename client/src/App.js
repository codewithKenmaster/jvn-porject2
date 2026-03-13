import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [repoUrl, setRepoUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeRepo = async () => {
    if (!repoUrl) return;

    try {
      setLoading(true);

      const response = await axios.post("http://localhost:4008/analyze", {
        repoUrl,
      });

      setResult(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Error analyzing repository");
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Open Source Health Dashboard</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter GitHub Repository URL"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />

        <button onClick={analyzeRepo}>Analyze</button>
      </div>

      {loading && <p>Analyzing repository...</p>}

      {result && (
        <div className="results">
          <h2>Health Checklist</h2>

          <ul>
            <li>LICENSE file: {result.hasLicense ? "Yes" : "No"}</li>

            <li>README.md: {result.hasReadme ? "Yes" : "No"}</li>

            <li>.gitignore: {result.hasGitignore ? "Yes" : "No"}</li>

            <li>
              Recent Commit (last 6 months):{" "}
              {result.recentCommit ? "Yes" : "No"}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
