function AccountSetup({ onNext, onPrevious, personalProfileFormData, socialProfileFormData}: { onNext: any, onPrevious: (e: React.MouseEvent<HTMLButtonElement>) => void, personalProfileFormData:any, socialProfileFormData:any
 }  ) {
  // ...
console.log("personalFormData:");
console.log("socialFormData:");
  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onNext(e);
  };

  const handlePrevious = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onPrevious(e);
  };
const personalFormData = JSON.parse(personalProfileFormData);
  const socialFormData = JSON.parse(socialProfileFormData);
  return (
    <>

<div>
 

<div>
  <h3 className="text-lg font-bold">Personal Details</h3>
  <ul className="mt-4">
    {Object.entries(personalFormData).map(([key, value]) => (
      <li key={key} className="flex items-center mb-2">
        <span className="font-medium mr-2">{key}:</span>
        {key === "productIcon" ? (
          <img src={value} alt={key} className="w-40 h-20" />
        ) : key === "screenshots" ? (
          Array.isArray(value) ? (
            value.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Screenshot ${index + 1}`}
                className="w-40 h-20 mx-3"
              />
            ))
          ) : (
            <img src={value} alt={key} className="w-20 h-10" />
          )
        ) : (
          <span>{value as string}</span>
        )}
      </li>
    ))}
  </ul>
</div>

<div>
  <h3 className="text-lg font-bold">Social Profile Information</h3>
  <ul className="mt-4">
    {Object.entries(socialFormData).map(([key, value]) => (
      <li key={key} className="flex items-center mb-2">
        <span className="font-medium mr-2">{key}:</span>
        {key === "avatarImg" ? (
          <img src={value} alt={key} className="w-40 h-20" />
        ) : (
          <span>{value as string}</span>
        )}
      </li>
    ))}
  </ul>
</div>

        {/* <p>Product Name: {personalFormData.productName}</p> */}
        {/* <p>Short Description: {personalFormData.shortDescription}</p> */}
      </div>

      <div>
        {/* <h3>Social Profile Information</h3>
        <p>Avatar Image: {socialFormData.avatarImg}</p>
        <p>First Name: {socialFormData.fname}</p>
        <p>Last Name: {socialFormData.lname}</p>
        <p>Role: {socialFormData.role}</p>
        <p>Bio: {socialFormData.bio}</p>
        <p>Work Email: {socialFormData.workEmail}</p>
        <p>Message: {socialFormData.msg}</p>
        <p>LinkedIn URL: {socialFormData.linkedinUrl}</p>
        <p>Twitter URL: {socialFormData.twitterUrl}</p> */}
      </div>
          <div className="flex  flex-row sm:justify-end mt-10 mb-10">
      <button
        type="button"
        name="previous"
 className="previous w-24 sm:w-32 bg-gray-500 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:bg-purple-300 font-medium text-white text-sm px-4 py-2 text-center dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900 mb-4 sm:mb-0 mr-8"        onClick={handlePrevious}
      >
        Previous
      </button>
      <button type="submit" name="submit"  className="next w-24  sm:w-32 bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:bg-purple-300 font-medium text-white text-sm px-4 py-2 text-center dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900 mb-4 sm:mb-0 mr-8">
        Submit
      </button>
</div>
    </>
  );
}

export default AccountSetup;
