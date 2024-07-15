import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

type Wash = {
  id: number;
  attributes: {
    wash_name: string;
    description: string;
    icone: {
      data: { attributes: { url: string } }[];
    };
  };
};

type Fabric = {
  id: number;
  attributes: {
    name: string;
    description: string;
    picture_fabric: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    washes: {
      data: Wash[];
    };
  };
};

interface Project {
  id: number;
  name: string;
}

const FabricScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [allFabrics, setAllFabrics] = useState<Fabric[]>([]);
  const [filteredFabrics, setFilteredFabrics] = useState<Fabric[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Récupère tous les tissus lorsque le composant est monté
    fetch(
      `http://localhost:1337/api/fabrics?populate[0]=picture_fabric&populate[1]=washes&populate[2]=washes.icone`
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setAllFabrics(data.data);
          setFilteredFabrics(data.data); // Affiche tous les tissus initialement
          fetchProjects(data.data.map((fabric: Fabric) => fabric.id));
        } else {
          console.error('Expected an array for fabrics:', data);
        }
      })
      .catch((err) => {
        console.error('Error fetching fabrics:', err);
      });
  }, []);

  useEffect(() => {
    // Affine les résultats de la recherche
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const results = allFabrics.filter((fabric) =>
          fabric.attributes.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredFabrics(results);
      } else {
        setFilteredFabrics(allFabrics);
      }
    }, 300); // délai de 300ms avant d'affiner la recherche

    return () => clearTimeout(delayDebounceFn);
  }, [search, allFabrics]);

  const fetchProjects = (fabricIds: number[]) => {
    fetch(`http://localhost:1337/api/products?fabricIds=${fabricIds.join(',')}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          console.error('API error:', data.error);
          return;
        }
        if (!data || !Array.isArray(data.data)) {
          console.error('Expected an array for projects:', data);
          return;
        }
        setProjects(data.data);
      })
      .catch((err) => {
        console.error('Error fetching projects:', err);
      });
  };

  return (
    <div className="pb-20">
      <div className="flex flex-col min-h-screen text-white">
        <div className="flex flex-col justify-center items-center pt-12 mt-36">
          <h1 className="mb-3">Tissus:</h1>
          <div className="border-2 rounded-lg ">
            <input
              className="rounded-md p-2 m-2 bg-white text-brown"
              type="text"
              placeholder="Rechercher"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="bg-cream p-2 rounded-md text-brown mr-2"
              type="button"
              onClick={() => setSearch(search)}
              aria-label="Rechercher"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </div>
        <div>
          <ul className="flex flex-row flex-wrap justify-center">
            {filteredFabrics.map((fabric: Fabric) => (
              <li key={fabric.id}>
                <Link
                  to={`/fabrics/${fabric.id}`}
                  className="flex flex-col justify-center items-center border rounded-lg p-4 shadow-lg m-3 bg-lightBackground hover:bg-lightBackgroundLightHover dark:bg-darkBackground hover:dark:bg-darkBackgroundLightHover"
                >
                  {fabric.attributes.picture_fabric?.data && (
                    <img
                      src={`http://localhost:1337${fabric.attributes.picture_fabric.data.attributes.url}`}
                      alt={fabric.attributes.name}
                      className="w-20 h-20 rounded-lg"
                    />
                  )}
                  <p className="justify-center items-center pt-2">
                    {fabric.attributes.name}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FabricScreen;
