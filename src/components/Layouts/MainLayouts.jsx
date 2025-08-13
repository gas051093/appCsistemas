import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
function MainLayouts (){
    return(
        <div className="d-flex">
            <Sidebar />
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayouts;