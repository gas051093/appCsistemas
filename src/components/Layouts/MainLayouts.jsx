import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useLocation } from "react-router-dom";
function MainLayouts() {
    const location = useLocation()
  return (
    <div className="d-flex">
      <Sidebar />
      <div>
        <Header title={location.pathname} subTitle={ location.pathname} />
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayouts;