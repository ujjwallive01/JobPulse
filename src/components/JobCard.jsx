function JobCard({ job, isSaved, isNew, onToggleSave }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          {isNew && (
            <span className="mb-2 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
              New
            </span>
          )}
          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
        </div>
        <button
          onClick={onToggleSave}
          className={`rounded-md px-2 py-1 text-sm ${
            isSaved
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {isSaved ? "★ Saved" : "☆ Save"}
        </button>
      </div>
      <p className="mt-1 text-gray-600">{job.company}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
          {job.location}
        </span>
        {job.jobType && (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
            {job.jobType.replace("_", " ")}
          </span>
        )}
      </div>
      <a
        href={job.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-sm text-blue-600 underline"
      >
        View on Remotive →
      </a>
    </div>
  );
}

export default JobCard;