import PropTypes from 'prop-types';

/** Reusable profile prop type definitions */
export const PublicProfileType = PropTypes.shape({
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  phoneNumber: PropTypes.string,
});
