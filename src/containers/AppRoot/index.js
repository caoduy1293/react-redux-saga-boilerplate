/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import {Route, Switch} from 'react-router-dom';
import { Layout } from 'antd';
import ReduxToastr from 'react-redux-toastr'

import HomePage from '../DashboardApp/HomePage/Loadable';
import LoginPage from '../AuthApp/LoginPage/Loadable';
import NotFoundPage from '../SharedComponent/NotFoundPage/Loadable';
import Footer from '../SharedComponent/Footer';
import RequiredAuth from '../AuthApp/AuthorizationRequired';

import "../../assets/css/globalStyle.css";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import 'nprogress/nprogress.css';
import './FancyRoute.css'

import FancyRoute from "./FancyRoute";
import {connect} from "react-redux";
import {authenticateUser} from "./actions";

const rootRoutes = [
    {
        title: 'Home',
        path: '/',
        exact: true,
        component: RequiredAuth(HomePage)
    },
    {
        title: 'Login',
        path: '/login',
        component: LoginPage
    },
    {
        title: 'Not Found',
        path: '',
        component: NotFoundPage
    }
];


class App extends React.Component{
    render() {
        return (
            <Layout style={{ height: "100vh" }}>
                <Helmet
                    titleTemplate="%s - React.js Boilerplate"
                    defaultTitle="React.js Boilerplate"
                >
                    <meta name="description" content="A React.js Boilerplate application" />
                </Helmet>
                <Switch>
                    {rootRoutes.map((route, i) =>
                        <FancyRoute key={i} {...route} />
                    )}
                </Switch>
                <Footer />
                <ReduxToastr
                    timeOut={4000}
                    newestOnTop={true}
                    preventDuplicates
                    position="top-center"
                    transitionIn="bounceIn"
                    transitionOut="bounceOut"
                    progressBar={false}/>
            </Layout>
        );
    }
}

// const connectedApp = connect(null)(App);
export default App;
