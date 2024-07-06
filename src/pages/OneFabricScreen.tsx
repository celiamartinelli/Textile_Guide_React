import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

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
interface ProductIcon {
  id: number;
  attributes: {
    // alternativeText: string | null;
    // caption: string | null;
    // createdAt: string;
    // ext: string;
    // formats: any | null; // Remplacez `any` par un type plus spécifique si possible
    // hash: string;
    // height: number;
    // mime: string;
    // name: string;
    // previewUrl: string | null;
    // provider: string;
    // provider_metadata: any | null; // Remplacez `any` par un type plus spécifique si possible
    // size: number;
    // updatedAt: string;
    url: string;
    // width: number;
  };
}

type Products = {
  id: number;
  attributes: {
    name: string;
    category: string;
    description: string;
    icone_product: {
      data: ProductIcon[];
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
    products: {
      data: Products[];
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
          `http://localhost:1337/api/fabrics/${fabricId}?populate[0]=picture_fabric&populate[1]=washes&populate[2]=washes.icone&populate[3]=products.icone_product`
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
      <div className="flex flex-col h-screen mx-3 pt-12 mt-36">
        <div className="flex flex-col justify-center items-center border-2 border-white rounded-md shadow-lg">
          <h1>{fabric.attributes.name}</h1>

          <div className="flex flex-col justify-center items-center">
            {fabric.attributes.picture_fabric?.data && (
              <img
                src={`http://localhost:1337${fabric.attributes.picture_fabric.data.attributes.url}`}
                alt={fabric.attributes.name}
                className="w-20 h-20 rounded-lg"
              />
            )}
            <div className="text-center text-sm">
              <p>{fabric.attributes.description}</p>
              <p>{fabric.attributes.composition}</p>
              <p>{fabric.attributes.origin}</p>
              <p>{fabric.attributes.characteristic}</p>
              <p>{fabric.attributes.advantages}</p>
              <p>{fabric.attributes.disadvantages}</p>
            </div>
            <div>
              <h2 className="text-center">Entretien</h2>
              <ul className="flex flex-row flex-wrap justify-center">
                {fabric.attributes.washes?.data?.map((wash, index) => (
                  <li
                    className="w-14 flex flex-col justify-start items-center m-1"
                    key={index}
                  >
                    {wash.attributes.icone?.data?.map((icon, iconIndex) => (
                      <div>
                        <img
                          key={iconIndex}
                          src={`http://localhost:1337${icon.attributes.url}`}
                          alt="icone"
                          className="w-12 h-12 p-1 border rounded-md bg-lightPink shadow-md"
                        />
                      </div>
                    ))}
                    <p className="text-xs w-14 text-center flex pt-1">
                      {wash.attributes.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h2 className="text-center">Projets Associés</h2>
            <ul className="flex flex-row flex-wrap justify-center">
              {fabric.attributes.products?.data?.map((product, index) => (
                <li
                  className="w-16 flex flex-col justify-center items-center m-1"
                  key={index}
                >
                  {product.attributes.icone_product?.data?.map(
                    (picture, picIndex) => (
                      <img
                        key={picIndex}
                        src={`http://localhost:1337${picture.attributes.url}`}
                        alt="project"
                        className="w-12 h-12 p-1 border rounded-md bg-lightPink shadow-md"
                      />
                    )
                  )}
                  <p className="text-xs pt-1">{product.attributes.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FabricScreen;
