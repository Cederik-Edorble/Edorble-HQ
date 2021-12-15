import React, { useState, useEffect } from 'react';
import {
  Button, Col, Row
} from 'antd';
import PropTypes from 'prop-types';

const NewContentForm = ({
  content, createContent, contentType, updateContentItem,
}) => {
  const [url, setUrl] = useState(content?.url ?? '');
  const [title, setTitle] = useState(content?.title ?? '');
  const [description, setDescription] = useState(content?.description ?? '');
  const [type, setType] = useState('Image');
  const [listTypes, setListTypes] = useState([]);

  useEffect(() => {
    if (content?.ContentType) {
      setType(content.ContentType);
    }
  }, [content]);

  useEffect(() => {
    if (contentType) {
      setListTypes(contentType);
    }
  }, [contentType]);

  const submitForm = (e) => {
    e.preventDefault();
    if (content && content?.id) {
      updateContentItem({
        variables: {
          _eq: content?.id,
          ContentType: type,
          ResourceID: content?.ResourceID,
          description,
          title,
          url
        }
      });
    } else {
      createContent({
        variables: {
          description,
          title,
          url,
          ContentType: type,
          ResourceID: 10,
        },
      });
    }
  };
 
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <form onSubmit={submitForm}>
          <Row type="flex" align="center" className="mt-5">
            <Col span={24}>
              <input
                type="text"
                onChange={(ev) => {
                  setTitle(ev.currentTarget.value);
                }}
                value={title}
                required
                className="border-2
                    border-edorble-200
                    hover:border-edorble-200
                    focus:border-edorble-200
                    w-full rounded"
                placeholder="Content title"
              />
            </Col>
            <Col span={24} className="mt-5">
              <input
                type="text"
                onChange={(ev) => {
                  setDescription(ev.currentTarget.value);
                }}
                value={description}
                required
                className="border-2
                    border-edorble-200
                    hover:border-edorble-200
                    focus:border-edorble-200
                    w-full rounded"
                placeholder="Content description"
              />
            </Col>
            <Col span={24} className="mt-5">
              <input
                type="text"
                onChange={(ev) => {
                  setUrl(ev.currentTarget.value);
                }}
                value={url}
                required
                className="border-2
                    border-edorble-200
                    hover:border-edorble-200
                    focus:border-edorble-200
                    w-full rounded"
                placeholder="Content url"
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
                  {listTypes && listTypes?.map((item, index) => (
                    <option
                      value={item.ContentType}
                      key={[item.ContentType, index].join('_')}
                    >
                      {item.ContentType}
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
          </Row>
        </form>
      </div>
    </div>
  );
};
NewContentForm.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    ContentType: PropTypes.string,
    id: PropTypes.number,
    ResourceID: PropTypes.number,
  }),
  activeWorld: PropTypes.shape({
    id: PropTypes.number
  }),
  createContent: PropTypes.func,
  contentType: PropTypes.arrayOf(PropTypes.shape({})),
  updateContentItem: PropTypes.func,
};
NewContentForm.defaultProps = {
  content: null,
  contentType: [],
  activeWorld: {},
  createContent: () => {},
  updateContentItem: () => {},
};
export default NewContentForm;
