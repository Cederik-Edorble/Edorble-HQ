import React, { useState, useEffect } from 'react';
import { Button, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import { findIndexItem } from '../Utils/helper';

const AddContentInWorldForm = ({
  activeContent,
  listContents,
  listRegions,
  worldId,
  mapId,
  createContentMapping,
  updateContentMapping,
  deleteContentMapping,
}) => {
  const [selectedRegion, setSelectedRegion] = useState(
    activeContent?.InteractiveContentHolder?.RegionID ?? listRegions[0]?.id
  );
  const [selectedContent, setSelectedContent] = useState(activeContent?.Content?.id ?? listContents[0]?.id);
  const [listHolders, setListHolders] = useState([]);
  const [holder, setHolder] = useState();
  
  useEffect(() => {
    const indexItem = findIndexItem(listRegions, 'id', Number(selectedRegion));
    const getArrayHolders = listRegions[indexItem].InteractiveContentHolders;
    setListHolders(getArrayHolders);
    if (activeContent?.InteractiveContentHolder?.id) {
      setHolder(activeContent?.InteractiveContentHolder?.id);
    } else {
      setHolder(getArrayHolders[0].id);
    }
  }, [selectedRegion]);
  
  const create = (e) => {
    e.preventDefault();
    createContentMapping({
      variables: {
        ContentID: Number(selectedContent),
        InteractiveContentHolderID: Number(holder),
        MapID: mapId,
        WorldID: worldId,
      }
    });
  };

  const update = (ev) => {
    ev.preventDefault();
    updateContentMapping({
      variables: {
        ContentID: Number(selectedContent),
        InteractiveContentHolderID: Number(holder),
        _eq: activeContent?.Content?.id, // ContentID
        _eq1: activeContent?.InteractiveContentHolder?.id, // InteractiveContentHolder
        _eq2: mapId, // MapID
        _eq3: worldId, // WorldID
      }
    });
  };
  
  const remove = () => {
    deleteContentMapping({
      variables: {
        _eq: activeContent?.Content?.id, // ContentID
        _eq1: activeContent?.InteractiveContentHolder?.id, // InteractiveContentHolderID
        _eq2: mapId, // MapID
        _eq3: worldId, // WorldID
      }
    });
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <form onSubmit={activeContent?.Content?.id ? update : create}>
          <Row type="flex" align="center" className="mt-5">
            {!activeContent?.Content?.id && (
            <Col span={24} className="mt-5">
              <div>
                <span>Select region</span>
                <select
                  className="border-2
                    border-edorble-200
                    hover:border-edorble-200
                    focus:border-edorble-200
                    w-full rounded"
                  style={{ width: '100%' }}
                  required
                  value={selectedRegion}
                  placeholder="Content type"
                  onChange={(ev) => {
                    setSelectedRegion(ev.currentTarget.value);
                  }}
                >
                  {listRegions && listRegions?.map((item, index) => (
                    <option
                      value={item.id}
                      key={[item.name, index].join('_')}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </Col>
            )}
            <Col span={24} className="mt-5">
              <div>
                <span>Select content holder</span>
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
                      value={item.id}
                      key={[item.name, index].join('_')}
                    >
                      { `${item.name} (${item.InteractiveContentHolderType})`}
                    </option>
                  ))}
                </select>
              </div>
            </Col>
            <Col span={24} className="mt-5">
              <div>
                <span>Select content</span>
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
                      value={item.id}
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
            { activeContent?.Content?.id
            && (
              <Col span={24} className="mt-5">
                <Button
                  className="border-0
                      ant-btn-danger
                      w-full rounded
                      font-bold"
                  onClick={remove}
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
    Content: PropTypes.shape({
      id: PropTypes.number,
    }),
    InteractiveContentHolder: PropTypes.shape({
      id: PropTypes.number,
      RegionID: PropTypes.number,
    })
  }),
  listContents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })),
  listRegions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    InteractiveContentHolders: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
    })),
  })),
  worldId: PropTypes.number,
  mapId: PropTypes.number,
  createContentMapping: PropTypes.func,
  deleteContentMapping: PropTypes.func,
  updateContentMapping: PropTypes.func,
};

AddContentInWorldForm.defaultProps = {
  activeContent: {},
  listContents: [],
  listRegions: [],
  worldId: 0,
  mapId: 0,
  createContentMapping: () => {},
  deleteContentMapping: () => {},
  updateContentMapping: () => {},
};

export default AddContentInWorldForm;
