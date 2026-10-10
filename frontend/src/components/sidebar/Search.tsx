import { ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";
import { IoFilter, IoFilterOutline } from "react-icons/io5";

interface SearchProps {
  search: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  handleShowUnseenMessages: () => void;
  showUnseenMessages: boolean;
}

const Search = ({ search, handleSearch, handleShowUnseenMessages, showUnseenMessages }: SearchProps) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="group relative flex-1">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
        <input
          type="text"
          placeholder="Search conversations..."
          className="input-field pl-10"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <button
        className={`btn-icon ${showUnseenMessages ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : ''}`}
        onClick={handleShowUnseenMessages}
        aria-label={showUnseenMessages ? "Show all conversations" : "Filter unread"}
      >
        {showUnseenMessages ? <IoFilter size={20} /> : <IoFilterOutline size={20} />}
      </button>
    </div>
  );
};

export default Search;