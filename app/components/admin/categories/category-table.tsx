
import { CategoriesTableRow } from "./categories-table-row" 
export default function CategoriesTable({categoriesTableData}:any){
return(
<>

 <table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr>
      <th
        scope="col"
        className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        style={{ width: "10%" }}
      >
        Id
      </th>
      <th
        scope="col"
        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Category Name
      </th>
      <th
        scope="col"
        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        style={{ width: "40%" }}
      >
        Description
      </th>
      <th
        scope="col"
        className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        style={{ width: "10%" }}
      >
        Emoji
      </th>
      <th
        scope="col"
        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Category Featured
      </th>
      <th
        scope="col"
        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Edit
      </th>
    </tr>
  </thead>
  <tbody className="bg-white">
{categoriesTableData.map((category:any)=>(
<CategoriesTableRow key={category.id} categories={category} />
))}
  </tbody>
</table>

</>
)

}
