export default function FeaturedWeekItem({ featuredProduct }: any) {
  return (
    <>
      <div className="w-full">
        <div className="relative">
          <img
            className="w-full h-[150px] rounded-lg object-cover border p-2"
            src={featuredProduct.icon}
            width={200}
            height={150}
            alt="image1"
          />

          <h2 className="image--headings md__down:text-2xl capitalize">
            {featuredProduct.name}
          </h2>
          <p className="image--desc md__down:text-xl"></p>
        </div>
      </div>
    </>
  );
}
