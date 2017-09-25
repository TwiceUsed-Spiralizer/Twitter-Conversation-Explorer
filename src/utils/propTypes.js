import PropTypes from 'prop-types';

const chartObject = {
  data: PropTypes.object.isRequired,
  icon: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  params: PropTypes.object,
  favourited: PropTypes.bool,
}

export {
  chartObject,
}
