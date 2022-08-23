interface ProgressBarInterface {
  milestones: { id: string; title: string; completed: boolean }[];
}

function defineBgColor(percentage: number) {
  if (percentage <= 45) {
    return 'bg-lightRed';
  }
  if (percentage > 45 && percentage < 90) {
    return 'bg-yellow';
  }

  return 'bg-green';
}

export default function ProgressBar({
  milestones,
}: ProgressBarInterface): JSX.Element {
  const allMilestones = milestones.length;

  const completedMilestones = milestones.filter(
    (milestone) => milestone.completed === true
  ).length;

  const completedPercentage = Math.ceil(
    (completedMilestones / allMilestones) * 100
  );

  return (
    <div
      className={`${defineBgColor(
        completedPercentage
      )} rounded-b-lg py-1 text-center transition-all ease-in-out duration-200 text-white dark:text-darkModeBlack`}
    >{`${completedPercentage} %`}</div>
  );
}
