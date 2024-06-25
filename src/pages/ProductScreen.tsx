import React from 'react';
import { useState } from 'react';
import Header from '@/components/Header/Header';

type Fabric = {
  id: number;
  attributes: {
    name: string;
    description: string;
  };
};
interface Project {
  id: number;
  name: string;
}
const ProductScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);

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
  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center h-screen">
        <h1>ProductScreen</h1>
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
          <button
            onClick={() => {
              console.log('Search:', search);
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductScreen;
