import { useState, useEffect } from "react";
import JobCard from "./components/JobCard";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [jobType, setJobType] = useState("all");

  const [saved, setSaved] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("savedJobs")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("savedJobs", JSON.stringify(saved));
  }, [saved]);

  function toggleSave(id) {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  useEffect(() => {
    async function loadJobs() {
      try {
        const res = await fetch("https://remotive.com/api/remote-jobs?limit=50");
        if (!res.ok) throw new Error("Request failed");
        const data = await res.json();

        const cleaned = data.jobs.map((j) => ({
          id: j.id,
          title: j.title,
          company: j.company_name,
          location: j.candidate_required_location,
          category: j.category,
          jobType: j.job_type,
          url: j.url,
        }));

        setJobs(cleaned);
      } catch (err) {
        setError("Could not load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  const categories = [...new Set(jobs.map((j) => j.category).filter(Boolean))];
  const jobTypes = [...new Set(jobs.map((j) => j.jobType).filter(Boolean))];

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "all" || job.category === category) &&
      (jobType === "all" || job.jobType === jobType)
  );

  const selectClass =
    "rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none focus:border-blue-500";

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900">JobPulse</h1>
      <p className="mb-6 mt-1 text-sm text-gray-500">
        Jobs provided by{" "}
        <a href="https://remotive.com" className="text-blue-600 underline">
          Remotive
        </a>
      </p>

      <div className="mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search jobs by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`${selectClass} w-full max-w-md`}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={selectClass}
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className={selectClass}
        >
          <option value="all">All job types</option>
          {jobTypes.map((t) => (
            <option key={t} value={t}>
              {t.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-gray-500">Loading jobs...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && filteredJobs.length === 0 && (
        <p className="text-gray-500">No jobs found. Try different filters.</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSaved={saved.includes(job.id)}
            onToggleSave={() => toggleSave(job.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;