import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
function MainLayouts (){
    return(
        <div className="d-flex">
            <Sidebar />
                <Outlet />
        </div>
    )
}

export default MainLayouts;