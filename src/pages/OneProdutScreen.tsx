import Header from '@/components/Header/Header';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface RouteParams {
  productId: string;
}

interface ProductIcon {
  id: string;
  attributes: {
    url: string;
  };
}

interface RelatedProject {
  id: string;
  attributes: {
    name: string;
    icone_project: {
      data: ProductIcon[];
    };
  };
}

interface ProductAttributes {
  name: string;
  category: string;
  description: string;
  icone_product: {
    data: ProductIcon[];
  };
  relatedProjects?: {
    data: RelatedProject[];
  };
}

interface Product {
  id: string;
  attributes: ProductAttributes;
}

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
      data: Product[];
    };
  };
};

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

const OneProductScreen: React.FC = () => {
  const { productId } = useParams() as unknown as RouteParams;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        console.log(`Fetching product with ID: ${productId}`);
        const response = await fetch(
          `http://localhost:1337/api/products/${productId}?populate[0]=icone_product&populate[1]=relatedProjects&populate[2]=fabrics`
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
      <div className="flex flex-col h-screen border bg-pink">
        <div className="flex flex-col justify-center items-center bg-lightPink">
          <h1 className="bg-blue-200">{product.attributes.name}</h1>
        </div>
        <div className="flex flex-col bg-lightPink">
          {product.attributes.icone_product?.data &&
            product.attributes.icone_product.data.length > 0 && (
              <img
                src={`http://localhost:1337${product.attributes.icone_product.data[0].attributes.url}`}
                alt={product.attributes.name}
                className="w-20 h-20 rounded-lg"
              />
            )}
          <div>
            <p>{product.attributes.description}</p>
            <p>{product.attributes.category}</p>
          </div>

          <h2>Tissus Associés</h2>
          <ul>
            {product.attributes.relatedProjects?.data?.map((project) => (
              <li key={project.id}>
                <p>{project.attributes.name}</p>
                {project.attributes.icone_project?.data?.map((picture) => (
                  <img
                    key={picture.id}
                    src={`http://localhost:1337${picture.attributes.url}`}
                    alt="project"
                    className="w-10 h-10"
                  />
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OneProductScreen;
