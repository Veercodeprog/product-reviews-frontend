function AccountSetup({ onNext, onPrevious }: { onNext: (e: React.MouseEvent<HTMLButtonElement>) => void, onPrevious: (e: React.MouseEvent<HTMLButtonElement>) => void }  ) {
  // ...

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onNext(e);
  };

  const handlePrevious = (e: React.MouseEvent<HTMLButtonElement>) => {
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
