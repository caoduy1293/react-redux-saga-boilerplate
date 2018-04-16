import React from "react";
import propTypes from "prop-types";
import {Icon, Layout, Menu} from "antd";
import {Link} from "react-router-dom";

const { Sider } = Layout;

class SiderMenu extends React.Component {
    render() {
        const { logo, collapsed, onCollapse } = this.props;
        return (
            <Sider
                id={'components-layout-demo-custom-trigger'}
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint="lg"
                onCollapse={onCollapse}
                width={256}
            >
                <div className='logo' key="logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Icon type="user" />
                        <span>nav 1</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="video-camera" />
                        <span>nav 2</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="upload" />
                        <span>nav 3</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

SiderMenu.propTypes = {
    collapsed: propTypes.bool,
    logo: propTypes.string,
    onCollapse: propTypes.func,
};

export default SiderMenu;