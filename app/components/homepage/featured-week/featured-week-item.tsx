export default function FeaturedWeekItem() {
return(
<>
<div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4 ">
                    <div className="relative">
                      <img
                        className="w-full rounded-lg"
                        src="https://dummyimage.com/200x150/000/fff.jpg" width={200} height={150}
                        alt="image1"
                      />

                      <h2 className="image--headings md__down:text-2xl">
                        Image Title
                      </h2>
                      <p className="image--desc md__down:text-xl">
                     image description
                      </p>
                    </div>
                  </div>
</>
)

}