import AdminProvider from "../components/admin/adminProvider"
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section><AdminProvider> {children}</AdminProvider></section>
}