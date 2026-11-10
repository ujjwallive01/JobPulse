const jobs = [
  { id: 1, title: "Frontend Developer", company: "TechCorp", location: "Remote" },
  { id: 2, title: "React Developer", company: "PixelWorks", location: "Kolkata" },
  { id: 3, title: "UI Engineer", company: "BrightApps", location: "Bangalore" },
];

function App() {
  return (
    <div>
      <h1>JobPulse</h1>
      {jobs.map((job) => (
        <div key={job.id}>
          <h3>{job.title}</h3>
          <p>
            {job.company} - {job.location}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;