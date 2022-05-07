import React, { Fragment } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink
} from "react-router-dom";
import { routes } from '../helpers/pages';
// import { ModuloProcesos } from '../pages/ModuloProcesos';
// import { ModuloRam } from '../pages/ModuloRam';
// import { Logs } from '../pages/Logs'

export const Sidebar = () => {
    return (
        <Router>
            <Fragment>
                <div className="wrapper">

                    <nav id="sidebar" >
                        <div className="sidebar-header" >
                            {/* <h3>
                                <NavLink to="/home">Home</NavLink>
                            </h3> */}
                        </div>
                        <ul className="list-unstyled components">


                            {
                                routes.map((route, i) => (
                                    <li className='styled-li' key={i} >
                                        <NavLink to={route.path} style={{ textDecoration: 'none' }} key={i}>{route.name}</NavLink>
                                    </li>
                                ))
                            }


                        </ul>


                    </nav>


                    <Routes>

                        {
                            routes.map((route) => (
                                <Route path={route.path} element={ <route.component />} />
                            ))
                        }

                        {/* <Route path="/" element={<ModuloRam />} />
                        <Route path="/moduloram" element={<ModuloRam />} />
                        <Route path="/moduloprocesos" element={<ModuloProcesos />} />
                        <Route path="/logs" element={<Logs />} /> */}
                    </Routes>



                </div>
            </Fragment>

        </Router>
    )
}
