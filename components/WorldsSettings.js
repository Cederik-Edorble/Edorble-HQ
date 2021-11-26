import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Col, Row, Tooltip
} from 'antd';
import MapSelector from './MapSelector';
import Input from './Input';
import styles from '../styles/WorldSetting.module.scss';

const WorldsSettings = ({
  activeWorld,
  updateWorld,
  maps,
  password,
  retypePassword,
  setPassword,
  setRetypePassword,
  nameHandler,
  nameWorld,
  editName,
  editTitleHandler,
}) => {
  const [enableEdit, setEnableEdit] = useState(false);
 
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
          <div className={styles.container}>
            <div className={styles.containerTitle}>
              <h1 className="text-4xl text-edorble-300 font-bold w-full">
                {!editName ? activeWorld.name : (
                  <Input
                    onChange={nameHandler}
                    value={nameWorld}
                    styleType="worldSetting"
                  />
                )}
              </h1>
              <h1 className="text-4xl text-edorble-300 font-bold w-full">
                <i
                  className="fa fa-edit float-right text-2xl cursor-pointer mt-1"
                  role="presentation"
                  onClick={editTitleHandler}
                />
              </h1>
            </div>
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
          </div>
          <div className="grid grid-cols-12 gap-2 p-5 border border-edorble-100 rounded">
            <div className="col-span-12 gap-2 justify-center">
              <p className="text-edorble-400 font-semibold text-2xl">
                Password
              </p>
              {activeWorld.enablePassword && (
                <Tooltip title="Disable Password">
                  <i
                    className="fa fa-toggle-on text-2xl text-edorble-400 cursor-pointer"
                    role="presentation"
                  />
                </Tooltip>
              )}
              {!activeWorld.enablePassword && (
                <Tooltip title="Enable Password">
                  <i
                    className="fa fa-toggle-off text-2xl text-edorble-400 cursor-pointer"
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
                <form>
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
  updateWorld: PropTypes.func.isRequired,
  maps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  password: PropTypes.string.isRequired,
  retypePassword: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  setRetypePassword: PropTypes.func.isRequired,
  nameHandler: PropTypes.func,
  nameWorld: PropTypes.string,
  editName: PropTypes.bool,
  editTitleHandler: PropTypes.func,
};
WorldsSettings.defaultProps = {
  nameHandler: () => {},
  nameWorld: '',
  editName: false,
  editTitleHandler: () => {},
};
export default WorldsSettings;
