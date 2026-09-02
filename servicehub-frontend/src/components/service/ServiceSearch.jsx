function ServiceSearch({
  search,
  setSearch
}) {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search services..."
      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
    />
  );
}

export default ServiceSearch;