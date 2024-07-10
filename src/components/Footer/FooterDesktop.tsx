import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';
import { TbApi } from 'react-icons/tb';
import { useDarkMode } from '../App/DarkModeContext';

export default function FooterDesktop() {
  const { isDarkMode, setIsDarkMode } = useDarkMode();
  return (
    <div className="bg-lightBackground flex justify-between p-5 fixed bottom-0 left-0 right-0 text-white dark:bg-darkBackground">
      <div>
        <Link to="/notFound">
          <TbApi />
        </Link>
      </div>
      <div>
        <p>✂️ &copy; 2024 Textile-Guide. Tous droits réservés.🪡</p>
      </div>
      <div>
        <ul className="flex">
          <li className="px-2">
            <Link to="https://github.com/celiamartinelli">
              <FaGithub />
            </Link>
          </li>
          <li className="px-2">
            <Link to="https://www.linkedin.com/in/celiamartinelli/">
              <FaLinkedin />
            </Link>
          </li>
          <li className="px-2">
            <Link
              to={
                {
                  pathname: '/about',
                  state: { scrollToContact: true },
                } as any
              }
            >
              <IoMail />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
