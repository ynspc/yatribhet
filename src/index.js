import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './index.css';
import './assets/style.css'
import { Provider } from 'react-redux';
import store from './redux/store';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './components/ThemeColor';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

import App from './App';
import Navbar from './views/Navbar';
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import TopDestination from './views/TopDestination';
import PlaceDetail from './views/PlaceDetail';


library.add(fab)
ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <BrowserRouter history={createBrowserHistory()}>
                <Navbar/>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/topDestination" component={TopDestination} />
                <Route path="/extra" component={App} />
                <Route path='/PlaceDetail/:id' component={PlaceDetail}/>
            </BrowserRouter>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
