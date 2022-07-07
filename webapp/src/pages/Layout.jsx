import React,{useEffect} from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loadAllUsers } from "../state/user";

import LayoutRoutes from "../routes/LayoutRoutes";

const Layout = () => {
	const location = useLocation();
	const dispatch = useDispatch()
	
	useEffect(()=>{
        dispatch(loadAllUsers())
	},[dispatch])
	
	return (
		<div>
			<nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
				<Link to='/' className="navbar-brand col-sm-3 col-md-2 mr-0">Admin Boilerplate</Link>
				<ul className="navbar-nav px-3">
					<li className="nav-item text-nowrap">
						<Link className="nav-link" to="/signout">
							Sign Out
						</Link>
					</li>
				</ul>
			</nav>

			<div className="container-fluid">
				<div className="row">
					<nav className="col-md-2 d-none d-md-block bg-light sidebar">
						<div className="sidebar-sticky" >
							<ul className="nav flex-column">
								<li className="nav-item">
									<Link className={location.pathname==="/"? "nav-link active":"nav-link"} to="/">
										Dashboard
									</Link>
								</li>
								<li className="nav-item">
									<Link className={location.pathname==="/users"? "nav-link active":"nav-link"} to="/users">
										Users
									</Link>
								</li>
							</ul>
						</div>
					</nav>
					<main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-5 pt-5">
						<LayoutRoutes/>
					</main>
				</div>
			</div>
		</div>
	)
}

export default Layout;