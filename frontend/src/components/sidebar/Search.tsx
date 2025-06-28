import { ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";

interface SearchProps {
  search: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  handleShowUnseenMessages: () => void
}

const Search = ({ search, handleSearch, handleShowUnseenMessages }: SearchProps) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="group focus-within:bg-gray-100 dark:focus-within:bg-gray-600 focus-within:shadow-sm flex items-center bg-white dark:bg-gray-700 rounded-md px-3 py-2 flex-grow transition-all duration-200">
        <input
          type="text"
          placeholder="Search your contacts..."
          className="bg-transparent focus:outline-none w-full text-sm text-gray-900 dark:text-white"
          value={search}
          onChange={handleSearch}
        />
        <FaSearch className="ml-2 text-gray-500 dark:text-gray-300 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200" />
      </div>
      <button 
        className="p-2 rounded-md bg-gray-200 dark:bg-gray-600"
        onClick={handleShowUnseenMessages}
      >
        <IoFilter size={16} className="text-gray-700 dark:text-gray-300" />
      </button>
    </div>
  );
};

export default Search;
