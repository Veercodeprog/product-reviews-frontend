export default function HomeButtonList() {
  return (
    <div className="grid justify-between gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mb-3">
      <button
        type="button"
        className="bg-white px-2 text-gray-700 border border-gray-300 rounded-full h-12 text-sm  hover:bg-purple-700 hover:text-white"
      >
        Content Marketing
      </button>
      <button
        type="button"
        className="bg-white px-2 text-gray-700 border border-gray-300 rounded-full h-12 text-sm  hover:bg-purple-700 hover:text-white"
      >
        Content Strategy
      </button>
      <button
        type="button"
        className="bg-white px-2 text-gray-700 border border-gray-300 rounded-full h-12 text-sm  hover:bg-purple-700 hover:text-white"
      >
        Article Writing
      </button>
      <button
        type="button"
        className="bg-white px-2 text-gray-700 border border-gray-300 rounded-full h-12 text-sm  hover:bg-purple-700 hover:text-white"
      >
        Web Content
      </button>
      <button
        type="button"
        className="bg-white px-2 text-gray-700 border border-gray-300 rounded-full h-12 text-sm  hover:bg-purple-700 hover:text-white"
      >
        Blogging
      </button>
    </div>
  );
}
