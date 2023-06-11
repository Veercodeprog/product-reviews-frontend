export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-black text-white z-50"> {/* Added z-50 for higher stacking order */}
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="p-4 flex items-center">
              <p className="mx-auto">&copy; 2023 Your Website. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
