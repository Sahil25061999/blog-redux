export const Navbar = () => {
  return (
    <nav className=" container__width flex flex-row justify-between py-6 text-sm">
      <div className=" flex flex-row">
        <img alt="blog-logo" />
        <h1>The blog</h1>
      </div>
      <ul className="flex flex-row">
        <li className=" mr-2">Login</li>
        <li>SignUp</li>
      </ul>
    </nav>
  );
};
