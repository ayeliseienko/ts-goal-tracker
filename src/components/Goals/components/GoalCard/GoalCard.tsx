import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHourglass,
  faCircleCheck,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import { firestore, auth } from '../../../../firebase/firebaseConfig';
import {
  deleteGoal,
  changeMilestoneStatus,
} from '../../../../firebase/firebaseActions';

import ProgressBar from '../ProgressBar/ProgressBar';
import Button from '../../../../common/Button/Button';

import GoalInterface from '../../../../goal.model';
import { Timestamp } from 'firebase/firestore';

function isExpired(deadline: Timestamp, completed: boolean) {
  const now = new Date();

  if (deadline.toDate().getTime() - now.getTime() < 0 && !completed) {
    return true;
  }

  return false;
}

export default function GoalCard({
  id,
  title,
  creationDate,
  deadline,
  completed,
  milestones,
}: GoalInterface): JSX.Element {
  function removeGoalHandler(goalId: string) {
    deleteGoal(firestore, auth.currentUser!.uid, goalId);
  }

  function changeMilestoneHandler(updMilestone: {
    id: string;
    value: boolean;
  }) {
    const specificMilestone = milestones.find(
      (milestone) => milestone.id === updMilestone.id
    );

    specificMilestone!.completed = updMilestone.value;

    changeMilestoneStatus(firestore, auth.currentUser!.uid, id, {
      completed,
      milestones,
    });
  }

  return (
    <div
      className={`mb-4 bg-white rounded-lg drop-shadow-md box-border
       dark:bg-darkModeLightBlack dark:text-lightGrey`}
    >
      <div className='flex justify-between items-start p-4'>
        <div>
          <div className='flex justify-start items-center gap-2'>
            {completed ? (
              <FontAwesomeIcon className='text-green' icon={faCircleCheck} />
            ) : (
              <FontAwesomeIcon
                className={`${
                  isExpired(deadline, completed)
                    ? 'text-darkRed'
                    : 'text-yellow'
                }`}
                icon={faHourglass}
              />
            )}
            <h1
              className={`${
                isExpired(deadline, completed) ? 'text-darkRed' : ''
              } text-xl`}
            >
              {title}
            </h1>
          </div>

          {!completed && (
            <p
              className={`${
                isExpired(deadline, completed) ? 'text-darkRed' : ''
              } text-xs`}
            >{`Deadline: ${deadline.toDate().toLocaleDateString()}`}</p>
          )}

          {!completed && (
            <ul className='list-none ml-5'>
              {milestones.map((milestone) => (
                <li
                  key={milestone.id}
                  className={`${
                    milestone.completed ? 'text-green line-through' : null
                  } mt-4 flex items-center justify-start gap-3`}
                >
                  <input
                    id={milestone.id}
                    type='checkbox'
                    defaultChecked={milestone.completed}
                    className='h-5 w-5 rounded-md focus:ring-green checked:text-green'
                    onClick={(event) => {
                      const target = event.target as HTMLInputElement;

                      changeMilestoneHandler({
                        value: target.checked,
                        id: milestone.id,
                      });
                    }}
                  />
                  {milestone.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className='flex flex-col justify-start items-center'>
          <Button
            className='text-darkRed hover: none'
            onClick={() => removeGoalHandler(id)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </Button>
        </div>
      </div>
      <ProgressBar milestones={milestones} />
    </div>
  );
}
