import Header from '@/components/Header/Header';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface RouteParams {
  fabricId: string;
}

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

type Project = {
  id: number;
  attributes: {
    project_name: string;
    description: string;
    picture_project: {
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
    benefit: string;
    characteristic: string;
    composition: string | null;
    origin: string;
    temperature: string | null;
    advantages: string;
    disadvantages: string;
    washes: {
      data: Wash[];
    };
    projects: {
      data: Project[];
    };
  };
};

const FabricScreen: React.FC = () => {
  const { fabricId } = useParams() as unknown as RouteParams;
  const [fabric, setFabric] = useState<Fabric | null>(null);

  useEffect(() => {
    const fetchFabricData = async () => {
      try {
        console.log(`Fetching fabric with ID: ${fabricId}`);
        const response = await fetch(
          `http://localhost:1337/api/fabrics/${fabricId}?populate[0]=picture_fabric&populate[1]=washes&populate[2]=washes.icone&filters[name],projects.picture_projects`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        // console.log('Fetched data:', result);

        if (!result || !result.data) {
          console.error("La réponse de l'API ne contient pas de données");
          return; // Sortie anticipée si pas de données
        }

        setFabric(result.data);
        console.log('Fabric:', result.data);
      } catch (error) {
        console.error(
          'Erreur lors du chargement des données du textile',
          error
        );
      }
    };

    fetchFabricData();
  }, [fabricId]);

  if (!fabric || !fabric.attributes) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col h-screen border bg-pink">
        <div className="flex flex-col justify-center items-center bg-lightPink">
          <h1 className="bg-blue-200">{fabric.attributes.name}</h1>
        </div>
        <div className="flex flex-col">
          {fabric.attributes.picture_fabric?.data && (
            <img
              src={`http://localhost:1337${fabric.attributes.picture_fabric.data.attributes.url}`}
              alt={fabric.attributes.name}
              className="w-20 h-20 rounded-lg"
            />
          )}
          <div>
            <p>{fabric.attributes.description}</p>
            <p>{fabric.attributes.composition}</p>
            <p>{fabric.attributes.origin}</p>
            <p>{fabric.attributes.characteristic}</p>
            <p>{fabric.attributes.advantages}</p>
            <p>{fabric.attributes.disadvantages}</p>
          </div>
          <div>
            <h2>Washes</h2>

            <ul>
              {fabric.attributes.washes?.data?.map((wash, index) => (
                <li key={index}>
                  <p>{wash.attributes.description}</p>
                  {wash.attributes.icone?.data?.map((icon, iconIndex) => (
                    <img
                      key={iconIndex}
                      src={`http://localhost:1337${icon.attributes.url}`}
                      alt="icone"
                      className="w-10 h-10"
                    />
                  ))}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Projects</h2>
            <ul>
              {fabric.attributes.projects?.data?.map((project, index) => (
                <li key={index}>
                  <p>{project.attributes.project_name}</p>
                  <p>{project.attributes.description}</p>
                  {project.attributes.picture_project?.data?.map(
                    (picture, picIndex) => (
                      <img
                        key={picIndex}
                        src={`http://localhost:1337${picture.attributes.url}`}
                        alt="project"
                        className="w-10 h-10"
                      />
                    )
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FabricScreen;
