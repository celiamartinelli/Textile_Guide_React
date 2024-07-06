import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faShirt } from '@fortawesome/free-solid-svg-icons';

export default function FooterPhone() {
  return (
    <div>
      <nav className="fixed bottom-0 left-0 right-0">
        <ul className="flex flex-row w-screen h-16 justify-around text-white text-xl font-bold bg-sage items-center">
          <li>
            <Link to="/products">
              <img
                className="size-8"
                src="../../../assets/search_by_project.png"
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
                src="../../../assets/search_by_fabric.png"
                alt="search by project"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
