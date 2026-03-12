// server/server.js
import express from "express";
import cors from "cors";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 4008;

// ES module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Serve React build static files
const clientBuildPath = path.join(__dirname, "../client/build");
app.use(express.static(clientBuildPath));

// --- API route ---
app.post("/analyze", async (req, res) => {
  const { repoUrl } = req.body;
  try {
    const parts = repoUrl.replace("https://github.com/", "").split("/");
    const owner = parts[0],
      repo = parts[1];

    const repoData = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
    );
    const contents = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contents`,
    );
    const files = contents.data.map((f) => f.name);

    // GitHub Actions
    let hasGitHubActions = false;
    if (files.includes(".github")) {
      try {
        const workflows = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/contents/.github/workflows`,
        );
        hasGitHubActions =
          Array.isArray(workflows.data) && workflows.data.length > 0;
      } catch {}
    }

    const lastCommit = new Date(repoData.data.pushed_at);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    res.json({
      hasLicense: files.includes("LICENSE"),
      hasReadme: files.includes("README.md"),
      hasGitignore: files.includes(".gitignore"),
      recentCommit: lastCommit > sixMonthsAgo,
      hasGitHubActions,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Repository not found", error: err.message });
  }
});

// Fallback for React SPA
app.use((req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
