import { featuredAppsHomepageAdmin } from "@/app/utils/postDataApi";
import { ProductsList } from "@/app/components/admin/featured-products/featured-products-list";
export default async function FeaturedProducts() {
  const featuredApps = featuredAppsHomepageAdmin();
  const appsList = await featuredApps;
  return (
    <>
      <main>
        <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
          <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold leading-none text-gray-900">
                Add featured products to homepage
              </h3>
              <a
                href="#"
                className="text-sm font-medium text-purple-600 hover:bg-purple-100 rounded-lg inline-flex items-center p-2"
              >
             current status on homepage
             </a>
            </div>
            <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-200">
                {appsList && (appsList.map((app: any) => (
                  <ProductsList key={app.product_id} app={app} /> )
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
