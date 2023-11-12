// A custom hook that builds on useLocation to parse
// the query string for you. see https://reacttraining.com/react-router/web/example/query-parameters
import { useLocation } from 'react-router-dom';
export function useQuery() {
  return new URLSearchParams(useLocation().search);
}
