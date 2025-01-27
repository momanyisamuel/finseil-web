import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SiteHeader from "./site-header";
import Logo from "./logo";

type LayoutProps = object;

const Layout: FC<LayoutProps> = () => {
  const location = useLocation();

  // List of paths where SiteHeader should be hidden
  const hiddenHeaderPaths = ["/", "/login", "/register"];

  // Check if the current path is in the hiddenHeaderPaths array
  const shouldHideHeader = hiddenHeaderPaths.includes(location.pathname);

  return (
    <div className="relative text-base font-light bg-background font-barlow text-foreground">
      {!shouldHideHeader && <SiteHeader />}
      <Outlet />
      {!shouldHideHeader && (
        <div className="relative bottom-0 w-full">
          <footer className="w-full px-4 py-8 shadow-sm ">
            <div className="flex items-center justify-between w-full">
              <div className="text-sm text-gray-500">
                &copy; {new Date().getUTCFullYear()} All Rights Reserved
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500"><span>Powered by</span> <span><Logo className="w-full h-4" /></span></div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Layout;
