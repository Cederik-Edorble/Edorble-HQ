import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import PropTypes from 'prop-types';

const NewScreenForm = ({
  activeRegion, createScreen, updateScreen, deleteScreen, activeScreen, screenTypes,
}) => {
  const [name, setName] = useState(activeScreen?.name ?? '');
  const [type, setType] = useState(activeScreen?.InteractiveContentHolderType ?? 'Screen');
  
  const create = (e) => {
    e.preventDefault();
    createScreen({
      variables: {
        InteractiveContentHolderType: type,
        RegionID: activeRegion.id,
        ResourceID: 30,
        name,
      }
    });
  };

  const update = async (ev) => {
    ev.preventDefault();
    updateScreen({
      variables: {
        _eq1: activeScreen.id, // id
        _eq: activeRegion.id, // RegionID
        InteractiveContentHolderType: type,
        name,
      }
    });
  };
  
  const remove = async (id) => {
    deleteScreen({
      variables: {
        _eq: activeRegion.id, // RegionID
        _eq1: id, // id

      },
    });
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <form onSubmit={activeScreen ? update : create}>
          <Row type="flex" align="center" className="mt-5">
            <Col span={24}>
              <input
                type="text"
                onChange={(ev) => {
                  setName(ev.currentTarget.value);
                }}
                value={name}
                required
                className="border-2
                    border-edorble-200
                    hover:border-edorble-200
                    focus:border-edorble-200
                    w-full rounded"
                placeholder="Screen Name"
              />
            </Col>
            <Col span={24} className="mt-5">
              <div>
                <select
                  className="border-2
                    border-edorble-200
                    hover:border-edorble-200
                    focus:border-edorble-200
                    w-full rounded"
                  style={{ width: '100%' }}
                  required
                  value={type}
                  placeholder="Content type"
                  onChange={(ev) => {
                    setType(ev.currentTarget.value);
                  }}
                >
                  {screenTypes && screenTypes?.map((item, index) => (
                    <option
                      value={item.InteractiveContentHolderType}
                      key={[item.InteractiveContentHolderType, index].join('_')}
                    >
                      {item.InteractiveContentHolderType}
                    </option>
                  ))}
                </select>
              </div>

            </Col>
            <Col span={24} className="mt-5">
              <Button
                loading={false}
                htmlType="submit"
                className="border-0
                    bg-edorble-yellow-500
                    hover:bg-edorble-yellow-600
                    hover:text-black
                    w-full rounded
                    font-bold"
              >
                Submit
              </Button>
            </Col>
            { activeScreen?.id
            && (
              <Col span={24} className="mt-5">
                <Button
                  className="border-0
                      ant-btn-danger
                      w-full rounded
                      font-bold"
                  onClick={() => remove(activeScreen.id)}
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
NewScreenForm.propTypes = {
  activeRegion: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  activeScreen: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    InteractiveContentHolderType: PropTypes.string
  }),
  createScreen: PropTypes.func,
  updateScreen: PropTypes.func,
  deleteScreen: PropTypes.func,
  screenTypes: PropTypes.arrayOf(PropTypes.shape({}))
};
NewScreenForm.defaultProps = {
  activeScreen: {},
  createScreen: () => {},
  updateScreen: () => {},
  deleteScreen: () => {},
  screenTypes: [],
};
export default NewScreenForm;
