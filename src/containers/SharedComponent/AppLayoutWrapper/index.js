import React from 'react';
import {Icon, Layout} from "antd";
import {enquireScreen} from 'enquire-js';

import SiderComponent from "../SiderComponent";
import 'rc-drawer-menu/assets/index.css';

import logo from './company_logo.png';

const {Header, Content} = Layout;

let isMobile;
enquireScreen(b => {
    isMobile = b;
});

class AppLayoutWrapper extends React.Component {
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
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default AppLayoutWrapper;
