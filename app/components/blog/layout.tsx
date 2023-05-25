import Nav from "./nav";

interface LayoutProps {
  children: React.ReactNode;
  categories: any; // Replace 'any' with the actual type of the 'categories' property
}

const Layout: React.FC<LayoutProps> = ({ children, categories }) => (

  <>
    <Nav categories={categories} />
    {children}
  </>
);

export default Layout;