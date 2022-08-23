import { Fragment } from 'react';

import Header from '../components/Header/Header';
import GoalForm from '../components/GoalForm/GoalForm';

export default function AddGoal(): JSX.Element {
  return (
    <Fragment>
      <Header onSearchChange={() => {}} searchQuery={''} />
      <GoalForm />
    </Fragment>
  );
}
