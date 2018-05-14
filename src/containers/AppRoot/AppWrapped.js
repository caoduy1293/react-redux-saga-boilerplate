import React from "react";
import {Icon, Layout} from "antd";
import {enquireScreen} from 'enquire-js';
import {Switch} from "react-router-dom";

import HomePage from '../DashboardApp/HomePage/Loadable';
import UserApp from '../UserApp/Loadable';
import RoomApp from '../RoomApp/Loadable';
import RequiredAuth from '../AuthApp/AuthorizationRequired';
import {ROUTE_TREE} from "./constants";

import logo from './company_logo.png';
import SiderComponent from "../SharedComponent/SiderComponent/index";
import FancyRoute from "./FancyRoute";

import 'rc-drawer-menu/assets/index.css';

const {Header, Content} = Layout;
const rootRoutes = [
    {
        title: 'Home',
        path: '/',
        exact: true,
        component: HomePage
    },
    {
        title: 'User App',
        path: '/' + ROUTE_TREE.userApp,
        component: UserApp
    },
    {
        title: 'Room App',
        path: '/' + ROUTE_TREE.roomApp,
        component: RoomApp
    },
];
let isMobile;
enquireScreen(b => {
    isMobile = b;
});

class AppWrapped extends React.Component{
    state = {
        isMobile,
        open: true,
    };
    onChange = (bool) => {
        console.log(bool);
    };
    onTouchEnd = () => {
        this.setState({
            open: false,
        });
    };
    onSwitch = () => {
        this.setState({
            open: !this.state.open,
        });
    };
    onMaskClick = () => {
        this.setState({
            open: false,
        });
    };
    render() {
        return (
            <Layout id={'components-layout-demo-custom-trigger'}>
                <SiderComponent logo={logo} onCollapse={this.onMaskClick} isMobile={isMobile} collapsed={this.state.open}/>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}>
                        <Icon
                            className="trigger"
                            type={this.state.open ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.onSwitch}
                        />
                    </Header>
                    <Content style={{margin: '24px 16px', padding: 10, background: '#fff'}}>
                        <Switch>
                            {rootRoutes.map((route, i) =>
                                <FancyRoute key={i} {...route} />
                            )}
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

// const connectedApp = connect(null)(App);
export default AppWrapped;