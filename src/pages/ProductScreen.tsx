import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  product_img_url: string | null;
};

const ProductScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 25;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const fetchProducts = async (currentPage: number) => {
    const from = (currentPage - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await supabase
      .from('products')
      .select('*', { count: 'exact' })
      .order('name', { ascending: true })
      .range(from, to);

    if (error) {
      console.error('Erreur Supabase :', error);
      return;
    }

    setAllProducts(data as Product[]);
    setFilteredProducts(data as Product[]);

    if (count) {
      setTotalPages(Math.ceil(count / pageSize));
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const results = allProducts.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredProducts(results);
      } else {
        setFilteredProducts(allProducts);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, allProducts]);

  return (
    <div className="pb-20">
      <div className="flex flex-col min-h-screen text-white">
        <div className="flex flex-col justify-center items-center pt-12 mt-36">
          <h1 className="mb-3">Projets:</h1>
          <div className="border-2 rounded-lg">
            <input
              className="rounded-md p-2 m-2 bg-white dark:bg-darkPruneBG text-brown dark:text-white shadow-inner transition-colors duration-500"
              type="text"
              placeholder="Rechercher"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="bg-cream dark:bg-darkSage p-2 rounded-md text-brown mr-2 transition-colors duration-500"
              type="button"
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
                className="w-18 h-18 flex flex-col justify-start items-center border rounded-lg p-3 shadow-lg m-3 bg-lightBackground hover:bg-lightBackgroundLightHover dark:bg-darkPruneLogo hover:dark:bg-darkPruneBG transition-colors duration-500"
              >
                <Link
                  to={`/products/${product.id}`}
                  className="flex flex-col justify-center items-center"
                >
                  <div className="bg-white bg-opacity-70 rounded-full p-4 shadow transition-colors duration-500">
                    <img
                      src={product.product_img_url ?? '/no-image.png'}
                      alt={product.name}
                      className="h-16 rounded-lg"
                    />
                  </div>
                  <p className="text-center w-24 text-sm">{product.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            aria-label="Page précédente"
            className="mx-2 px-4 py-2 bg-lightBackground dark:bg-darkPruneBG rounded"
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
            aria-label="Page suivante"
            className="mx-2 px-4 py-2 bg-lightBackground dark:bg-darkPruneBG rounded"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
