import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import Input from './Input';
import styles from '../styles/NewMapForm.module.scss';

const NewMapForm = ({
  createMap, activeMap, deleteMap
}) => {
  const [fields, setFields] = useState({
    name: activeMap.name ?? '',
    fileName: '',
    windowsLink: '',
    macLink: '',
    version: '',
  });

  const create = async (ev) => {
    ev.preventDefault();
    createMap({
      variables: {
        object: fields
      }
    });
  };

  const update = async (ev) => {
    ev.preventDefault();
  };
  
  const remove = async (id) => {
    deleteMap({
      variables: {
        id
      },
    });
  };

  const fieldsHandler = (event) => {
    const { id, value } = event.target;
    setFields({ ...fields, [id]: value });
  };
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <form onSubmit={Object.keys(activeMap)?.length ? update : create}>
          <Row type="flex" align="center" className="mt-5">
            {Object.keys(fields).map((item, index) => (
              <div className={styles.inputBox} key={[index, item].join('_')}>
                <Input
                  className="border-2
                    border-edorble-200
                    hover:border-edorble-200
                    focus:border-edorble-200
                    w-full
                    rounded"
                  onChange={fieldsHandler}
                  placeholder={item}
                  value={fields[item]}
                  id={item}
                />
              </div>
            ))}
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
  deleteMap: PropTypes.func,
};

NewMapForm.defaultProps = {
  activeMap: {},
  deleteMap: () => {},
  createMap: () => {},
};

export default NewMapForm;
