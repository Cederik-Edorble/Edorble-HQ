import PropTypes from 'prop-types';
import MapSelector from './MapSelector';
import ContentSection from './ContentSection';

const ContentScreen = ({
  activeWorld,
  contentWorld,
  addContent,
  selectedContents,
  contentHandler,
  removeContent,
  maps,
  updateWorld 
}) => {
  return (
    <>
      <div className="col-span-12 border border-gray-200 bg-gray-100 p-2 rounded">
        <div className="grid col-span-4 mb-5 mt-5">
          <h1 className="text-4xl text-edorble-300 font-bold w-full">
            Map
          </h1>
          <div className="grid  col-span-8">
            <MapSelector
              maps={maps}
              activeWorld={activeWorld}
              updateWorld={updateWorld}
            />
          </div>
        </div>
        <div className="grid col-span-4 mb-5 mt-5">
          <h1 className="text-4xl text-edorble-300 font-bold w-full">
            Content
          </h1>
          <div className="grid  col-span-8">
            <ContentSection
              listContent={contentWorld}
              addContent={addContent} 
              selectedContents={selectedContents}
              contentHandler={contentHandler}
              removeContent={removeContent}
            />
          </div>
        </div>
      </div>
    </>
  );
};
ContentScreen.propTypes = {
  activeWorld: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    accessCode: PropTypes.number,
    enablePassword: PropTypes.bool,
    map: PropTypes.number,
  }),
  contentWorld: PropTypes.arrayOf(PropTypes.shape({})),
  addContent: PropTypes.func,
  selectedContents: PropTypes.arrayOf(PropTypes.shape({})),
  contentHandler: PropTypes.func,
  removeContent: PropTypes.func,
  maps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  updateWorld: PropTypes.func.isRequired, 
};

ContentScreen.defaultProps = {
  activeWorld: null,
  contentWorld: [],
  selectedContents: [],
  addContent: () => {},
  contentHandler: () => {},
  removeContent: () => {},
};

export default ContentScreen;
