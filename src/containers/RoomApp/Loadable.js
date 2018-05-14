import Loadable from 'react-loadable';

import LoadingIndicator from "../../components/LoadingIndicator/index";

export default Loadable({
  loader: () => import('./index'),
  loading: LoadingIndicator,
});
