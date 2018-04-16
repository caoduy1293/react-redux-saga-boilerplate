import React from 'react';
import propTypes from 'prop-types';
import DrawerMenu from 'rc-drawer-menu';
import SiderMenu from './SiderMenu';

import 'rc-drawer-menu/assets/index.css';

class SiderComponent extends React.Component {
  displayBaseOnDevice = (props) => {
      return props.isMobile ? (
          <DrawerMenu
              parent={null}
              level={null}
              iconChild={null}
              open={props.collapsed}
              onMaskClick={() => {
                  props.onCollapse();
              }}
              width="256px"
          >
              <SiderMenu {...props} collapsed={props.isMobile ? false : props.collapsed} />
          </DrawerMenu>
      ) : (
          <SiderMenu {...props} />
      )
  };
  render() {
    return this.displayBaseOnDevice(this.props);
  }
}

SiderComponent.propTypes = {
    isMobile: propTypes.bool,
    collapsed: propTypes.bool,
    onCollapse: propTypes.func,
};

export default SiderComponent;
