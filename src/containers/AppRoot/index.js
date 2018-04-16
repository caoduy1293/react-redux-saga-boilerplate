/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import HomePage from '../DashboardApp/HomePage/Loadable';
import LoginPage from '../AuthApp/LoginPage/Loadable';
import NotFoundPage from '../SharedComponent/NotFoundPage/Loadable';
import Footer from '../SharedComponent/Footer';
import RequiredAuth from '../AuthApp/AuthorizationRequired';

import "../../assets/css/globalStyle.css";


export default function App() {
    return (
        <Layout style={{ height: "100vh" }}>
            <Helmet
                titleTemplate="%s - React.js Boilerplate"
                defaultTitle="React.js Boilerplate"
            >
                <meta name="description" content="A React.js Boilerplate application" />
            </Helmet>
            <Switch>
                <Route exact path="/" component={RequiredAuth(HomePage)} />
                <Route path="/login" component={LoginPage} />
                <Route path="" component={NotFoundPage} />
            </Switch>
            <Footer />
        </Layout>
    );
}
