import { useContext } from 'react';
import UserContext from './UserContext';
export default function FeedNav({ activeTag, handleNavigation, activeNav }) {
  let { user } = useContext(UserContext);
  return (
    <nav className="mt-8">
      <ul className="border-b flex">
        {user && (
          <li
            className={`text-gray-400 px-6 pb-2 cursor-pointer ${
              !activeTag && activeNav === 'your'
                ? 'border-b-2 border-green-500'
                : ''
            }`}
            onClick={() => {
              handleNavigation('your');
            }}
          >
            Your Feed
          </li>
        )}
        <li
          className={`text-gray-400 px-6 pb-2 cursor-pointer ${
            !activeTag && activeNav === 'global'
              ? 'border-b-2 border-green-500'
              : ''
          }`}
          onClick={() => {
            handleNavigation('global');
          }}
        >
          Global Feed
        </li>
        {activeTag && (
          <li
            className={`text-gray-400 px-6 pb-2 cursor-pointer ${
              activeTag ? 'border-b-2 border-green-500' : ''
            }`}
          >
            {activeTag}
          </li>
        )}
      </ul>
    </nav>
  );
}
