import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';
import { TbApi } from 'react-icons/tb';
import { useDarkMode } from '../App/DarkModeContext';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function FooterDesktop() {
  const navigate = useNavigate();
  const { isDarkMode, setIsDarkMode } = useDarkMode();
  const { t } = useTranslation();

  const handleScrollToContact = () => {
    navigate('/about', { state: { scrollToContact: true } }); // Navigue avec l'état
  };

  return (
    <div className="bg-lightBackground flex justify-between p-5 fixed bottom-0 left-0 right-0 text-white dark:bg-darkPruneBG transition-colors duration-500">
      <div>
        <Link to="/notFound">
          <TbApi />
        </Link>
      </div>
      <div>
        <p>✂️ &copy; 2024 {t('footer.text')}🪡</p>
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
            <button
              aria-label="Contact"
              onClick={handleScrollToContact}
              type="button"
            >
              <IoMail />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
