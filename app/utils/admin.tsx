// pages/api/admin.js
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";

export default async function admin(req, res) {
  const session = await getSession({ req });

  if (!session || session.user.role !== "admin") {
    // User is not authenticated or not an admin, redirect to home page
    res.writeHead(302, { Location: "/" });
    res.end();
    return;
  }

  // User is authenticated and an admin, render the admin page
  const router = useRouter();
  router.push("/admin");
}
