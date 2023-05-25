import Nav from "./nav";

const Layout = ({ children, categories }:{ children:any, categories:any}) => (
  <>
    <Nav categories={categories} />
    {children}
  </>
);

const BlogLayout = ({ children, categories }:{ children:any, categories:any}) => (
  <Layout categories={categories}>
    {children}
  </Layout>
);

export default BlogLayout;  