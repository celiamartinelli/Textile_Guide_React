import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

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
      <div className="flex flex-col h-screen border text-white">
        <div className="flex flex-col justify-center items-center pt-12 mt-36">
          <h1 className="mb-3">Projets:</h1>
          <div className="border-2 rounded-lg ">
            <input
              className=" rounded-md p-2 m-2 bg-white text-brown"
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                // console.log('Search value:', e.target.value);
              }}
            />
            <button
              className="bg-cream p-2 rounded-md text-brown mr-2"
              type="button"
              onClick={handleSearch}
              aria-label="Rechercher"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </div>
        <div>
          <ul className="flex flex-row flex-wrap justify-center">
            {projects.map((project) => (
              <li
                key={project.id}
                className="w-18 h-18 flex flex-col justify-center items-center border rounded-lg p-3 shadow-lg m-3 bg-sage"
              >
                <Link
                  to={`/products/${project.id}`}
                  className="flex flex-col justify-center items-center"
                >
                  <img
                    src={`http://localhost:1337${project.iconUrl}`}
                    alt={project.name}
                    className="h-16 rounded-lg"
                  />
                  <p className="text-center w-24 text-sm">{project.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductScreen;
