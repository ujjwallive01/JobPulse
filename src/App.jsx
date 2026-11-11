import { useState, useEffect } from "react";
import JobCard from "./components/JobCard";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadJobs() {
      try {
        const res = await fetch("https://remotive.com/api/remote-jobs?limit=30");
        if (!res.ok) throw new Error("Request failed");
        const data = await res.json();

        const cleaned = data.jobs.map((j) => ({
          id: j.id,
          title: j.title,
          company: j.company_name,
          location: j.candidate_required_location,
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

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">JobPulse</h1>

      <input
        type="text"
        placeholder="Search jobs by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full max-w-md rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none focus:border-blue-500"
      />

      {loading && <p className="text-gray-500">Loading jobs...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && filteredJobs.length === 0 && (
        <p className="text-gray-500">No jobs found. Try a different search.</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default App;