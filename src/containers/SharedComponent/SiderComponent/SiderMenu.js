import React from "react";
import propTypes from "prop-types";
import {Icon, Layout, Menu} from "antd";
import {Link} from "react-router-dom";
import {ROUTE_TREE} from "../../AppRoot/constants";

const { Sider } = Layout;

class SiderMenu extends React.Component {
    static contextTypes = {
        router: propTypes.object,
    };
    state = {
        theme: 'dark',
        current: ROUTE_TREE.home,
    };
    handleClick = (e) => {
        let urlGo = e.key;
        urlGo = urlGo !== ROUTE_TREE.home ? urlGo : '';
        this.setState({
            current: e.key,
        });
        this.context.router.history.push('/' + urlGo);
    };
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
                <Menu theme={this.state.theme}
                      mode="inline"
                      onClick={this.handleClick}
                      selectedKeys={[this.state.current]}>
                    <Menu.Item key={ROUTE_TREE.home}>
                        <Icon type="home" />
                        <span>Home</span>
                    </Menu.Item>
                    <Menu.Item key={ROUTE_TREE.userApp}>
                        <Icon type="user" />
                        <span>User Management
                        </span>
                    </Menu.Item>
                    <Menu.Item key={ROUTE_TREE.roomApp}>
                        <Icon type="appstore-o" />
                        <span>Room Management</span>
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