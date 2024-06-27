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
    fetch(`http://localhost:1337/api/projects?fabricIds=${fabricIds.join(',')}`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error('Expected an array for projects:', data);
          return;
        }
        console.log('projects:', data);
        setProjects(data);
      })
      .catch((err) => {
        console.error('err:', err);
      });
  };

  const handleSearch = () => {
    console.log('search:', search);
    fetch(
      `http://localhost:1337/api/fabrics?populate[0]=picture_fabric&populate[1]=washes&populate[2]=washes.icone&filters[name][$contains]=${search}`
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
          fabric.attributes.washes.data.forEach((wash) => {
            console.log('Wash:', wash);
            console.log(
              'Icon URL:',
              wash.attributes.icone.data[0]?.attributes.url
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
      <div className="flex flex-col justify-center items-center h-screen">
        <h1>FabricScreen</h1>
        <div>
          <h2>Fabrics</h2>
          <h3>Par tissus:</h3>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              console.log('Search value:', e.target.value);
            }}
          />
          <button type="button" onClick={handleSearch}>
            Search
          </button>
          <ul className="flex flex-row">
            {fabrics.map((fabric: Fabric) => (
              <li key={fabric.id} className=" w-100 h-100 border">
                <p>{fabric.attributes.name}</p>
                {fabric.attributes.picture_fabric && (
                  <img
                    src={`http://localhost:1337${fabric.attributes.picture_fabric.data.attributes.url}`}
                    alt={fabric.attributes.name}
                    className="w-20 h-20"
                  />
                )}
                {fabric.attributes.washes?.data?.map((wash) => (
                  <div key={wash.id}>
                    <p>{wash.attributes.description}</p>
                    {wash.attributes.icone && (
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
