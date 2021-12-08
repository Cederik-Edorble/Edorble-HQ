import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import PropTypes from 'prop-types';

const AddContentInWorldForm = ({
  activeContent,
  listContents,
  listHolders,
  worldId,
  mapId,
  createContentMapping,
  updateContentMapping,
  deleteConentMapping,
}) => {
  const [holder, setHolder] = useState();
  const [selectedContent, setSelectedContent] = useState();

  const create = (e) => {
    e.preventDefault();
  };

  const update = async (ev) => {
    ev.preventDefault();
  };
  
  const remove = async (id) => {
    
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <form onSubmit={activeContent ? update : create}>
          <Row type="flex" align="center" className="mt-5">
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
                  value={holder}
                  placeholder="Content type"
                  onChange={(ev) => {
                    setHolder(ev.currentTarget.value);
                  }}
                >
                  {listHolders && listHolders?.map((item, index) => (
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
              <div>
                <select
                  className="border-2
                    border-edorble-200
                    hover:border-edorble-200
                    focus:border-edorble-200
                    w-full rounded"
                  style={{ width: '100%' }}
                  required
                  value={selectedContent}
                  placeholder="Content type"
                  onChange={(ev) => {
                    setSelectedContent(ev.currentTarget.value);
                  }}
                >
                  {listContents && listContents?.map((item, index) => (
                    <option
                      value={item.title}
                      key={[item.title, index].join('_')}
                    >
                      {item.title}
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
            { activeContent?.id
            && (
              <Col span={24} className="mt-5">
                <Button
                  className="border-0
                      ant-btn-danger
                      w-full rounded
                      font-bold"
                  onClick={() => remove(activeContent.id)}
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

AddContentInWorldForm.propTypes = {
  activeContent: PropTypes.shape({
    id: PropTypes.number,
  }),
  listContents: PropTypes.arrayOf(PropTypes.shape({})),
  listHolders: PropTypes.arrayOf(PropTypes.shape({})),
  worldId: PropTypes.number,
  mapId: PropTypes.number,
};

AddContentInWorldForm.defaultProps = {
  activeContent: {},
  listContents: [],
  listHolders: [],
  worldId: 0,
  mapId: 0,
};

export default AddContentInWorldForm;
