import { Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../firebase/firebaseConfig';

import { HOME } from '../../pages/routes';

interface AuthorizedRouteInterface {
  children: React.ReactNode;
}

export default function AuthorizedRoute({
  children,
}: AuthorizedRouteInterface): JSX.Element {
  const [user, loading] = useAuthState(auth);

  return (
    <Fragment>
      {!user && !loading && <Navigate to={HOME} replace={true} />}
      {user && !loading && children}
    </Fragment>
  );
}
