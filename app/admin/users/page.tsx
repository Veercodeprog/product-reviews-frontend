import "server-only"
import UsersList from "@/app/components/admin/users/users-list";
import { getAllUsers } from "@/app/utils/postDataApi";
export default async function AllUsers() {
const usersData =  getAllUsers();
const users = await usersData ;
  return (
    <>
 <main>
        <div className="pt-6 px-4">
          <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
<UsersList users={users} />
          </div>
          </div>
          </main>

    </>
  );
}

