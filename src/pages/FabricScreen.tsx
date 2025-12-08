import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

type Fabric = {
  id: number;
  name: string;
  description: string;
  fabric_img_url: string | null; // À ajuster selon ta colonne réelle
};

const FabricScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get('page') || '1', 10);

  const [search, setSearch] = useState('');
  const [allFabrics, setAllFabrics] = useState<Fabric[]>([]);
  const [filteredFabrics, setFilteredFabrics] = useState<Fabric[]>([]);
  const [page, setPage] = useState(initialPage);
  const pageSize = 25;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchFabrics(page);
  }, [page]);

  const fetchFabrics = async (currentPage: number) => {
    const from = (currentPage - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await supabase
      .from('fabrics')
      .select('*', { count: 'exact' })
      .order('name', { ascending: true })
      .range(from, to);

    if (error) {
      console.error('Erreur Supabase :', error);
      return;
    }

    setAllFabrics(data as Fabric[]);
    setFilteredFabrics(data as Fabric[]);

    if (count) {
      setTotalPages(Math.ceil(count / pageSize));
    }
  };

  // Recherche
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.length > 0) {
        setFilteredFabrics(
          allFabrics.filter((fabric) =>
            fabric.name.toLowerCase().includes(search.toLowerCase())
          )
        );
      } else {
        setFilteredFabrics(allFabrics);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search, allFabrics]);

  const handlePageChange = (p: number) => {
    setPage(p);
    navigate(`/fabrics?page=${p}`);
  };

  return (
    <div className="pb-20">
      <div className="flex flex-col min-h-screen text-white">
        <div className="flex flex-col justify-center items-center pt-12 mt-36">
          <h1 className="mb-3">Tissus :</h1>

          <div className="border-2 rounded-lg">
            <input
              className="rounded-md p-2 m-2 bg-white dark:bg-darkPruneBG text-brown dark:text-white shadow-inner transition-colors durataion-500"
              placeholder="Rechercher"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              className="bg-cream dark:bg-darkSage p-2 rounded-md text-brown mr-2 transition-colors"
              aria-label="Rechercher"
              title="search"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </div>

        <ul className="flex flex-row flex-wrap justify-center items-start">
          {filteredFabrics.map((fabric) => (
            <li key={fabric.id}>
              <Link
                to={`/fabrics/${fabric.id}`}
                className="flex flex-col justify-center items-center border rounded-lg p-4 shadow-lg m-3 bg-lightBackground dark:bg-darkPruneLogo hover:bg-lightBackgroundLightHover hover:dark:bg-darkPruneBG transition-colors"
              >
                <img
                  src={fabric.fabric_img_url ?? '/no-image.png'}
                  alt={fabric.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />

                <p className="pt-2">{fabric.name}</p>
              </Link>
            </li>
          ))}
        </ul>

        {/* PAGINATION */}
        <div className="flex justify-center items-center mt-4">
          <button
            disabled={page <= 1}
            onClick={() => handlePageChange(page - 1)}
            aria-label="Page précédente"
            title="previous page"
            className="mx-2 px-4 py-2 bg-lightBackground dark:bg-darkPruneBG rounded"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <span className="mx-2">
            Page {page} / {totalPages}
          </span>

          <button
            disabled={page >= totalPages}
            onClick={() => handlePageChange(page + 1)}
            aria-label="Page suivante"
            title="next page"
            className="mx-2 px-4 py-2 bg-lightBackground dark:bg-darkPruneBG rounded"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FabricScreen;
