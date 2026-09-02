function ServiceFilter({
  category,
  setCategory
}) {
  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="rounded-lg border border-gray-300 px-4 py-3"
    >
      <option value="">
        All Categories
      </option>

      <option value="Electrician">
        Electrician
      </option>

      <option value="Plumber">
        Plumber
      </option>

      <option value="Cleaner">
        Cleaner
      </option>

      <option value="Tutor">
        Tutor
      </option>

      <option value="Photographer">
        Photographer
      </option>
    </select>
  );
}

export default ServiceFilter;