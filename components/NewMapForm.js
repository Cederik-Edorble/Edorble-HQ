import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import PropTypes from 'prop-types';

const NewMapForm = ({
  createMap, activeMap, updateMap, deleteMap
}) => {
  const [name, setName] = useState(activeMap.name ?? '');
  const [fileName, setFileName] = useState(activeMap.fileName ?? '');
  const [windowsLink, setWindowsLink] = useState(activeMap.windowsLink ?? '');
  const [macLink, setMacLink] = useState(activeMap.macLink ?? '');
  const [version, setVersion] = useState(activeMap.version ?? '');
  const ownerId = +localStorage.getItem('userId');
  const create = async (ev) => {
    ev.preventDefault();
    createMap({
      variables: {
        map: {
          name,
          user: ownerId,
          fileName,
          windowsLink,
          macLink,
          version
        }
      }
    });
  };

  const update = async (ev) => {
    ev.preventDefault();
    updateMap({
      variables: {
        map: {
          name,
          id: activeMap.id,
          user: ownerId,
          fileName,
          windowsLink,
          macLink,
          version
        }
      }
    });
  };
  const remove = async (id) => {
    deleteMap({
      variables: {
        id
      },
    });
  };
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <form onSubmit={Object.keys(activeMap)?.length ? update : create}>
          <Row type="flex" align="center" className="mt-5">
            <Col span={24} className="mt-5">
              <input
                type="text"
                onChange={(ev) => setName(ev.currentTarget.value)}
                value={name}
                required
                className="border-2
                  border-edorble-200
                  hover:border-edorble-200
                  focus:border-edorble-200
                  w-full
                  rounded"
                placeholder="Map Name"
              />
            </Col>
            <Col span={24} className="mt-5">
              <input
                type="text"
                onChange={(ev) => setFileName(ev.currentTarget.value)}
                value={fileName}
                required
                className="border-2
                  border-edorble-200
                  hover:border-edorble-200
                  focus:border-edorble-200
                  w-full
                  rounded"
                placeholder="Map file name"
              />
            </Col>
            <Col span={24} className="mt-5">
              <input
                type="text"
                onChange={(ev) => setWindowsLink(ev.currentTarget.value)}
                value={windowsLink}
                required
                className="border-2
                  border-edorble-200
                  hover:border-edorble-200
                  focus:border-edorble-200
                  w-full
                  rounded"
                placeholder="Map windows link"
              />
            </Col>
            <Col span={24} className="mt-5">
              <input
                type="text"
                onChange={(ev) => setMacLink(ev.currentTarget.value)}
                value={macLink}
                required
                className="border-2
                  border-edorble-200
                  hover:border-edorble-200
                  focus:border-edorble-200
                  w-full
                  rounded"
                placeholder="Map mac link"
              />
            </Col>
            <Col span={24} className="mt-5">
              <input
                type="text"
                onChange={(ev) => setVersion(ev.currentTarget.value)}
                value={version}
                required
                className="border-2
                  border-edorble-200
                  hover:border-edorble-200
                  focus:border-edorble-200
                  w-full
                  rounded"
                placeholder="Map version"
              />
            </Col>
            <Col span={24} className="mt-5">
              <Button
                loading={false}
                htmlType="submit"
                className="border-0
                  bg-edorble-yellow-500
                  hover:bg-edorble-yellow-600
                  hover:text-black
                  w-full
                  rounded font-bold"
              >
                Submit
              </Button>
            </Col>
            { activeMap?.id
            && (
              <Col span={24} className="mt-5">
                <Button
                  className="border-0
                      ant-btn-danger
                      w-full rounded
                      font-bold"
                  onClick={() => remove(activeMap.id)}
                >
                  Delete
                </Button>
              </Col>
            )}
          </Row>
        </form>
      </div>
    </div>
  );
};

NewMapForm.propTypes = {
  activeMap: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    fileName: PropTypes.string,
    windowsLink: PropTypes.string,
    macLink: PropTypes.string,
    version: PropTypes.string
  }),
  createMap: PropTypes.func,
  updateMap: PropTypes.func,
  deleteMap: PropTypes.func,
};

NewMapForm.defaultProps = {
  activeMap: {},
  deleteMap: () => {},
  createMap: () => {},
  updateMap: null
};

export default NewMapForm;
