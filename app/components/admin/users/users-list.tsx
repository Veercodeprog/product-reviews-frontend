import "server-only";
import UsersListItem from "./user-list-item";
export default function UsersList({ users }: any) {
  return (
    <>
      <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
        <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold leading-none text-gray-900">
              Users
            </h3>
            <a
              href="#"
                         className="text-sm font-medium text-purple-600 hover:bg-gray-100 rounded-lg p-2"

                        >
              View all
            </a>
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200">
              {users && users.map((user: any) => <UsersListItem user={user} />)}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
