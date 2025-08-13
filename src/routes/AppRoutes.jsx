import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayouts from "../components/Layouts/MainLayouts";
import { Suspense, lazy } from "react";
import sidebarData from "../data/sidebarData.json";

function AppRoutes() {

    // Función para mapear JSON a rutas
    const generateRoutes = (menu) => {
        return menu.map(item => {
            if (item.path && item.component) {
                // Lazy load del componente
                const Component = lazy(() => import(/* @vite-ignore */ `../components/${item.component}.jsx`));
                return <Route key={item.id} path={item.path} element={<Component />} />;
            }
            if (item.submenu) {
                return generateRoutes(item.submenu);
            }
            return null;
        });
    };

    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <Routes>
                <Route path="/" element={<MainLayouts />}>
                    {generateRoutes(sidebarData)}
                </Route>
            </Routes>
        </Suspense>
    );
}

export default AppRoutes;
