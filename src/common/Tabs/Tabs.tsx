interface TabsInterface {
  items: { title: string; param: string }[];
  filterParam: string;
  onFilterChange: (newFilterParam: string) => void;
}

export default function Tabs({
  items,
  filterParam,
  onFilterChange,
}: TabsInterface): JSX.Element {
  function tabClickHandler(newFilterParam: string) {
    onFilterChange(newFilterParam);
  }

  return (
    <div className='w-full bg-white  dark:text-white rounded-md drop-shadow-md dark:bg-darkModeLightBlack'>
      <ul className='list-none flex justify-around items-center divide-x-2 divide-grey dark:divide-darkModeBlack'>
        {items.map((item, index, itemsArray) => (
          <li
            key={item.title}
            className={`flex-1 text-center py-4 hover:bg-lightBlue hover:text-black cursor-pointer
            ${index === 0 ? 'rounded-l-md' : ''}
            ${index === itemsArray.length - 1 ? 'rounded-r-md' : ''}
            ${item.param === filterParam ? 'bg-blue text-white' : ''}`}
            onClick={() => {
              tabClickHandler(item.param);
            }}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
