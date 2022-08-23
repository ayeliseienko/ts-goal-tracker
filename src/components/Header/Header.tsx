import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightFromBracket,
  faSun,
  faMoon,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

import { auth } from '../../firebase/firebaseConfig';

import User from './components/User/User';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import { HOME } from '../../pages/routes';

interface HeaderInterface {
  onSearchChange: (arg: string) => void;
  searchQuery: string;
}

export default function Header({
  onSearchChange,
  searchQuery,
}: HeaderInterface): JSX.Element {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const location = useLocation();

  console.log();

  const [theme, setTheme] = useState(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return 'dark';
    } else {
      return 'light';
    }
  });

  const [searchVisible, setSearchVisible] = useState(false);

  const themeChangeHandler = useCallback(() => {
    document.querySelector('html')!.classList.toggle('dark');

    setTheme((prevState) => {
      if (prevState === 'dark') {
        return 'light';
      } else {
        return 'dark';
      }
    });
  }, []);

  const searchVisibilityHandler = useCallback(() => {
    onSearchChange('');

    setSearchVisible((prevState) => {
      return !prevState;
    });
  }, [onSearchChange]);

  const logOutHandler = useCallback(() => {
    signOut(auth)
      .then(() => navigate(HOME))
      .catch((error) => console.log(error));
  }, [navigate]);

  return (
    <header className='bg-white drop-shadow-md dark:bg-darkModeLightBlack p-5'>
      <div className='flex justify-end items-center gap-5 md:gap-10'>
        <User photoURL={user!.photoURL!} className='mr-auto' />

        {location.pathname === '/goals' && (
          <Button onClick={searchVisibilityHandler} className='btn-grey'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        )}

        <Button onClick={themeChangeHandler} className='btn-grey'>
          {theme === 'light' ? (
            <FontAwesomeIcon icon={faSun} />
          ) : (
            <FontAwesomeIcon icon={faMoon} />
          )}
        </Button>

        <Button onClick={logOutHandler} className='btn-grey'>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </Button>
      </div>
      {searchVisible && (
        <Input
          label={{ isVisible: false, title: 'Search' }}
          input={{
            id: 'searchQuery',
            type: 'search',
            placeholder: 'Quick search...',
            onChange: (event) => {
              onSearchChange(event.target.value);
            },
            value: searchQuery,
          }}
          className='mt-5'
        />
      )}
    </header>
  );
}
