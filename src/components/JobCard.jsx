function JobCard({ job }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
      <p className="mt-1 text-gray-600">{job.company}</p>
      <span className="mt-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
        {job.location}
      </span>
    </div>
  );
}

export default JobCard;