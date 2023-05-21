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
        <span>{value as string}</span>
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
        <span>{value as string}</span>
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
      <button
        type="button"
        name="previous"
        className="previous action-button px-6"
        onClick={handlePrevious}
      >
        Previous
      </button>
      <button type="submit" name="submit" className="submit action-button">
        Submit
      </button>
    </>
  );
}

export default AccountSetup;
