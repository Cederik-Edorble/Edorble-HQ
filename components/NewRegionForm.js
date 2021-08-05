import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import PropTypes from 'prop-types';

const NewRegionForm = ({
  activeMap, createRegion, activeRegion, updateRegion, deleteRegion
}) => {
  const [name, setName] = useState(activeRegion?.name ?? '');
  const create = async (ev) => {
    ev.preventDefault();
    createRegion({
      variables: {
        createRegionInput: {
          map: +activeMap.id,
          name,
        },
      },
    });
  };

  const update = async (ev) => {
    ev.preventDefault();
    updateRegion({
      variables: {
        updateRegionInput: {
          id: activeRegion.id,
          map: +activeMap.id,
          name,
        },
      },
    });
  };
  const remove = async (id) => {
    deleteRegion({
      variables: {
        id
      },
    });
  };
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <form onSubmit={Object.keys(activeRegion)?.length ? update : create}>
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
                    w-full
                    rounded"
                placeholder="Region Name"
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
                    rounded
                    font-bold"
              >
                Submit
              </Button>
            </Col>
            { activeRegion?.id
            && (
              <Col span={24} className="mt-5">
                <Button
                  className="border-0
                      ant-btn-danger
                      w-full rounded
                      font-bold"
                  onClick={() => remove(activeRegion.id)}
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
NewRegionForm.propTypes = {
  activeMap: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  createRegion: PropTypes.func,
  activeRegion: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  updateRegion: PropTypes.func,
  deleteRegion: PropTypes.func,

};
NewRegionForm.defaultProps = {
  activeRegion: {},
  updateRegion: () => {},
  deleteRegion: () => {},
  createRegion: () => {},
};
export default NewRegionForm;
