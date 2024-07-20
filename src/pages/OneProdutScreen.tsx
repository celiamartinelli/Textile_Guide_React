import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AiOutlineColumnWidth } from 'react-icons/ai';
import {
  FaRibbon,
  FaPaintBrush,
  FaPuzzlePiece,
  FaAnchor,
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

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

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        console.log(`Fetching product with ID: ${productId}`);
        const response = await fetch(
          `http://localhost:1337/api/products/${productId}?populate[icone_product][populate]=*&populate[fabrics][populate][0]=picture_fabric&populate[supplies_quantities][populate]=*`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Fetched data:', result);

        if (!result || !result.data) {
          console.error("La réponse de l'API ne contient pas de données");
          return;
        }

        setProduct(result.data);
        console.log('Product:', result);
        if (result.data.attributes.supplies_quantities) {
          console.log(
            'Supplies Quantities:',
            result.data.attributes.supplies_quantities
          );
        }
      } catch (error) {
        console.error(
          'Erreur lors du chargement des données du produit',
          error
        );
      }
    };

    fetchProductData();
  }, [productId]);

  if (!product || !product.attributes) {
    return <div>Chargement...</div>;
  }

  const formatSupplyText = (text: string) => {
    return text.split('(l)').map((part, index) => {
      if (index === 0) {
        return part;
      }
      return (
        <React.Fragment key={index}>
          <div className="flex items-center">
            <span className="inline-flex items-center">
              <AiOutlineColumnWidth className="mr-1 border rounded-full p-1 w-5 h-5" />
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
    | 'accessory';

  function getIconForCategory(category: CategoryType) {
    switch (category) {
      case 'main_fabric':
        return (
          <img
            className="w-24 h-24"
            alt="main_fabric"
            src="../../public/assets/icone_supply/main_fabric_black.png"
          />
        );
      case 'interior_fabric':
        return (
          <img
            className="w-24 h-24"
            alt="interior_fabric"
            src="../../public/assets/icone_supply/interior_fabric_black.png"
          />
        );
      case 'interling_fabric':
        return (
          <img
            className="w-24 h-24"
            alt="interling_fabric"
            src="../../public/assets/icone_supply/interling_fabric_black.png"
          />
        );
      case 'closure':
        return (
          <img
            className="w-24 h-24"
            alt="closure"
            src="../../public/assets/icone_supply/closure_black.png"
          />
        );
      case 'fastener':
        return (
          <img
            className="w-24 h-24"
            alt="festener_fabric"
            src="../../public/assets/icone_supply/fastener_black.png"
          />
        );
      case 'ribbon':
        return (
          <img
            className="w-24 h-24"
            alt="ribbon"
            src="../../public/assets/icone_supply/ribbons_black.png"
          />
        );
      case 'decoration':
        return (
          <img
            className="w-24 h-24"
            alt="decoration"
            src="../../public/assets/icone_supply/decoration_black.png"
          />
        );
      case 'accessory':
        return (
          <img
            className="w-24 h-24"
            alt="accessory"
            src="../../public/assets/icone_supply/access_black.png"
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
    const Icon = getIconForCategory(category);
    const translatedCategory = t(`oneProduct.supply_category.${category}`);
    console.log('Category:', category); // Pour déboguer
    console.log('Translated Category:', translatedCategory);
    return (
      <div className="w-2/6 h-1/5 m-2 border-2 rounded-lg p-4 bg-lightBackground dark:bg-darkBackground flex flex-col justify_center items-center">
        {Icon}
        {translatedCategory}: {formatListText(value)}
      </div>
    );
  }
  return (
    <div className="pb-20">
      <div className="flex flex-col min-h-screen mx-6 pt-12 mt-36 ">
        <div className="flex flex-col justify-center items-center ">
          <h1 className="text-center">{product.attributes.name}</h1>
          <div className="border-2 border-white rounded-md shadow-lg p-2 w-full">
            {product.attributes.icone_product?.data &&
              product.attributes.icone_product.data.length > 0 && (
                <img
                  src={`http://localhost:1337${product.attributes.icone_product.data[0].attributes.url}`}
                  alt={product.attributes.name}
                  className="w-24 h-24 rounded-lg m-2 mx-auto"
                />
              )}
            <div className="text-center">
              <p>{product.attributes.description}</p>
              <div className="flex justify-center">
                {' '}
                <p>{product.attributes.category}</p>
                <p>-</p>
                <p>{product.attributes.second_category}</p>
              </div>

              {/* <div className="">
                <h4>Quantité de tissus nécessaire:</h4>
                <p className="border-2 rounded-md bg-cream">
                  {product.attributes.textile_quantity_required}
                </p>
                <p>pour une laize de 1,5m</p>
              </div> */}
            </div>
            <div className="flex flex-col justify-center items-center ">
              <h2 className="">Tissus Associés</h2>
              <ul className="flex">
                {product.attributes.fabrics?.data?.map((fabric) => (
                  // console.log('fabric:', fabric),
                  <li
                    className="flex flex-col justify-center items-center mb-2"
                    key={fabric.id}
                  >
                    <Link to={`/fabrics/${fabric.id}`} className="text-center">
                      <img
                        src={`http://localhost:1337${fabric.attributes.picture_fabric.data.attributes.url}`}
                        alt={fabric.attributes.name}
                        className="w-20 h-20 rounded-lg m-2"
                      />
                      <p className="text-center">{fabric.attributes.name}</p>
                    </Link>
                    {/* <div className="flex">
                      {fabric.attributes.washes?.data.map((icon, iconIndex) => (
                        <div
                          className="flex flex-col justify-start items-center"
                          key={`${fabric.id}-${iconIndex}`}
                        >
                          <img
                            key={icon.id}
                            src={`http://localhost:1337${icon.attributes.icone.data?.[0].attributes.url}`}
                            alt={icon.attributes.description}
                            className="w-12 h-12 p-1 border rounded-md bg-cream shadow-md"
                          />
                          <p className="text-xs w-14 text-center flex pt-1">
                            {icon.attributes.description}
                          </p>
                        </div>
                      ))}
                    </div> */}
                  </li>
                ))}
              </ul>
              <h2 className="">Quantités de Fournitures</h2>
              <div className="flex">
                {product.attributes.supplies_quantities?.data?.map((supply) => (
                  <div
                    className="flex flex-wrap justify-center items-center mb-2"
                    key={supply.id}
                  >
                    {renderProductAttribute(
                      'main_fabric',
                      supply.attributes.main_fabric,
                      'main_fabric'
                    )}
                    {renderProductAttribute(
                      'interior_fabric',
                      supply.attributes.interior_fabric,
                      'interior_fabric'
                    )}
                    {renderProductAttribute(
                      'interling_fabric',
                      supply.attributes.interling_fabric,
                      'interling_fabric'
                    )}
                    {renderProductAttribute(
                      'closure',
                      supply.attributes.closure,
                      'closure'
                    )}
                    {renderProductAttribute(
                      'fastener',
                      supply.attributes.fastener,
                      'fastener'
                    )}
                    {renderProductAttribute(
                      'ribbon',
                      supply.attributes.ribbon,
                      'ribbon'
                    )}
                    {renderProductAttribute(
                      'decoration',
                      supply.attributes.decoration,
                      'decoration'
                    )}
                    {renderProductAttribute(
                      'accessory',
                      supply.attributes.accessory,
                      'accessory'
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneProductScreen;
