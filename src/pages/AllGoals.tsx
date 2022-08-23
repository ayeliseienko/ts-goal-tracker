import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Header from '../components/Header/Header';
import Goals from '../components/Goals/Goals';
import Button from '../common/Button/Button';

import { ADD_GOAL } from './routes';

export default function AllGoals(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  return (
    <Fragment>
      <Header onSearchChange={setSearchQuery} searchQuery={searchQuery} />
      <Goals searchQuery={searchQuery} />
      <Button
        className='fixed bottom-8 right-8 drop-shadow-md btn-blue md:right-[10%]'
        onClick={() => {
          navigate(ADD_GOAL, { replace: true });
        }}
      >
        <FontAwesomeIcon className='mr-1' icon={faPlus} />
        {'Add new goal'}
      </Button>
    </Fragment>
  );
}
