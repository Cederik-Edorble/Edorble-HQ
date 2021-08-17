import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import PropTypes from 'prop-types';

const NewWorldForm = ({
  activeWorld, updateWorld, createWorld, deleteWorld
}) => {
  const [name, setName] = useState(activeWorld ? activeWorld.name : '');
  const [defaultLogo, setLogo] = useState(activeWorld ? activeWorld.defaultLogo : '');

  const create = async (ev) => {
    ev.preventDefault();
    await createWorld({
      variables: {
        createWorldInput: {
          user: +localStorage.getItem('userId'),
          name,
          defaultLogo,
        },
      },
    });
  };

  const update = async (ev) => {
    ev.preventDefault();
    await updateWorld({
      variables: {
        updateWorldInput: {
          user: +localStorage.getItem('userId'),
          id: +activeWorld.id,
          name,
          defaultLogo,
        },
      },
    });
  };

  const remove = async (id) => {
    deleteWorld({
      variables: {
        id
      },
    });
  };
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <form onSubmit={activeWorld ? update : create}>
          <Row type="flex" align="center" className="mt-5">
            <Col span={24}>
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
                placeholder="World Name"
              />
            </Col>
            <Col span={24} className="mt-5">
              <input
                type="text"
                onChange={(ev) => setLogo(ev.currentTarget.value)}
                value={defaultLogo}
                required
                className="border-2
                  border-edorble-200
                  hover:border-edorble-200
                  focus:border-edorble-200
                  w-full
                  rounded"
                placeholder="World logo"
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
            { activeWorld?.id
            && (
              <Col span={24} className="mt-5">
                <Button
                  className="border-0
                      ant-btn-danger
                      w-full rounded
                      font-bold"
                  onClick={() => remove(activeWorld.id)}
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

NewWorldForm.propTypes = {
  activeWorld: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    defaultLogo: PropTypes.string,
  }),
  updateWorld: PropTypes.func.isRequired,
  createWorld: PropTypes.func.isRequired,
  deleteWorld: PropTypes.func,
};

NewWorldForm.defaultProps = {
  activeWorld: {},
  deleteWorld: () => {}
};

export default NewWorldForm;
