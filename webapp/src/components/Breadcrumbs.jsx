import React from "react";
import {useLocation, Link} from "react-router-dom";

const breadcrumbNameMap = {
    '/users': 'Users',
    '/users/addUser': 'Add User',
    '/users/editUser': 'Edit User',
};

const Breadcrumbs = () => {

    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
		<nav aria-label="breadcrumb" className="mb-5">
			<ol className="breadcrumb">
				<li className="breadcrumb-item"><Link to='/' >Home</Link></li>
				{pathnames.map((value, index) => {
					const last = index === pathnames.length - 1;
					const to = `/${pathnames.slice(0, index + 1).join('/')}`;
					return last ? (
						<li key={to} className="breadcrumb-item active" aria-current="page">{breadcrumbNameMap[to]}</li>
					) : (
							
						<li key={to} className="breadcrumb-item"><Link to={to} >{breadcrumbNameMap[to]}</Link></li>
					);
				})}
			</ol>
		</nav>
    );
}

export default Breadcrumbs;
