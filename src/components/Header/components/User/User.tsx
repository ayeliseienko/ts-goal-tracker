interface UserInterface {
  photoURL: string;
  className?: string;
}

export default function User({
  photoURL,
  className = '',
}: UserInterface): JSX.Element {
  return (
    <div className={`${className} flex gap-2 justify-start items-center`}>
      <img
        src={photoURL}
        alt='avatar'
        className={`h-10 rounded-full w-auto border-[3px] 
        border-t-green border-r-yellow border-b-lightRed border-l-lightBlue`}
      />
    </div>
  );
}
