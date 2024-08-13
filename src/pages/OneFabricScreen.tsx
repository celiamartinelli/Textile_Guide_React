import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { Button } from '@mui/material';
import ButtonInfoLevelSewing from '@/components/Button/ButtonInfoLevelSewing';

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

interface ProductIcon {
  id: number;
  attributes: {
    url: string;
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
    weight: string;
    consumption: string;
    appearance: string;
    washes: {
      data: Wash[];
    };
    products: {
      data: Products[];
    };
    level_sewing: {
      data: Level[];
    };
    weave_of_fabrics: {
      data: Weave[];
    };
  };
};

interface Weave {
  id: string;
  attributes: {
    category: string;
    name: string;
    icone_weave: {
      data: {
        attributes: {
          url: string;
        };
      }[];
    };
  };
}

interface Level {
  id: string;
  attributes: {
    name_level: string;
    description: string;
  };
}

const OneFabricScreen: React.FC = () => {
  const { fabricId } = useParams() as unknown as RouteParams;
  const [fabric, setFabric] = useState<Fabric | null>(null);
  const [allLevels, setAllLevels] = useState<Level[]>([]);

  useEffect(() => {
    const fetchFabricData = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/fabrics/${fabricId}?populate[picture_fabric]=true&populate[washes][populate]=icone&populate[products][populate]=icone_product&populate[weave_of_fabrics][populate]=icone_weave&populate[level_sewing]=true`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

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

  const renderCompositionTags = (composition: string) => {
    return composition.split(',').map((comp, index) => (
      <span
        key={index}
        className="px-3 py-1 mb-2 mx-2 bg-cream rounded-md text-sm border"
      >
        {comp.trim()}
      </span>
    ));
  };

  const renderCharateristicTags = (characteristic: string) => {
    return characteristic.split(',').map((charact, index) => (
      <span
        key={index}
        className="px-3 py-1  mb-2 bg-lightPink rounded-md text-sm border"
      >
        {charact.trim()}
      </span>
    ));
  };

  const renderBenefitsTags = (benefits: string) => {
    return benefits.split(',').map((benefit, index) => (
      <span
        key={index}
        className="px-3 py-1  mb-2 bg-sage rounded-md text-sm text-white border"
      >
        {benefit.trim()}
      </span>
    ));
  };

  const renderDisadvantagesTags = (disadvantages: string) => {
    return disadvantages.split(',').map((disadvantage, index) => (
      <span
        key={index}
        className="px-3 py-1 mb-2 bg-pink rounded-md text-sm border "
      >
        {disadvantage.trim()}
      </span>
    ));
  };

  const renderConsumptionCard = (consumption: string) => {
    // Définir les titres à utiliser
    const titles = ['Eau', 'Electricité'];

    return consumption.split(',').map((value, index) => (
      <span key={index} className="px-3 py-1 mb-2 rounded-md text-sm border">
        {/* Afficher le titre suivi de la valeur */}
        <strong>{titles[index] ? `${titles[index]}: ` : ''}</strong>
        {value.trim()}
      </span>
    ));
  };

  if (!fabric || !fabric.attributes) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="pb-20">
      <div className="flex flex-col h-full mx-3 pt-12 mt-36 lg:min-h-screen">
        <div className="flex flex-col justify-center items-center">
          <div className="border-2 border-white rounded-md shadow-lg p-2">
            <h1 className="text-center">{fabric.attributes.name}</h1>
            <div className="flex flex-col justidy-center items-center sm:m-4 sm:flex-row md:m-8 lg:m-2">
              {fabric.attributes.picture_fabric?.data && (
                <img
                  src={`http://localhost:1337${fabric.attributes.picture_fabric.data.attributes.url}`}
                  alt={fabric.attributes.name}
                  className="w-38 h-38 rounded-lg m-2 md:w-26 h-26 lg:w-44 h-44"
                />
              )}

              <p className="m-2 text-justify sm:pt-2 lg:pt-2">
                {fabric.attributes.description}
              </p>
            </div>
            <div className="text-center text-sm sm:flex flex-wrap justify-around">
              <div className="flex flex-col justify-center pb-2 mx-2 sm:justify-start sm:w-2/5">
                <h4 className="pb-2">Composition:</h4>
                <p className="flex flex-col justify-center">
                  {fabric.attributes.composition &&
                    renderCompositionTags(fabric.attributes.composition)}
                </p>
              </div>
              <div className="flex flex-col justify-center pb-2 mx-2 sm:justify-start sm:w-2/5">
                <h4 className="pb-2">Charactéristique:</h4>
                <p className="flex flex-col justify-center">
                  {fabric.attributes.characteristic &&
                    renderCharateristicTags(fabric.attributes.characteristic)}
                </p>
              </div>
              <div className="flex flex-col justify-center pb-2 mx-2 sm:justify-start sm:w-2/5">
                <h4 className="pb-2">Inconvénients</h4>
                <p className="flex flex-col justify-center">
                  {fabric.attributes.disadvantages &&
                    renderDisadvantagesTags(fabric.attributes.disadvantages)}
                </p>
              </div>
              <div className="flex flex-col justify-center pb-2 mx-2 sm:justify-start sm:w-2/5">
                <h4 className="pb-2">Avantages</h4>
                <p className="flex flex-col justify-center">
                  {fabric.attributes.benefit &&
                    renderBenefitsTags(fabric.attributes.benefit)}
                </p>
              </div>
            </div>
            <div className="text-center">
              <h4>Origine:</h4>
              <p>{fabric.attributes.origin}</p>
            </div>
            <div className="text-center">
              <h4>Poids pour 1m²:</h4>
              <p>{fabric.attributes.weight}</p>
            </div>
            <div className="text-center">
              <h4>Consommation Energitique:</h4>
              <div className="flex">
                {fabric.attributes.consumption &&
                  renderConsumptionCard(fabric.attributes.consumption)}
              </div>
            </div>
            <div className="text-center">
              <h4>Aspect du Tissus:</h4>
              <p>{fabric.attributes.appearance}</p>
            </div>
            <div className="text-center">
              <h4>Niveau de Couture</h4>
              <p>
                {fabric.attributes.level_sewing.data[0].attributes.name_level}
              </p>
            </div>
            <div className="text-center flex flex-col justify-center items-center border rounded-lg">
              <h4>Armure du Tissus:</h4>
              <p>
                {fabric.attributes.weave_of_fabrics.data[0].attributes.category}
              </p>

              <img
                src={`http://localhost:1337${fabric.attributes.weave_of_fabrics.data[0].attributes.icone_weave.data[0].attributes.url}`}
                alt="weave-icone"
                className="w-32 h-32 p-1 rounded-md "
              />
              <p>
                {fabric.attributes.weave_of_fabrics.data[0].attributes.name}
              </p>
            </div>
          </div>
          <div className="w-full  ">
            <div className="border-2 border-white rounded-md shadow-lg my-2 w-full lg:my-0 ">
              <h2 className="text-center lg:mt-2">Entretien</h2>
              <ul className="flex flex-row flex-wrap justify-center">
                {fabric.attributes.washes?.data?.map((wash, washIndex) => (
                  <li
                    className="w-16 flex flex-col justify-start items-center m-1 sm:w-24"
                    key={wash.id}
                  >
                    {wash.attributes.icone?.data?.map((icon, iconIndex) => (
                      <div key={`${wash.id}-${iconIndex}`}>
                        <img
                          key={iconIndex}
                          src={`http://localhost:1337${icon.attributes.url}`}
                          alt="icone"
                          className="w-12 h-12 p-1 border rounded-md bg-cream shadow-md"
                        />
                      </div>
                    ))}
                    <p className="text-xs w-14 text-center flex pt-1 sm:w-24 justify-center">
                      {wash.attributes.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-2 border-white rounded-md shadow-lg w-full lg:my-0">
              <h2 className="text-center lg:mt-2">Projets Associés</h2>
              <ul className="flex flex-row flex-wrap justify-center">
                {fabric.attributes.products?.data?.map(
                  (product, productIndex) => (
                    <li
                      className="w-16 flex flex-col justify-start items-center m-1"
                      key={product.id}
                    >
                      <Link
                        to={`/products/${product.id}`}
                        className="text-center"
                      >
                        {product.attributes.icone_product?.data?.map(
                          (picture, picIndex) => (
                            <img
                              key={`${product.id}-${picIndex}`}
                              src={`http://localhost:1337${picture.attributes.url}`}
                              alt="project"
                              className="w-12 h-12 p-1 border rounded-md bg-sage shadow-md"
                            />
                          )
                        )}
                        <p className="text-xs pt-1 text-center">
                          {product.attributes.name}
                        </p>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ButtonInfoLevelSewing />
    </div>
  );
};

export default OneFabricScreen;
