import { useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import sidebarData from '../../data/sidebarData.json';
import './Sidebar.scss';

function Sidebar() {
    const [menuOpen, setMenuOpen] = useState({});
    const location = useLocation(); // 📌 Ruta actual

    const toggleMenu = (id) => {
        setMenuOpen(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const isSubmenuActive = (submenu) => {
        return submenu.some(
            item => item.path === location.pathname || (item.submenu && isSubmenuActive(item.submenu))
        );
    };

    const renderMenu = (items) => {
        return items.map(item => {
            const activeSubmenu = item.submenu && isSubmenuActive(item.submenu);

            return (
                <li className="sidebar__list" key={item.id}>
                    {item.submenu ? (
                        <>
                            <button
                                onClick={() => toggleMenu(item.id)}
                                className="sidebar__btn"
                            >
                                <i className={`me-3 ${item.icon}`}></i>
                                {item.title}
                            </button>
                            {(menuOpen[item.id] || activeSubmenu) && (
                                <ul className={`sidebar__submenu d-flex flex-column gap-2 ${menuOpen[item.id] ? 'sidebar__submenu--open' : ''}`}>
                                    {renderMenu(item.submenu)}
                                </ul>
                            )}
                        </>
                    ) : (
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `sidebar__btn ${isActive ? 'sidebar__btn--active' : ''}`
                            }
                        >
                            <i className={`me-3 ${item.icon}`}></i>
                            {item.title}
                        </NavLink>
                    )}
                </li>
            );
        });
    };

    return (
        <section className="sidebar vh-100 ">
            <div className="sidebar__cont">
                <div className='row p-0 m-0'>
                    <p className='text-center'>logo</p>
                </div>
                <ul className='sidebar__ulist d-flex flex-column gap-2 g-0 p-0 px-2'>
                    {renderMenu(sidebarData)}
                </ul>
            </div>
        </section>
    );
}

export default Sidebar;
