import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AiOutlineAntDesign, AiOutlineColumnWidth } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalShowMoreInfosLevel from '@/components/Modal/OneProduct/ModalShowMoreInfosLevel';
import ButtonInfoLevelSewing from '@/components/Button/ButtonInfoLevelSewing';

interface RouteParams {
  productId: string;
}

//
interface ProductIcon {
  id: string;
  attributes: {
    url: string;
  };
}

interface WashIcon {
  id: string;
  attributes: {
    url: string;
  };
}

interface Wash {
  id: number;
  attributes: {
    wash_name: string;
    description: string;
    icone: {
      data: WashIcon[];
    };
  };
}

interface Fabric {
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
      data: any[];
    };
  };
}

interface SupplyQuantity {
  id: number;
  attributes: {
    main_fabric: string;
    interior_fabric: string;
    interling_fabric: string;
    closure: string;
    fastener: string;
    ribbon: string;
    decoration: string;
    accessory: string;
    id_supplies_quantities: string;
    pocket: boolean;
    pocket_fabric: string;
    pocket_closure: string;
  };
}

interface ProductAttributes {
  name: string;
  category: string;
  description: string;
  textile_quantity_required: string;
  second_category: string;
  icone_product: {
    data: ProductIcon[];
  };
  fabrics?: {
    data: Fabric[];
  };
  supplies_quantities?: {
    data: SupplyQuantity[];
  };
  level_sewing: {
    data: Level[];
  };
}
interface Level {
  id: string;
  attributes: {
    name_level: string;
    description: string;
  };
}

interface Product {
  id: string;
  attributes: ProductAttributes;
}

interface Icone {
  data: { attributes: { url: string } }[];
}

const OneProductScreen: React.FC = () => {
  const { t } = useTranslation();
  const { productId } = useParams() as unknown as RouteParams;
  const [product, setProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [allLevels, setAllLevels] = useState<Level[]>([]);

  const getBaseUrl = 'https://textile-guide-srv.fr';

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // console.log(`Fetching product with ID: ${productId}`);
        const response = await fetch(
          `${getBaseUrl}/api/products/${productId}?populate[icone_product][populate]=*&populate[fabrics][populate][0]=picture_fabric&populate[supplies_quantities][populate]=*&populate[level_sewing]=*`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        // console.log('Fetched data:', result);

        if (!result || !result.data) {
          console.error("La réponse de l'API ne contient pas de données");
          return;
        }

        setProduct(result.data);
        // console.log('Product:', result);
        if (result.data.attributes.supplies_quantities) {
          // console.log(
          //   'Supplies Quantities:',
          //   result.data.attributes.supplies_quantities
          // );
        }
      } catch (error) {
        console.error(
          'Erreur lors du chargement des données du produit',
          error
        );
      }
    };

    // const fetchAllLevels = async () => {
    //   try {
    //     const response = await fetch('http://localhost:1337/api/level-sewings');
    //     const result = await response.json();
    //     console.log('Fetched levels:', result);
    //     setAllLevels(result.data);
    //   } catch (error) {
    //     console.error(
    //       'Erreur lors du chargement des niveaux de couture',
    //       error
    //     );
    //   }
    // };

    fetchProductData();
    // fetchAllLevels();
  }, [productId]);

  if (!product || !product.attributes) {
    return <div>Chargement...</div>;
  }

  // Fonction pour ouvrir la modal
  const showMoreInfosLevelSewing = () => {
    setShowModal(true);
  };

  // Fonction pour fermer la modal
  const closeModal = () => {
    setShowModal(false);
  };

  const formatSupplyText = (text: string) => {
    return text.split('(l)').map((part, index) => {
      if (index === 0) {
        return part;
      }
      return (
        <React.Fragment key={index}>
          <div className="flex items-center justify-center">
            <span className="inline-flex items-center">
              <AiOutlineColumnWidth className="mx-2" />
            </span>
            {part}
          </div>
        </React.Fragment>
      );
    });
  };

  const formatListText = (text: string) => {
    return text.split(',').map((item, index) => (
      <li className="text-xs flex flex-col" key={index}>
        {formatSupplyText(item.trim())}
      </li>
    ));
  };

  type CategoryType =
    | 'main_fabric'
    | 'interior_fabric'
    | 'interling_fabric'
    | 'closure'
    | 'fastener'
    | 'ribbon'
    | 'decoration'
    | 'accessory'
    | 'pocket_fabric'
    | 'pocket_closure';

  const isDevelopment = process.env.REACT_APP_ENV === 'development';

  function getIconForCategory(category: CategoryType) {
    const basePath = isDevelopment
      ? '../../public/assets/icone_supply'
      : '/assets/icone_supply';

    switch (category) {
      case 'main_fabric':
        return (
          <img
            className="w-16 h-16 sm:w-24 sm:h-24"
            alt="main_fabric"
            src={`${basePath}/main_fabric_black.png`}
          />
        );
      case 'interior_fabric':
        return (
          <img
            className="w-16 h-16 sm:w-24 sm:h-24"
            alt="interior_fabric"
            src={`${basePath}/interior_fabric_black.png`}
          />
        );
      case 'interling_fabric':
        return (
          <img
            className="w-16 h-16 sm:w-24 sm:h-24"
            alt="interling_fabric"
            src={`${basePath}/interling_fabric_black.png`}
          />
        );
      case 'closure':
        return (
          <img
            className="w-16 h-16 sm:w-24 sm:h-24"
            alt="closure"
            src={`${basePath}/closure_black.png`}
          />
        );
      case 'fastener':
        return (
          <img
            className="w-16 h-16 sm:w-24 sm:h-24"
            alt="fastener"
            src={`${basePath}/fastener_black.png`}
          />
        );
      case 'ribbon':
        return (
          <img
            className="w-16 h-16 sm:w-24 sm:h-24"
            alt="ribbon"
            src={`${basePath}/ribbons_black.png`}
          />
        );
      case 'decoration':
        return (
          <img
            className="w-16 h-16 sm:w-24 sm:h-24"
            alt="decoration"
            src={`${basePath}/decoration_black.png`}
          />
        );
      case 'accessory':
        return (
          <img
            className="w-16 h-16 sm:w-24 sm:h-24"
            alt="accessory"
            src={`${basePath}/access_black.png`}
          />
        );
      case 'pocket_fabric':
        return (
          <img
            className="w-16 h-16 sm:w-24 sm:h-24"
            alt="pocket_fabric"
            src={`${basePath}/pocket_fabric_black.png`}
          />
        );
      case 'pocket_closure':
        return (
          <img
            className="w-16 h-16 sm:w-24 sm:h-24"
            alt="pocket_closure"
            src={`${basePath}/pocket_closure_black.png`}
          />
        );
      default:
        return null;
    }
  }

  function renderProductAttribute(
    title: string,
    value: string,
    category: string
  ) {
    if (value === 'N/A') {
      return null; // Return null if the value is 'N/A'
    }
    const Icon = getIconForCategory(category);
    const translatedCategory = t(`oneProduct.supply_category.${category}`);
    const formattedText = formatListText(value);

    // console.log('Category:', category); // Pour déboguer
    // console.log('Translated Category:', translatedCategory);
    return (
      <div className="w-full border-2 rounded-lg p-4 bg-lightBackground dark:bg-darkPruneLogo flex flex-row items-center my-3 justify-center">
        <div className=" mx-1">{Icon}</div>
        <div className="text-center w-2/3 mx-1">
          <h5 className="mb-2">{translatedCategory}:</h5> {formattedText}
        </div>
      </div>
    );
  }
  return (
    <div className="pb-20">
      <div className="flex flex-col min-h-screen mx-6 pt-12 mt-36 ">
        <div className="flex flex-col justify-center items-center ">
          <h1 className="font-bold text-3xl text-white mb-4 text-center">
            {product.attributes?.name}
          </h1>
          <div className="p-2 w-full">
            {product.attributes?.icone_product?.data &&
              product.attributes?.icone_product.data.length > 0 && (
                <img
                  src={`${getBaseUrl}${product.attributes?.icone_product.data[0].attributes.url}`}
                  alt={product.attributes?.name}
                  className="w-24 h-24 rounded-lg m-2 mx-auto"
                />
              )}
            <div className="text-center">
              <div className="flex justify-center text-xs mb-6">
                <p>{product.attributes?.category}</p>
                <p> - </p>
                <p>{product.attributes?.second_category}</p>
              </div>
              <p>{product.attributes?.description}</p>

              <div className="flex justify-center my-6">
                <div className="border-2 rounded-md">
                  <table className="table-auto w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="px-4 py-2 text-center" colSpan={2}>
                          {t('oneProduct.quantity_textile_required')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.attributes?.textile_quantity_required
                        .split(',')
                        .map((quantity, index) => {
                          const [size, amount] = quantity.split(':');
                          return (
                            <tr
                              key={index}
                              className="border-b border-gray-200"
                            >
                              <th className="px-4 py-2 text-left border-r border-gray-200">
                                {size}
                              </th>
                              <td className="px-4 py-2 text-left">{amount}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td className="px-4 py-2 text-center" colSpan={2}>
                          {t('oneProduct.laize')}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="flex border-2 rounded-lg items-center p-5 pr-2">
                  <div className="flex flex-col mr-2">
                    <h2 className="mb-2"> {t('oneProduct.h2level')}</h2>

                    <p className="bg-cream rounded-full p-2 dark:bg-darkSage">
                      {
                        product.attributes?.level_sewing?.data[0]?.attributes
                          ?.name_level
                      }
                    </p>
                  </div>
                  <ButtonInfoLevelSewing />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center my-6">
              <h2 className="font-bold text-3xl text-white mb-4 text-center">
                {t('oneProduct.h2Fabric')}
              </h2>
              <ul className="flex flex-wrap justify-center items-start">
                {product.attributes?.fabrics?.data?.map((fabric) => (
                  <li
                    className="flex flex-col justify-center items-center mb-2"
                    key={fabric.id}
                  >
                    <Link
                      to={`/fabrics/${fabric.id}`}
                      className="flex flex-col justify-center items-center mx-2 w-24"
                    >
                      <img
                        // src={`http://localhost:1337${fabric.attributes.picture_fabric.data.attributes.url}`}
                        src={`${getBaseUrl}${fabric?.attributes?.picture_fabric?.data?.attributes?.url}`}
                        alt={fabric.attributes?.name}
                        className="w-20 h-20 rounded-lg m-2"
                      />
                      <p className="text-center">{fabric.attributes?.name}</p>
                    </Link>
                  </li>
                ))}
              </ul>
              <h2 className="font-bold text-3xl text-white mb-4 text-center">
                {t('oneProduct.h2AssociatedSupply')}
              </h2>
              <div className="flex">
                {product.attributes?.supplies_quantities?.data?.map(
                  (supply) => (
                    <div
                      className="flex flex-wrap justify-center items-center"
                      key={supply.id}
                    >
                      {renderProductAttribute(
                        'main_fabric',
                        supply.attributes?.main_fabric,
                        'main_fabric'
                      )}
                      {renderProductAttribute(
                        'interior_fabric',
                        supply.attributes?.interior_fabric,
                        'interior_fabric'
                      )}
                      {renderProductAttribute(
                        'interling_fabric',
                        supply.attributes?.interling_fabric,
                        'interling_fabric'
                      )}
                      {renderProductAttribute(
                        'closure',
                        supply.attributes?.closure,
                        'closure'
                      )}
                      {renderProductAttribute(
                        'fastener',
                        supply.attributes?.fastener,
                        'fastener'
                      )}
                      {renderProductAttribute(
                        'ribbon',
                        supply.attributes?.ribbon,
                        'ribbon'
                      )}
                      {renderProductAttribute(
                        'decoration',
                        supply.attributes?.decoration,
                        'decoration'
                      )}
                      {renderProductAttribute(
                        'accessory',
                        supply.attributes?.accessory,
                        'accessory'
                      )}
                      {supply.attributes?.pocket && (
                        <>
                          {renderProductAttribute(
                            'pocket_fabric',
                            supply.attributes?.pocket_fabric,
                            'pocket_fabric'
                          )}

                          {renderProductAttribute(
                            'pocket_closure',
                            supply.attributes?.pocket_closure,
                            'pocket_closure'
                          )}
                        </>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <ModalShowMoreInfosLevel levels={allLevels} onClose={closeModal} />
      )}
    </div>
  );
};

export default OneProductScreen;
