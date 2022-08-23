import { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../../firebase/firebaseConfig';
import {
  collection,
  query,
  orderBy,
  CollectionReference,
} from 'firebase/firestore';

import { auth } from '../../firebase/firebaseConfig';

import GoalsList from './components/GoalsList/GoalsList';
import Tabs from '../../common/Tabs/Tabs';
import Spinner from '../../common/Spinner/Spinner';

import GoalInterface from '../../goal.model';

function filteringFunc(goal: GoalInterface, filterParam: string) {
  if (filterParam === 'completed') {
    return goal.completed === true;
  }

  if (filterParam === 'uncompleted') {
    return goal.completed === false;
  }
  return goal;
}

interface GoalsInterface {
  searchQuery: string;
}

export default function Goals({ searchQuery }: GoalsInterface): JSX.Element {
  const collectionRef = collection(
    firestore,
    auth.currentUser!.uid
  ) as CollectionReference<GoalInterface>;
  const goalsQuery = query(collectionRef, orderBy('completed', 'asc'));

  const [goals, loading] = useCollectionData(goalsQuery);

  const [filterParam, setFilterParam] = useState('');

  return (
    <section className='mt-4 w-11/12 mx-auto lg:w-1/2'>
      <Tabs
        items={[
          { title: 'All', param: '' },
          { title: 'Completed', param: 'completed' },
          { title: 'In progress', param: 'uncompleted' },
        ]}
        filterParam={filterParam}
        onFilterChange={setFilterParam}
      />
      {goals && (
        <GoalsList
          goalsList={goals
            .filter((goal) => filteringFunc(goal, filterParam))
            .filter((goal) =>
              goal.title.toLowerCase().includes(searchQuery.toLowerCase())
            )}
          filterParam={filterParam}
        />
      )}
      {loading && <Spinner className='text-center mt-28' />}
    </section>
  );
}
