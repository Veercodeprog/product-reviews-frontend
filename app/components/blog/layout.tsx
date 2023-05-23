import Nav from "./nav";

const Layout = ({ children, categories, seo }:{ children:any, categories:any, seo:any }) => (
  <>
    <Nav categories={categories} />
    {children}
  </>
);

export default Layout;