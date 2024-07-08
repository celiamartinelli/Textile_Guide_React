import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
      data: any[]; // Update based on actual structure
    };
  };
}

interface ProductAttributes {
  name: string;
  category: string;
  description: string;
  textile_quantity_required: string;
  icone_product: {
    data: ProductIcon[];
  };
  fabrics?: {
    data: Fabric[];
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
          `http://localhost:1337/api/products/${productId}?populate[icone_product][populate]=*&populate[fabrics][populate][0]=picture_fabric&populate[fabrics][populate][1]=washes.icone`
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

        setProduct(result.data);
        console.log('Product:', result.data);
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

  return (
    <div>
      <Header />
      <div className="flex flex-col h-screen mx-3 pt-12 mt-36 md:w-2/4 mx-auto">
        <div className="flex flex-col justify-center items-center">
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
              <p>{product.attributes.category}</p>
              <div className="">
                <h4>Quantité de tissus nécessaire:</h4>
                <p className="border-2 rounded-md bg-cream">
                  {product.attributes.textile_quantity_required}
                </p>
                <p>pour une laize de 1,5m</p>
              </div>
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OneProductScreen;
