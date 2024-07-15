import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

type ProductIcon = {
  id: number;
  attributes: {
    url: string;
  };
};

type Product = {
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

const ProductScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Récupère tous les produits lorsque le composant est monté
    fetch(`http://localhost:1337/api/products?populate=icone_product`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setAllProducts(data.data);
          setFilteredProducts(data.data); // Affiche tous les produits initialement
        } else {
          console.error('Expected an array for products:', data);
        }
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
      });
  }, []);

  useEffect(() => {
    // Affine les résultats de la recherche
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const results = allProducts.filter((product) =>
          product.attributes.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredProducts(results);
      } else {
        setFilteredProducts(allProducts);
      }
    }, 300); // délai de 300ms avant d'affiner la recherche

    return () => clearTimeout(delayDebounceFn);
  }, [search, allProducts]);

  return (
    <div className="pb-20">
      <div className="flex flex-col min-h-screen text-white">
        <div className="flex flex-col justify-center items-center pt-12 mt-36">
          <h1 className="mb-3">Projets:</h1>
          <div className="border-2 rounded-lg">
            <input
              className="rounded-md p-2 m-2 bg-white text-brown"
              type="text"
              placeholder="Rechercher"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="bg-cream p-2 rounded-md text-brown mr-2"
              type="button"
              onClick={() => setSearch(search)}
              aria-label="Rechercher"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </div>
        <div>
          <ul className="flex flex-row flex-wrap justify-center">
            {filteredProducts.map((product) => (
              <li
                key={product.id}
                className="w-18 h-18 flex flex-col justify-center items-center border rounded-lg p-3 shadow-lg m-3 bg-lightBackground hover:bg-lightBackgroundLightHover dark:bg-darkBackground hover:dark:bg-darkBackgroundLightHover"
              >
                <Link
                  to={`/products/${product.id}`}
                  className="flex flex-col justify-center items-center"
                >
                  <img
                    src={`http://localhost:1337${product.attributes.icone_product.data?.[0]?.attributes?.url}`}
                    alt={product.attributes.name}
                    className="h-16 rounded-lg"
                  />
                  <p className="text-center w-24 text-sm">
                    {product.attributes.name}
                  </p>
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
