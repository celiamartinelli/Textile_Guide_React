import Header from '@/components/Header/Header';
import { useNavigate } from 'react-router-dom';

import { FaScroll } from 'react-icons/fa';
import { FaShirt } from 'react-icons/fa6';
import { IconBase } from 'react-icons';

export default function HomeScreen() {
  const navigate = useNavigate();
  return (
    <div className="text-white">
      <Header />
      <div className="flex flex-col justify-center items-center h-screen">
        <h1> Bienvenue dans le Guide des Textiles</h1>
        <h2>
          Ici tu peux trouver quel textile conviens le mieux selon le projet que
          tu souhaite realiser en couture
        </h2>
        <div className="flex flex-col justify-center items-center">
          <h3>RECHERCHÉ PAR:</h3>
          <div className="flex flex-row">
            <div
              className="flex flex-col justify-center items-center border rounded-md p-5"
              onClick={() => {
                navigate('/fabrics');
              }}
            >
              <h4>Tissus</h4>
              <FaScroll />
            </div>
            <div
              className="flex flex-col justify-center items-center border rounded-md p-5"
              onClick={() => {
                navigate('/products');
              }}
            >
              <h4>Projets</h4>
              <img
                className="w-32"
                src="../../../assets/search_by_project.png"
                alt="search by project"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
