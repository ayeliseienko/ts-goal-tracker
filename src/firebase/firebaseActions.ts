import {
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  Firestore,
} from 'firebase/firestore';
import GoalInterface from '../goal.model';

export async function addGoal(
  db: Firestore,
  collectionName: string,
  docName: string,
  goalData: GoalInterface
) {
  const docRef = doc(db, collectionName, docName);

  await setDoc(docRef, goalData);
}

export async function deleteGoal(
  db: Firestore,
  collectionName: string,
  docName: string
) {
  const docRef = doc(db, collectionName, docName);

  await deleteDoc(docRef);
}

export async function changeMilestoneStatus(
  db: Firestore,
  collectionName: string,
  docName: string,
  updData: {
    completed: boolean;
    milestones: { id: string; title: string; completed: boolean }[];
  }
) {
  const docRef = doc(db, collectionName, docName);

  const { milestones } = updData;
  let { completed } = updData;

  if (
    milestones.filter((milestone) => milestone.completed === true).length ===
    milestones.length
  ) {
    completed = true;
  } else {
    completed = false;
  }

  await updateDoc(docRef, { completed, milestones });
}
