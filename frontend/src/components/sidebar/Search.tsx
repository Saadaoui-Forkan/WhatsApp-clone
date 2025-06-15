import { FaSearch } from "react-icons/fa"
import { IoFilter } from "react-icons/io5"

const Search = () => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="flex items-center bg-white dark:bg-gray-700 rounded-md px-3 py-2 flex-grow">
        <input
          type="text"
          placeholder="Search your contacts..."
          className="bg-transparent focus:outline-none w-full text-sm text-gray-900 dark:text-white"
        />
        <FaSearch className="text-gray-500 dark:text-gray-300 ml-2" />
      </div>
      <button className="p-2 rounded-md bg-gray-200 dark:bg-gray-600">
        <IoFilter size={16} className="text-gray-700 dark:text-gray-300" />
      </button>
    </div>
  )
}

export default Search