import Header from '@/components/Header/Header';
import React from 'react';
import { useState } from 'react';

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
const FabricScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
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

  const handleSearch = () => {
    console.log('search:', search);
    fetch(`http://localhost:1337/api/fabrics?search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data.data)) {
          console.error('Expected an array for fabrics:', data);
          return;
        }
        console.log('data:', data.data);
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
        <ul>
          {fabrics.map((fabric: Fabric) => (
            <li key={fabric.id}>
              <p>{fabric.attributes.name}</p>
              <p>{fabric.attributes.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Projects</h2>
        <ul>
          {projects.map((project: Project) => (
            <li key={project.id}>{project.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FabricScreen;
