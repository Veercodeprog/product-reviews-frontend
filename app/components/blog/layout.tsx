import Nav from "./nav";

const Layout = ({ children, categories }:{ children:any, categories:any}) => (
  <>
    <Nav categories={categories} />
    {children}
  </>
);

export default Layout;  