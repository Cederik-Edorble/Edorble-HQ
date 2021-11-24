import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { EARTH_ICON, LOGO_ONLY } from '../commons/Content';

const Navbar = ({ goDashboard, logout }) => {
  const menu = (
    <Menu size="large" selectedKeys={['0']}>
      <Menu.Item key="0">
        <span>Dashboard</span>
      </Menu.Item>
      <Menu.Item key="1">
        <span>Pricings</span>
      </Menu.Item>
      <Menu.Item key="2">
        <span>Download</span>
      </Menu.Item>
      <Menu.Item key="3">
        <span>Help</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="4">
        <div onClick={logout} role="presentation">
          Logout
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="grid grid-cols-12 p-5 bg-gradient-to-r from-edorble-600 via-edorble-300 to-edorble-600 md:hidden">
        <img
          className="flot-left absolute w-12 animate-spin-slow top-2 left-2"
          src={LOGO_ONLY}
          alt=""
        />
        <div className="col-span-12 flex justify-center">
          <Dropdown
            overlay={menu}
            placement="topCenter"
            trigger={['click']}
            className="text-white font-bold"
            size="large"
          >
            <div
              role="presentation"
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              Menu
              {' '}
              <DownOutlined />
            </div>
          </Dropdown>
        </div>
        <div className="border col-span-6 hidden">
          <h1>yay</h1>
        </div>
        <div className="border col-span-6 hidden">
          <h1>yay</h1>
        </div>
      </div>

      <div
        className="grid
        grid-cols-12
        bg-gradient-to-r
        from-edorble-600
        via-edorble-300
        to-edorble-600
        hidden
        md:grid p-3"
      >
        <div className="col-span-3">
          <span
            className="text-center text-xl font-bold text-white float-left"
            onClick={goDashboard}
            role="button"
            tabIndex={0}
            onKeyPress={() => {}}
          >
            ed
            <span>
              <img
                className="inline animate-spin-slow w-8 mr-1 ml-1"
                src={EARTH_ICON}
                alt=""
              />
            </span>
            rble
          </span>
        </div>

        <div className="col-span-9">
          <div className="float-right mt-1">
            <Button type="default" ghost>
              Pricings
            </Button>
            <Button type="default" ghost className="ml-5">
              Downloads
            </Button>
            <Button type="default" ghost className="ml-5">
              Help
            </Button>
            <Button type="default" ghost className="ml-10" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

Navbar.propTypes = {
  goDashboard: PropTypes.func,
  logout: PropTypes.func,
};
Navbar.defaultProps = {
  goDashboard: () => {},
  logout: () => {},
};

export default Navbar;
