import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ButtonInfoLevelSewing from '@/components/Button/ButtonInfoLevelSewing';
import { getBaseUrl } from '@/config/api';

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
  const { t } = useTranslation();
  const { fabricId } = useParams() as unknown as RouteParams;
  const [fabric, setFabric] = useState<Fabric | null>(null);
  const [allLevels, setAllLevels] = useState<Level[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const getBaseUrl = 'https://textile-guide-srv.fr';

  useEffect(() => {
    const fetchFabricData = async () => {
      try {
        const response = await fetch(
          `${getBaseUrl}/api/fabrics/${fabricId}?populate[picture_fabric]=true&populate[washes][populate]=icone&populate[products][populate]=icone_product&populate[weave_of_fabrics][populate]=icone_weave&populate[level_sewing]=true`
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
        // console.log('Fabric:', result.data);
      } catch (error) {
        console.error(
          'Erreur lors du chargement des données du textile',
          error
        );
      }
    };

    fetchFabricData();
  }, [fabricId]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderTableCellContent = (content: string) => {
    return content.split(',').map((item, index) => (
      <div key={index} className="">
        {item.trim()}
      </div>
    ));
  };

  const renderConsumptionCard = (consumption: string) => {
    const titles = ['💧 Eau', '💡 Electricité'];

    const values = consumption.split(',').map((value) => value.trim());

    return (
      <table className="table-auto w-full">
        <thead className="border-b bg-white bg-opacity-30">
          <tr>
            {titles.map((title, index) => (
              <th
                key={index}
                className={`px-4 py-2 text-center ${
                  index === 0 ? 'border-r' : ''
                }`}
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {values.map((value, index) => (
              <td
                key={index}
                className={`px-4 py-2 text-center ${
                  index === 0 ? 'border-r' : ''
                }`}
              >
                {value}
              </td>
            ))}
          </tr>
        </tbody>
        <caption className="border-b">Pour un 1 m² de tissu</caption>
      </table>
    );
  };

  if (!fabric || !fabric.attributes) {
    return <div>Chargement...</div>;
  }

  const imageUrl = fabric?.attributes?.picture_fabric?.data?.attributes.url;

  return (
    <div className="pb-20">
      <div className="flex flex-col h-full mx-3 pt-12 mt-24 md:mt-32 lg:min-h-screen">
        <div className="flex flex-col justify-center items-center">
          <div className=" p-2">
            <div className="flex flex-col justify-center items-center mb-6 sm:m-4 sm:flex-row md:m-6 lg:m-2">
              {imageUrl && (
                <img
                  src={`${getBaseUrl}${imageUrl}`}
                  alt={fabric.attributes.name}
                  className="w-38 h-38 rounded-lg m-2 md:w-26 h-26 sm:mr-6 lg:w-44 h-44"
                />
              )}
              <div className="w-2/3 justify-center items-center ">
                <h1 className="text-center text-2xl font-medium mt-2">
                  {fabric.attributes.name}
                </h1>
                <p className="m-2 sm:pt-2 lg:pt-2 text-justify">
                  {fabric.attributes.description}
                </p>
              </div>
            </div>
            {isMobile ? (
              <div className="text-center flex flex-col justify-center border-2 rounded-md shadow-md">
                <table className="table-auto ">
                  <tbody>
                    <tr className="border-b">
                      <th className="px-4 py-2 bg-white bg-opacity-30">
                        {t('oneFabric.h41')}
                      </th>
                    </tr>
                    <tr>
                      {' '}
                      <td className="px-4 py-2 border-b">
                        {fabric.attributes?.composition &&
                          renderTableCellContent(
                            fabric.attributes?.composition
                          )}
                      </td>
                    </tr>
                    <tr>
                      {' '}
                      <th className="px-4 py-2 border-b bg-white bg-opacity-30">
                        {t('oneFabric.h42')}
                      </th>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-b">
                        {fabric.attributes?.characteristic &&
                          renderTableCellContent(
                            fabric.attributes?.characteristic
                          )}
                      </td>
                    </tr>
                    <tr>
                      <th className="px-4 py-2 border-b bg-white bg-opacity-30">
                        {t('oneFabric.h43')}
                      </th>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-b ">
                        {fabric.attributes?.disadvantages &&
                          renderTableCellContent(
                            fabric.attributes?.disadvantages
                          )}
                      </td>
                    </tr>
                    <tr>
                      <th className="px-4 py-2 border-b bg-white bg-opacity-30">
                        {t('oneFabric.h44')}
                      </th>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 ">
                        {fabric.attributes?.benefit &&
                          renderTableCellContent(fabric.attributes?.benefit)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div
                className="text-center mx-10
             border-2 rounded-md shadow-md"
              >
                <table className="table-auto w-full ">
                  <thead className="border-b">
                    <tr className="bg-white bg-opacity-30">
                      <th className="px-4 py-2 border-r ">
                        {t('oneFabric.h41')}
                      </th>
                      <th className="px-4 py-2 border-r">
                        {t('oneFabric.h42')}
                      </th>
                      <th className="px-4 py-2 border-r">
                        {t('oneFabric.h43')}
                      </th>
                      <th className="px-4 py-2 ">{t('oneFabric.h44')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 border-r">
                        {fabric.attributes?.composition &&
                          renderTableCellContent(
                            fabric.attributes?.composition
                          )}
                      </td>
                      <td className="px-4 py-2 border-r">
                        {fabric.attributes?.characteristic &&
                          renderTableCellContent(
                            fabric.attributes?.characteristic
                          )}
                      </td>
                      <td className="px-4 py-2 border-r">
                        {fabric.attributes?.disadvantages &&
                          renderTableCellContent(
                            fabric.attributes?.disadvantages
                          )}
                      </td>
                      <td className="px-4 py-2 ">
                        {fabric.attributes?.benefit &&
                          renderTableCellContent(fabric.attributes?.benefit)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            <div className="text-center flex flex-col m-6">
              <h4 className="m-2 text-center text-xl font-medium">
                {' '}
                {t('oneFabric.h49')}
              </h4>
              <p>{fabric.attributes?.origin}</p>
            </div>
            {isMobile ? (
              <div className="text-center flex flex-col justify-center border-2 rounded-md shadow-md">
                <table className="table-auto">
                  <tbody>
                    <tr className="border-b">
                      <th className="px-4 py-2 bg-white bg-opacity-30">
                        {t('oneFabric.h45')}
                      </th>
                    </tr>

                    <tr>
                      <td className="px-4 py-2 border-b">
                        {fabric.attributes?.weight}
                      </td>
                    </tr>

                    <tr className="border-b">
                      <th className="px-4 py-2 bg-white bg-opacity-30">
                        {t('oneFabric.h46')}
                      </th>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-b">
                        {fabric.attributes?.appearance &&
                          renderTableCellContent(fabric.attributes?.appearance)}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <th className="px-4 py-2 bg-white bg-opacity-30 flex justify-evenly">
                        {t('oneFabric.h47')} <ButtonInfoLevelSewing />
                      </th>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 border-b">
                        {fabric.attributes?.level_sewing?.data?.[0]?.attributes
                          ?.name_level || 'Niveau non disponible'}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <th className="px-4 py-2 bg-white bg-opacity-30">
                        {t('oneFabric.h48')}
                      </th>
                    </tr>

                    <tr>
                      <td className="px-4 py-2 text-center">
                        <div className="flex flex-col justify-center items-center">
                          {fabric.attributes?.weave_of_fabrics?.data?.[0]
                            ?.attributes?.category ||
                            'Catégorie non disponible'}

                          <img
                            // src={`http://localhost:1337${fabric?.attributes?.weave_of_fabrics?.data?.[0]?.attributes?.icone_weave?.data?.[0]?.attributes?.url}`}
                            src={`${getBaseUrl}${fabric?.attributes?.weave_of_fabrics?.data?.[0]?.attributes?.icone_weave?.data?.[0]?.attributes?.url}`}
                            alt="weave-icone"
                            className="w-32 h-32 p-1 rounded-md"
                          />

                          {fabric.attributes?.weave_of_fabrics?.data?.[0]
                            ?.attributes?.name || 'Nom non disponible'}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div
                className="text-center mx-10
           border-2 rounded-md shadow-md"
              >
                <table className="table-auto w-full">
                  <thead className="border-b">
                    <tr className="bg-white bg-opacity-30">
                      <th className="px-4 py-2 border-r">
                        {' '}
                        {t('oneFabric.h45')}
                      </th>
                      <th className="px-4 py-2 border-r">
                        {' '}
                        {t('oneFabric.h46')}
                      </th>
                      <th className="px-4 py-2 border-r">
                        {' '}
                        {t('oneFabric.h47')}
                      </th>
                      <th className="px-4 py-2"> {t('oneFabric.h48')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 border-r">
                        {fabric.attributes?.weight}
                      </td>
                      <td className="px-4 py-2 border-r">
                        {fabric.attributes?.appearance &&
                          renderTableCellContent(fabric.attributes?.appearance)}
                      </td>
                      <td className="px-4 py-2 border-r">
                        {fabric.attributes?.level_sewing?.data?.[0]?.attributes
                          ?.name_level || 'Niveau non disponible'}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className="flex flex-col justify-center items-center">
                          {fabric.attributes?.weave_of_fabrics?.data?.[0]
                            ?.attributes?.category ||
                            'Catégorie non disponible'}

                          <img
                            // src={`http://localhost:1337${fabric?.attributes?.weave_of_fabrics?.data?.[0]?.attributes?.icone_weave?.data?.[0]?.attributes?.url}`}
                            src={`${getBaseUrl}${fabric?.attributes?.weave_of_fabrics?.data?.[0]?.attributes?.icone_weave?.data?.[0]?.attributes?.url}`}
                            alt="weave-icone"
                            className="w-32 h-32 p-1 rounded-md"
                          />

                          {fabric.attributes?.weave_of_fabrics?.data?.[0]
                            ?.attributes?.name || 'Nom non disponible'}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="text-center m-4 ">
            <h4 className="m-2 text-center text-xl font-medium">
              {t('oneFabric.h50')}
            </h4>
            <div className="w-full sm:w-2/3 md:2/3 lg:w-5/6 mx-auto border-2 rounded-md shadow-md">
              {fabric.attributes?.consumption &&
                renderConsumptionCard(fabric.attributes?.consumption)}
            </div>
          </div>
          <div className="w-full">
            <div className=" my-2 w-full lg:my-0 ">
              <h4 className="m-2 text-center text-xl font-medium">
                {t('oneFabric.h51')}
              </h4>
              <ul className="flex flex-row flex-wrap justify-center">
                {fabric.attributes?.washes?.data?.map((wash, washIndex) => (
                  <li
                    className="w-16 flex flex-col justify-start items-center m-1 sm:w-24"
                    key={wash.id}
                  >
                    {wash.attributes?.icone?.data?.map((icon, iconIndex) => (
                      <div key={`${wash.id}-${iconIndex}`}>
                        <img
                          key={iconIndex}
                          // src={`http://localhost:1337${icon.attributes.url}`}
                          src={`${getBaseUrl}${icon.attributes?.url}`}
                          alt="icone"
                          className="w-12 h-12 p-1 border rounded-md bg-cream shadow-md"
                        />
                      </div>
                    ))}
                    <p className="text-xs w-14 text-center flex pt-1 sm:w-24 justify-center">
                      {wash.attributes?.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className=" w-full my-5 lg:my-0">
              <h4 className="m-2 text-center text-xl font-medium">
                {t('oneFabric.h52')}
              </h4>
              {fabric.attributes?.products?.data?.length === 0 ? (
                <div className="text-center text-sm mt-3">
                  <p>Aucun Projet associé pour le moment</p>
                </div>
              ) : (
                <ul className="flex flex-row flex-wrap justify-center">
                  {fabric.attributes?.products?.data?.map(
                    (product, productIndex) => (
                      <li
                        className="w-16 flex flex-col justify-start items-center m-1"
                        key={product.id}
                      >
                        <Link
                          to={`/products/${product.id}`}
                          className="text-center "
                        >
                          <div className="">
                            {product.attributes?.icone_product?.data?.map(
                              (picture, picIndex) => (
                                <img
                                  key={`${product.id}-${picIndex}`}
                                  // src={`http://localhost:1337${picture.attributes.url}`}
                                  src={`${getBaseUrl}${picture.attributes?.url}`}
                                  alt="project"
                                  className="w-18 h-18 p-2 rounded-full bg-white bg-opacity-30 shadow-md"
                                />
                              )
                            )}
                          </div>
                          <p className="text-xs pt-1 text-center">
                            {product.attributes?.name}
                          </p>
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneFabricScreen;
