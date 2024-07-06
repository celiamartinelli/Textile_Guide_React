import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
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

interface Icone {
  data: { attributes: { url: string } }[];
}
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
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        handleSearch();
      } else {
        setFabrics([]);
      }
    }, 300); // délai de 300ms avant d'envoyer la requête

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

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
          // console.error('Expected an array for projects:', data);
          return;
        }
        // console.log('projects:', data.data);
        setProjects(data.data);
      })
      .catch((err) => {
        console.error('Error fetching projects:', err);
      });
  };

  const handleSearch = () => {
    console.log('search:', search);
    fetch(
      `http://localhost:1337/api/fabrics?populate[0]=picture_fabric&populate[1]=washes&populate[2]=washes.icone&filters[name][$containsi]=${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data.data)) {
          // console.error('Expected an array for fabrics:', data);
          return;
        }
        // console.log('data:', data.data);
        data.data.forEach((fabric: Fabric) => {
          // console.log('Fabric:', fabric);
          fabric.attributes.washes?.data?.forEach((wash) => {
            // console.log('Wash:', wash);
            // console.log(
            //   'Icon URL:',
            //   wash.attributes.icone?.data?.[0]?.attributes?.url
            // );
          });
        });
        setFabrics(data.data);
        fetchProjects(data.data.map((fabric: Fabric) => fabric.id));
      })
      .catch((err) => {
        console.error('err:', err);
      });
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col h-screen text-white">
        <div className="flex flex-col justify-center items-center pt-12 mt-36">
          <h1 className="mb-3">Tissus:</h1>
          <div className="border-2 rounded-lg ">
            <input
              className=" rounded-md p-2 m-2 bg-white text-brown"
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                // console.log('Search value:', e.target.value);
              }}
            />
            <button
              className="bg-cream p-2 rounded-md text-brown mr-2"
              type="button"
              onClick={handleSearch}
              aria-label="Rechercher"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </div>
        <div>
          <ul className="flex flex-row flex-wrap justify-center">
            {fabrics.map((fabric: Fabric) => (
              <li key={fabric.id}>
                <Link
                  to={`/fabrics/${fabric.id}`}
                  className="flex flex-col justify-center items-center border rounded-lg p-4 shadow-lg m-3 bg-sage"
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
                  {/* {fabric.attributes.washes?.data?.map((wash) => (
                  <div key={wash.id} className="bg-brown w-20 h-20">
                    <p className="bg-gray-200">{wash.attributes.description}</p>
                    {wash.attributes.icone?.data?.[0] && (
                      <img
                        src={`http://localhost:1337${wash.attributes.icone.data[0]?.attributes.url}`}
                        alt={wash.attributes.wash_name}
                        className="w-10 h-10"
                      />
                    )}
                  </div>
                ))} */}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FabricScreen;
