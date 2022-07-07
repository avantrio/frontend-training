 import React from 'react';
import ReduxToastr from 'react-redux-toastr';
import { Provider } from 'react-redux';
import './App.scss';
import './custom.scss'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import store from './state/store';
import AppRoutes from "./routes/AppRoutes";


function App() {
	return (
		<Provider store={store}>
			<ReduxToastr
				timeOut={2000}
				transitionIn='fadeIn'
				transitionOut='fadeOut'
				closeOnToastrClick
			/>
			<AppRoutes/>
		</Provider>
	);
}

export default App;
