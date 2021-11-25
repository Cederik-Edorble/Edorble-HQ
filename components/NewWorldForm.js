import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import PropTypes from 'prop-types';

const NewWorldForm = ({
  activeWorld, createWorld, earthIcon
}) => {
  const [name, setName] = useState(activeWorld ? activeWorld.name : '');
  const [defaultLogo, setLogo] = useState(activeWorld ? activeWorld.defaultLogo : earthIcon);

  const create = async (ev) => {
    ev.preventDefault();
    await createWorld({
      variables: {
        objects: {
          Owner_UserID: +localStorage.getItem('userId'),
          name,
          defaultLogo: `${defaultLogo}`
        },
      },
    });
  };

  const update = async (ev) => {
    ev.preventDefault();
  };

  const remove = async () => {
    
  };
  
  const urlValidator = (val) => {
    const regex = new RegExp('^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)'
      + "+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$");
    return !!(val.match(regex));
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
                placeholder="World logo (url)"
              />
              {
                !urlValidator(defaultLogo)
                && defaultLogo
                && <small className="text-red-500 font-bold">Url don&apos;t match</small>
              }

            </Col>
            <Col span={24} className="mt-5">
              {
                urlValidator(defaultLogo)
                && defaultLogo && (
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
                )
              }
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
  createWorld: PropTypes.func.isRequired,
  earthIcon: PropTypes.string
};

NewWorldForm.defaultProps = {
  earthIcon: '',
  activeWorld: {},
};

export default NewWorldForm;
