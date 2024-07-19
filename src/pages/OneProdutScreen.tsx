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
    | 'Main Fabric'
    | 'Interior Fabric'
    | 'Interling Fabric'
    | 'Closure'
    | 'Fasteners'
    | 'Ribbon'
    | 'Decoration'
    | 'Accessory';

  function getIconForCategory(category: CategoryType) {
    switch (category) {
      case 'Main Fabric':
        return (
          <img
            alt="main_fabric"
            src="../../public/assets/icone_supply/main_fabric_black.png"
          />
        );
      case 'Interior Fabric':
        return (
          <img
            alt="interior_fabric"
            src="../../public/assets/icone_supply/interior_fabric_black.png"
          />
        );
      case 'Interling Fabric':
        return (
          <img
            alt="interling_fabric"
            src="../../public/assets/icone_supply/interling_fabric_black.png"
          />
        );
      case 'Closure':
        return (
          <img
            alt="closure"
            src="../../public/assets/icone_supply/closure_black.png"
          />
        );
      case 'Fasteners':
        return (
          <img
            alt="festener_fabric"
            src="../../public/assets/icone_supply/fastener_black.png"
          />
        );
      case 'Ribbon':
        return <FaRibbon />;
      case 'Decoration':
        return <FaPaintBrush />;
      case 'Accessory':
        return <FaPuzzlePiece />;
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
    return (
      <div className="w-2/6 m-2 border">
        {Icon}
        {category}: {formatListText(value)}
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
                      'Main Fabric',
                      supply.attributes.main_fabric,
                      'Main Fabric'
                    )}
                    {renderProductAttribute(
                      'Interior Fabric',
                      supply.attributes.interior_fabric,
                      'Interior Fabric'
                    )}
                    {renderProductAttribute(
                      'Interling Fabric',
                      supply.attributes.interling_fabric,
                      'Interling Fabric'
                    )}
                    {renderProductAttribute(
                      'Closure',
                      supply.attributes.closure,
                      'Closure'
                    )}
                    {renderProductAttribute(
                      'Fasteners',
                      supply.attributes.fastener,
                      'Fasteners'
                    )}
                    {renderProductAttribute(
                      'Ribbon',
                      supply.attributes.ribbon,
                      'Ribbon'
                    )}
                    {renderProductAttribute(
                      'Decoration',
                      supply.attributes.decoration,
                      'Decoration'
                    )}
                    {renderProductAttribute(
                      'Accessory',
                      supply.attributes.accessory,
                      'Accessory'
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
