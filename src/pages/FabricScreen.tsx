import Header from '@/components/Header/Header';

import React, { useState, useEffect } from 'react';

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
          console.error('Expected an array for projects:', data);
          return;
        }
        console.log('projects:', data.data);
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
          console.error('Expected an array for fabrics:', data);
          return;
        }
        console.log('data:', data.data);
        data.data.forEach((fabric: Fabric) => {
          console.log('Fabric:', fabric);
          fabric.attributes.washes?.data?.forEach((wash) => {
            console.log('Wash:', wash);
            console.log(
              'Icon URL:',
              wash.attributes.icone?.data?.[0]?.attributes?.url
            );
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
      <div className="flex flex-col h-screen border bg-pink">
        <div className="flex flex-col justify-center items-center bg-lightPink">
          <h1 className="bg-blue-200">FabricScreen</h1>

          <h2 className="bg-green-200">Fabrics</h2>
          <h3 className="bg-yellow-200">Par tissus:</h3>
          <div>
            <input
              className="bg-gray-200"
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                console.log('Search value:', e.target.value);
              }}
            />
            <button
              className="bg-violet-300"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        <div>
          <ul className="flex flex-row">
            {fabrics.map((fabric: Fabric) => (
              <li key={fabric.id} className=" w-100 h-100 border">
                <p>{fabric.attributes.name}</p>
                {fabric.attributes.picture_fabric?.data && (
                  <img
                    src={`http://localhost:1337${fabric.attributes.picture_fabric.data.attributes.url}`}
                    alt={fabric.attributes.name}
                    className="w-20 h-20"
                  />
                )}
                {fabric.attributes.washes?.data?.map((wash) => (
                  <div key={wash.id}>
                    <p>{wash.attributes.description}</p>
                    {wash.attributes.icone?.data?.[0] && (
                      <img
                        src={`http://localhost:1337${wash.attributes.icone.data[0]?.attributes.url}`}
                        alt={wash.attributes.wash_name}
                        className="w-20 h-20"
                      />
                    )}
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FabricScreen;
