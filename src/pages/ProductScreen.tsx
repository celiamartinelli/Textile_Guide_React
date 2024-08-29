import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

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
  const [page, setPage] = useState(1);
  const [pageSize] = useState(25); // Nombre de résultats par page
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts(page); // Charger les produits lors du changement de page
  }, [page]);

  const fetchProducts = (currentPage: number) => {
    fetch(
      `https://supreme-rainbow-f7999372d6.strapiapp.com/api/products?populate=icone_product&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}&sort=name:asc`
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setAllProducts(data.data);
          setFilteredProducts(data.data); // Affiche tous les produits initialement
          setTotalPages(data.meta.pagination.pageCount); // Met à jour le nombre total de pages
        } else {
          console.error('Expected an array for products:', data);
        }
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
      });
  };

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
              className="rounded-md p-2 m-2 bg-white dark:bg-darkPruneBG  text-brown dark:text-white shadow-inner transition-colors duration-500"
              type="text"
              placeholder="Rechercher"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="bg-cream dark:bg-darkSage dark:hover:bg-sage dark:text-white p-2 rounded-md text-brown mr-2 transition-colors duration-500"
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
                className="w-18 h-18 flex flex-col justify-center items-center border rounded-lg p-3 shadow-lg m-3 bg-lightBackground hover:bg-lightBackgroundLightHover dark:bg-darkPruneLogo hover:dark:bg-darkPruneBG transition-colors duration-500"
              >
                <Link
                  to={`/products/${product.id}`}
                  className="flex flex-col justify-center items-center"
                >
                  <div className="bg-white bg-opacity-30 rounded-full p-4 shadow transition-colors duration-500">
                    <img
                      // src={`http://localhost:1337${product.attributes.icone_product.data?.[0]?.attributes?.url}`}
                      src={`https://supreme-rainbow-f7999372d6.strapiapp.com${product.attributes.icone_product.data?.[0]?.attributes?.url}`}
                      alt={product.attributes.name}
                      className="h-16 rounded-lg"
                    />
                  </div>
                  <p className="text-center w-24 text-sm">
                    {product.attributes.name}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="mx-2 px-4 py-2 bg-lightBackground  rounded hover:bg-darkBackgroundLight hover:dark:bg-lightPrune  dark:bg-darkPruneBG transition-colors duration-500"
            aria-label="Précédent"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span className="mx-2">
            Page {page} sur {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="mx-2 px-4 py-2 bg-lightBackground hover:bg-darkBackgroundLight rounded hover:dark:bg-lightPrune  dark:bg-darkPruneBG transition-colors duration-500"
            aria-label="Suivant"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
