import { getAllPopularNowActive } from "@/app/utils/dataApi";
export default  function PopularNowText( {popularNow}: any) {
   return (
   

            <a
              href="/"
              className=" font-light sm:font-normal text-blue-500 underline hover:no-underline ml-2"
            >
              {popularNow.display_text}
            </a>
       
     
  );
}
