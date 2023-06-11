import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FaLinkedin, FaTwitter } from 'react-icons/fa'
function FoundersTab(props:any) {

return(
<>



<div className="mb-20">
  <div className="flex items-start rounded-lg p-4 my-5">
    <div className="flex flex-col items-center">
      <div className="rounded-full overflow-hidden h-16 w-16 flex-shrink-0 mt-1">
        <img
          className="h-full w-full object-cover"
          src="https://dummyimage.com/200x200/c4c4c4/ffffff&text=John+Doe"
          alt="User Profile"
        />
      </div>
      <div className="flex mt-2">
        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="mr-2">
          <FaLinkedin size={20} />
        </a>
        <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
          <FaTwitter size={20} />
        </a>
      </div>
    </div>
    <div className="ml-12">
      {/* Render the review data */}
      <p className="text-lg font-bold"> FounderName</p>
      <p className="text-sm text-gray-500">Subtitle 1</p>
      <p className="text-sm text-gray-500">Subtitle 2</p>
      <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum</p>
      <div className="star-rating">
        <p>{/* Add the star rating here */}</p>
      </div>
    </div>
  </div>
</div>






</>
)

}

export default  FoundersTab

