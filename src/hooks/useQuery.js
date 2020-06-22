const { useLocation } = require('react-router');

export { useLocation } from 'react-router';

const useQuery = () => new URLSearchParams(useLocation().search);

export default useQuery;
