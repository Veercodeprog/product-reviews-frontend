import Link from "next/link";

const Navbar = ({ categories }: { categories :any}) => {
  return (
    <nav className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-black text-lg font-bold">Strapi Blog</h1>
          </div>
          <div className="flex items-center">
            <ul className="flex space-x-4">
              {categories.map((category:any) => (
                <li key={category.id}>
                  <Link href={`/category/${category.attributes.slug}`}>
                    <span className="text-black hover:text-white">{category.attributes.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
