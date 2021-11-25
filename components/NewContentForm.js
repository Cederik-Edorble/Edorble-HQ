import React, { useState } from 'react';
import {
  Button, Col, Row
} from 'antd';
import PropTypes from 'prop-types';

const NewContentForm = ({
  content, selectedScreen, createContent, deleteContent, activeWorld
}) => {
  const [title, setTitle] = useState(content?.title ?? '');
  const [url, setUrl] = useState(content?.url ?? '');
  const [description, setDescription] = useState(content?.description ?? '');
  const [type, setType] = useState(content?.type ?? '');

  const submitForm = (e) => {
    e.preventDefault();
    createContent({
      variables: {
        contentInput: {
          screen: +selectedScreen.id,
          id: content?.id ?? null,
          world: activeWorld?.id ?? null,
          title,
          url,
          description,
          type
        },
      },
    });
  };
  const deleteHandler = (id) => {
    deleteContent({
      variables: {
        id
      }
    });
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
                  <option value="image">Image</option>
                  <option value="video">Video</option>
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
            { content?.id 
              && (
              <Col span={24} className="mt-5">
                <Button
                  className="border-0
                      ant-btn-danger
                      w-full rounded
                      font-bold"
                  onClick={() => deleteHandler(content.id)}
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
NewContentForm.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.number,
    world: PropTypes.number,
  }),
  activeWorld: PropTypes.shape({
    id: PropTypes.number
  }).isRequired,
  selectedScreen: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    region: PropTypes.number
  }).isRequired,
  createContent: PropTypes.func.isRequired,
  deleteContent: PropTypes.func.isRequired
};
NewContentForm.defaultProps = {
  content: null
};
export default NewContentForm;
