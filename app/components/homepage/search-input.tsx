import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBinoculars, faSearch } from "@fortawesome/free-solid-svg-icons";
export default function SearchInput() {
return(
<div className="search-input">
                <input
                  type="text"
                  className="w-full pl-12 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Search"
                />
                <div className="absolute top-3 left-3">
                  <FontAwesomeIcon icon={faSearch} size="lg" />
                </div>
</div>
)
}