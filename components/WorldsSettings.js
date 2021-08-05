import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Col, Row, Tooltip
} from 'antd';
import MapSelector from './MapSelector';
import NewWorldForm from './NewWorldForm';
import DrawerTitle from './DrawerTitle';

const WorldsSettings = ({
  activeWorld,
  fetchWorlds,
  updateWorld,
  createWorld,
  deleteWorld,
  setShowModal,
  setDrawerTitle,
  maps,
  password,
  retypePassword,
  setPassword,
  setRetypePassword
}) => {
  const [enableEdit, setEnableEdit] = useState(false);

  const updateEnablePassword = async (ev, val) => {
    ev.preventDefault();
    await updateWorld({
      variables: {
        updateWorldInput: {
          user: +localStorage.getItem('userId'),
          id: +activeWorld.id,
          enablePassword: val,
        },
      },
    });
  };

  const updatePassword = async (ev) => {
    ev.preventDefault();
    await updateWorld({
      variables: {
        updateWorldInput: {
          id: +activeWorld.id,
          user: +localStorage.getItem('userId'),
          password,
        },
      },
    });
  };

  return (
    <div className="grid col-span-12">
      <div className="grid grid-cols-12 gap-2 flex">
        <div className="grid col-span-12 md:col-span-3 gap-2 justify-center">
          <img
            className="w-32 cursor-pointer"
            src="https://www.bluecircle.foundation/s3/uploads/55000efd-581f-47c2-ae9a-3980313cac68_icon_256x256.png"
            alt=""
          />
          <br />
        </div>
        <div className="grid col-span-12 md:col-span-8 gap-4 mt-10 md:mt-0">
          <h1 className="text-4xl text-edorble-300 font-bold w-full">
            {activeWorld.name}
            <i
              className="fa fa-edit float-right text-2xl cursor-pointer mt-1"
              role="presentation"
              onClick={() => {
                setDrawerTitle(
                  <DrawerTitle
                    text="Edit World"
                  />
                );
                setShowModal(
                  <NewWorldForm
                    fetchWorlds={fetchWorlds}
                    activeWorld={activeWorld}
                    updateWorld={updateWorld}
                    createWorld={createWorld}
                    deleteWorld={deleteWorld}
                  />
                );
              }}
            />
            <p className="text-edorble-100 font-bold text-lg">
              Code:
              {activeWorld.accessCode}
            </p>

            <div className="grid col-span-4 mb-5 mt-5">
              <h1 className="text-4xl text-edorble-300 font-bold w-full">
                Map
              </h1>
              <div className="grid  col-span-8">
                <MapSelector
                  maps={maps}
                  activeWorld={activeWorld}
                  updateWorld={updateWorld}
                />
              </div>
            </div>
          </h1>

          <div className="grid grid-cols-12 gap-2 p-5 border border-edorble-100 rounded">
            <div className="col-span-12 gap-2 justify-center">
              <p className="text-edorble-400 font-semibold text-2xl">
                Password
              </p>
              {activeWorld.enablePassword && (
                <Tooltip title="Disable Password">
                  <i
                    className="fa fa-toggle-on text-2xl text-edorble-400 cursor-pointer"
                    onClick={(ev) => updateEnablePassword(ev, false)}
                    role="presentation"
                  />
                </Tooltip>
              )}
              {!activeWorld.enablePassword && (
                <Tooltip title="Enable Password">
                  <i
                    className="fa fa-toggle-off text-2xl text-edorble-400 cursor-pointer"
                    onClick={(ev) => updateEnablePassword(ev, true)}
                    role="presentation"
                  />
                </Tooltip>
              )}
              <i
                onClick={() => setEnableEdit(!enableEdit)}
                className="fa fa-edit text-2xl text-edorble-400 pl-5 cursor-pointer"
                role="presentation"
              />
            </div>
            {enableEdit && (
              <div className="col-span-12 gap-2 justify-center">
                <form onSubmit={updatePassword}>
                  <Row type="flex" align="center" className="mt-5 w-full">
                    <Col span={24} className="mt-5">
                      <input
                        type="password"
                        value={password}
                        onChange={(ev) => setPassword(ev.currentTarget.value)}
                        required
                        className="border-2
                              border-edorble-200
                              hover:border-edorble-200
                              focus:border-edorble-200
                              w-full rounded"
                        placeholder="Password"
                      />
                    </Col>
                    <Col span={24} className="mt-5">
                      <input
                        type="password"
                        value={retypePassword}
                        onChange={(ev) => setRetypePassword(ev.currentTarget.value)}
                        required
                        className="border-2
                              border-edorble-200
                              hover:border-edorble-200
                              focus:border-edorble-200
                              w-full rounded"
                        placeholder="Retype Password"
                      />
                      {password !== retypePassword && (
                        <small className="text-red-500 font-bold">
                          Passwords don&apos;t match
                        </small>
                      )}
                    </Col>
                    <Col span={24} className="mt-5">
                      <Button
                        loading={false}
                        htmlType="submit"
                        disabled={password !== retypePassword}
                        className="border-0
                              bg-edorble-yellow-500
                              hover:bg-edorble-yellow-600
                              hover:text-black w-full
                              rounded font-bold"
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

WorldsSettings.propTypes = {
  activeWorld: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    accessCode: PropTypes.number,
    enablePassword: PropTypes.bool,
  }).isRequired,
  fetchWorlds: PropTypes.func.isRequired,
  updateWorld: PropTypes.func.isRequired,
  createWorld: PropTypes.func.isRequired,
  deleteWorld: PropTypes.func,
  setShowModal: PropTypes.func.isRequired,
  setDrawerTitle: PropTypes.func,
  maps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  password: PropTypes.string.isRequired,
  retypePassword: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  setRetypePassword: PropTypes.func.isRequired,
};
WorldsSettings.defaultProps = {
  setDrawerTitle: () => {},
  deleteWorld: () => {}
};
export default WorldsSettings;
