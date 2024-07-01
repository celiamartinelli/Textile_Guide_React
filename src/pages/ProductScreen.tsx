import Header from '@/components/Header/Header';

import React, { useState, useEffect } from 'react';
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

type ProductSearchResult = {
  id: number;
  name: string;
  iconUrl: string;
};

type Products = {
  id: number;
  attributes: {
    name: string;
    category: string;
    description: string;
    icone_product: {
      data: Array<{
        attributes: {
          url: string;
        };
      }>;
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
const ProductScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [projects, setProjects] = useState<ProductSearchResult[]>([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        handleSearch();
      } else {
        setProjects([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleSearch = () => {
    console.log('search:', search);
    fetch(
      `http://localhost:1337/api/products?filters[name][$containsi]=${search}&populate=icone_product`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data.data)) {
          console.error('Expected an array for products:', data);
          return;
        }
        console.log('data:', data.data);
        // Mise à jour de l'état avec les produits trouvés
        setProjects(
          data.data.map((product: Products) => ({
            id: product.id,
            name: product.attributes.name,
            iconUrl:
              product.attributes.icone_product.data?.[0]?.attributes?.url ||
              'defaultIconUrl',
          }))
        );
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
      });
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col h-screen border bg-pink">
        <div className="flex flex-col justify-center items-center bg-lightPink">
          <h1 className="bg-blue-200">ProductScreen</h1>

          <h2 className="bg-green-200">Products</h2>
          <h3 className="bg-yellow-200">Par Projets:</h3>
          <div>
            <input
              className="bg-gray-200"
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                // console.log('Search value:', e.target.value);
              }}
            />
            <button
              className="bg-violet-300"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        <div>
          <ul className="flex flex-row flex-wrap">
            {projects.map((project) => (
              <li key={project.id}>
                <Link
                  to={`/products/${project.id}`}
                  className="flex flex-col justify-center items-center border rounded-lg p-4 shadow-lg m-5 bg-lightPink"
                >
                  <img
                    src={`http://localhost:1337${project.iconUrl}`}
                    alt={project.name}
                    className="w-20 h-20 rounded-lg"
                  />
                  <p className="justify-center items-center">{project.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
