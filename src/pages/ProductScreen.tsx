import React, { useState, useEffect } from 'react';
import Header from '@/components/Header/Header';

type Fabric = {
  id: number;
  attributes: {
    name: string;
    description: string;
    picture_fabric: string;
  };
};

interface Project {
  id: number;
  name: string;
}

const ProductScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search.length >= 3) {
        // Exécuter la recherche seulement si la longueur de la chaîne de recherche est de 3 caractères ou plus
        handleSearch();
      } else {
        setProjects([]);
      }
    }, 300); // délai de 300ms avant d'envoyer la requête

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleSearch = () => {
    console.log('search:', search);
    fetch(
      `http://localhost:1337/api/projects?filters[name][$contains]=${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data.data)) {
          console.error('Expected an array for projects:', data);
          return;
        }
        console.log('data:', data.data);
        setProjects(data.data);
      })
      .catch((err) => {
        console.error('err:', err);
      });
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center h-screen">
        <h1>ProductScreen</h1>
        <div>
          <h3>Par produit:</h3>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              console.log('Search value:', e.target.value);
            }}
          />
        </div>
        <button type="button" onClick={handleSearch}>
          Search
        </button>
        <div>
          <h2>Projects</h2>
          <ul>
            {projects.map((project: Project) => (
              <li key={project.id}>{project.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
