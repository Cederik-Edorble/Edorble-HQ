import PropTypes from 'prop-types';

const ContentSelector = ({
  contents, onChange, selectedItem, id
}) => {
  return (
    <div className="grid col-span-12 md:col-span-8 gap-4 mt-5 md:mt-0">
      <select value={selectedItem} onChange={(event) => onChange(event, id)}>
        {contents.map((item, index) => (
          <option
            value={item.id}
            key={[index, item.title].join('_')}
          >
            {item.title}
          </option>
        ))}
      </select>
    </div>
  );
};
ContentSelector.propTypes = {
  contents: PropTypes.arrayOf(PropTypes.shape({})),
  onChange: PropTypes.func,
  selectedItem: PropTypes.number,
  id: PropTypes.number,
};

ContentSelector.defaultProps = {
  contents: [],
  onChange: () => {},
  selectedItem: 0,
  id: 0,
};

export default ContentSelector;
