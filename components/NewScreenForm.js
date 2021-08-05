import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import PropTypes from 'prop-types';

const NewScreenForm = ({
  activeRegion, createScreen, updateScreen, deleteScreen, activeScreen
}) => {
  const [name, setName] = useState(activeScreen?.name ?? '');
  const create = (e) => {
    e.preventDefault();
    createScreen({
      variables: {
        createScreenInput: {
          region: +activeRegion.id,
          name,
        },
      },
    });
  };
  const update = async (ev) => {
    ev.preventDefault();
    updateScreen({
      variables: {
        screenUpdateInput: {
          id: +activeScreen.id,
          region: +activeRegion.id,
          name,
        },
      },
    });
  };
  const remove = async (id) => {
    deleteScreen({
      variables: {
        id
      },
    });
  };
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <form onSubmit={Object.keys(activeScreen)?.length ? update : create}>
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
  }),
  createScreen: PropTypes.func,
  updateScreen: PropTypes.func,
  deleteScreen: PropTypes.func,
};
NewScreenForm.defaultProps = {
  activeScreen: {},
  createScreen: () => {},
  updateScreen: () => {},
  deleteScreen: () => {},
};
export default NewScreenForm;
