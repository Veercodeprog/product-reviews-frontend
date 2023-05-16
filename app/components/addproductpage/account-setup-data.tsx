function AccountSetup({ onNext, onPrevious }) {
  // ...

  const handleNext = (e) => {
    e.preventDefault();
    onNext(e);
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    onPrevious(e);
  };
  return (
    <>
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
