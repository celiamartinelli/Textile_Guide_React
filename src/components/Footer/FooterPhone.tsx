import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faShirt } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from '../App/DarkModeContext';

export default function FooterPhone() {
  const { isDarkMode, setIsDarkMode } = useDarkMode();
  const searchByProjectImg = isDarkMode
    ? '../../../assets/search_by_project_dark.png'
    : '../../../assets/search_by_project.png';
  const searchByFabricImg = isDarkMode
    ? '../../../assets/search_by_fabric_dark.png'
    : '../../../assets/search_by_fabric.png';
  return (
    <div>
      <nav className="fixed bottom-0 left-0 right-0">
        <ul className="flex flex-row w-screen h-16 justify-around text-white text-xl font-bold bg-lightBackground dark:bg-darkPruneBG items-center transition-colors duration-500">
          <li>
            <Link to="/products">
              <img
                className="size-8"
                src={searchByProjectImg}
                alt="search by project"
              />
            </Link>
          </li>
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faHouse} />
            </Link>
          </li>
          <li>
            <Link to="/fabrics">
              <img
                className="size-8"
                src={searchByFabricImg}
                alt="search by project"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
