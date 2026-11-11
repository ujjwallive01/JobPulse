import JobCard from "./components/JobCard";

const jobs = [
  { id: 1, title: "Frontend Developer", company: "TechCorp", location: "Remote" },
  { id: 2, title: "React Developer", company: "PixelWorks", location: "Kolkata" },
  { id: 3, title: "UI Engineer", company: "BrightApps", location: "Bangalore" },
];

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">JobPulse</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default App;