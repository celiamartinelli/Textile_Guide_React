// src/pages/OneProductScreen.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AiOutlineColumnWidth } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalShowMoreInfosLevel from '@/components/Modal/OneProduct/ModalShowMoreInfosLevel';
import ButtonInfoLevelSewing from '@/components/Button/ButtonInfoLevelSewing';
import { supabase } from '../../supabaseClient.js';
import { useDarkMode } from '@/components/App/DarkModeContext';

interface RouteParams {
  productId: string;
}

interface Level {
  id: number | string;
  name_level?: string;
  description?: string;
}

interface Fabric {
  id: number;
  name?: string;
  fabric_img_url?: string | null;
  description?: string;
}

interface SupplyQuantity {
  id: number;
  main_fabric?: string;
  interior_fabric?: string;
  interling_fabric?: string;
  closure?: string;
  fastener?: string;
  ribbons?: string;
  decoration?: string;
  accessory?: string;
  pocket?: boolean;
  pocket_fabric?: string;
  pocket_closure?: string;
}

interface ProductRow {
  id: number;
  name?: string;
  category?: string;
  second_category?: string;
  description?: string;
  textile_quantity_required?: string | null;
  product_img_url?: string | null;
  fabrics?: Fabric[];
  supplies_quantities?: SupplyQuantity[];
  level_sewing?: Level[];
}

const OneProductScreen: React.FC = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useDarkMode(); // récupère le dark mode
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [allLevels, setAllLevels] = useState<Level[]>([]);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      setLoading(true);
      const idNum = isNaN(Number(productId)) ? productId : Number(productId);

      try {
        const { data, error } = await supabase
          .from('products')
          .select(
            `
            *,
            products_fabrics_links (
              fabric: fabrics(*),
              product_order,
              fabric_order
            ),
            products_supplies_quantities_links(
              supply: supplies_quantities(*)
            ),
            products_level_sewing_links (
              level: level_sewings(*),
              level_sewing_order
            )
          `
          )
          .eq('id', idNum)
          .single();

        if (error) {
          console.error('Supabase fetch error:', error);
          setLoading(false);
          return;
        }

        const formatted: ProductRow = {
          id: data.id,
          name: data.name,
          category: data.category,
          second_category: data.second_category,
          description: data.description,
          textile_quantity_required: data.textile_quantity_required,
          product_img_url: data.product_img_url ?? null,
          fabrics:
            data.products_fabrics_links?.map((link: any) => ({
              id: link.fabric.id,
              name: link.fabric.name,
              fabric_img_url: link.fabric.fabric_img_url ?? null,
              description: link.fabric.description,
            })) || [],
          supplies_quantities:
            data.products_supplies_quantities_links?.map(
              (link: any) => link.supply
            ) || [],
          level_sewing:
            data.products_level_sewing_links?.map((link: any) => ({
              id: link.level.id,
              name_level: link.level.name_level,
              description: link.level.description,
            })) || [],
        };

        setProduct(formatted);
        setAllLevels(formatted.level_sewing || []);
      } catch (err) {
        console.error('Erreur fetch product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div>{t('loading')}</div>;
  if (!product) return <div>{t('oneProduct.notFound')}</div>;

  const renderIcon = () => {
    if (product.product_img_url) {
      return (
        <img
          src={product.product_img_url}
          alt={product.name}
          className="w-24 h-24 rounded-lg m-2 mx-auto"
        />
      );
    }
    return null;
  };

  // format supply text splitting by '(l)' like dans l'ancien code
  const formatSupplyText = (text: string) => {
    return text.split('(l)').map((part, index) => {
      if (index === 0) {
        return part;
      }
      return (
        <React.Fragment key={index}>
          <div className="flex items-center justify-center">
            <span className="inline-flex items-center">
              <AiOutlineColumnWidth className="mx-2" />
            </span>
            {part}
          </div>
        </React.Fragment>
      );
    });
  };

  const formatListText = (text?: string | null) => {
    if (!text) return null;
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
    | 'accessory'
    | 'pocket_fabric'
    | 'pocket_closure';

  // const isDevelopment = (import.meta as any).env?.VITE_ENV === 'development';

  function getIconForCategory(category: CategoryType) {
    const basePath = '/assets/Icone_supply'; // chemin depuis public/

    const iconMap: Record<CategoryType, string> = {
      main_fabric: 'main_fabric_black.png',
      interior_fabric: 'interior_fabric_black.png',
      interling_fabric: 'interling_fabric_black.png',
      closure: 'closure_black.png',
      fastener: 'fastener_black.png',
      ribbon: 'ribbons_black.png',
      decoration: 'decoration_black.png',
      accessory: 'access_black.png',
      pocket_fabric: 'pocket_fabric_black.png',
      pocket_closure: 'pocket_closure_black.png',
    };

    const iconFile = iconMap[category];
    if (!iconFile) return null;

    return (
      <img
        className="w-16 h-16 sm:w-24 sm:h-24"
        alt={category}
        src={`${basePath}/${iconFile}`}
      />
    );
  }

  function renderProductAttribute(
    _title: string,
    value: string | undefined | null,
    category: CategoryType
  ) {
    if (!value || value === 'N/A') {
      return null;
    }
    const Icon = getIconForCategory(category);
    const translatedCategory = t(`oneProduct.supply_category.${category}`);
    const formattedText = formatListText(value);

    return (
      <div
        className="w-full border-2 rounded-lg p-4 bg-lightBackground dark:bg-darkPruneLogo flex flex-row items-center my-3 justify-center"
        aria-hidden="false"
      >
        <div className="mx-1">{Icon}</div>
        <div className="text-center w-2/3 mx-1">
          <h5 className="mb-2">{translatedCategory}:</h5> {formattedText}
        </div>
      </div>
    );
  }

  const renderProductSupply = (supply: SupplyQuantity) => {
    return (
      <div
        key={supply.id}
        className="flex flex-wrap justify-center items-center"
      >
        {renderProductAttribute(
          'main_fabric',
          supply.main_fabric,
          'main_fabric'
        )}
        {renderProductAttribute(
          'interior_fabric',
          supply.interior_fabric,
          'interior_fabric'
        )}
        {renderProductAttribute(
          'interling_fabric',
          supply.interling_fabric,
          'interling_fabric'
        )}
        {renderProductAttribute('closure', supply.closure, 'closure')}
        {renderProductAttribute('fastener', supply.fastener, 'fastener')}
        {renderProductAttribute('ribbons', supply.ribbons, 'ribbon')}
        {renderProductAttribute('decoration', supply.decoration, 'decoration')}
        {renderProductAttribute('accessory', supply.accessory, 'accessory')}
        {supply.pocket && (
          <>
            {renderProductAttribute(
              'pocket_fabric',
              supply.pocket_fabric,
              'pocket_fabric'
            )}
            {renderProductAttribute(
              'pocket_closure',
              supply.pocket_closure,
              'pocket_closure'
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="pb-20">
      <div className="flex flex-col min-h-screen mx-6 pt-12 mt-36 ">
        <h1 className="font-bold text-3xl text-white mb-4 text-center">
          {product.name}
        </h1>

        <div className="text-center">
          {renderIcon()}

          <div className="flex justify-center text-xs mb-6">
            <p>{product.category}</p>
            {product.second_category && (
              <>
                <p> - </p>
                <p>{product.second_category}</p>
              </>
            )}
          </div>

          <p>{product.description}</p>

          {/* textile quantities */}
          {product.textile_quantity_required && (
            <div className="my-6">
              <div className="flex justify-center my-6">
                <div className="border-2 rounded-md">
                  <table className="table-auto w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="px-4 py-2 text-center" colSpan={2}>
                          {t('oneProduct.quantity_textile_required')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.textile_quantity_required
                        .split(',')
                        .map((quantity, index) => {
                          const [sizeRaw, amountRaw] = quantity.split(':');
                          const size = sizeRaw?.trim();
                          const amount = amountRaw?.trim();
                          return (
                            <tr
                              key={index}
                              className="border-b border-gray-200"
                            >
                              <th className="px-4 py-2 text-left border-r border-gray-200">
                                {size}
                              </th>
                              <td className="px-4 py-2 text-left">{amount}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td className="px-4 py-2 text-center" colSpan={2}>
                          {t('oneProduct.laize')}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Level */}
          <div className="my-6 flex justify-center items-center">
            <div className="flex border-2 rounded-lg items-center p-5 pr-2">
              <div className="flex flex-col mr-2">
                <h2 className="mb-2"> {t('oneProduct.h2level')}</h2>
                <p className="bg-cream rounded-full p-2 dark:bg-darkSage">
                  {product.level_sewing && product.level_sewing[0]?.name_level}
                </p>
              </div>
              <ButtonInfoLevelSewing />
            </div>
          </div>

          {/* Fabrics */}
          <div className="my-6">
            <h2 className="font-bold text-3xl text-white mb-4 text-center">
              {t('oneProduct.h2Fabric')}
            </h2>
            <ul className="flex flex-wrap justify-center items-start">
              {(product.fabrics || []).map((f) => (
                <li
                  className="flex flex-col justify-center items-center mb-2"
                  key={f.id}
                >
                  <Link
                    to={`/fabrics/${f.id}`}
                    className="flex flex-col justify-center items-center mx-2 w-24"
                  >
                    {f.fabric_img_url ? (
                      <img
                        src={f.fabric_img_url}
                        alt={f.name}
                        className="w-20 h-20 rounded-lg m-2"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 rounded m-2" />
                    )}
                    <p className="text-center">{f.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Supplies */}
          <div className="my-6">
            <h2 className="font-bold text-3xl text-white mb-4 text-center">
              {t('oneProduct.h2AssociatedSupply')}
            </h2>
            <div className="flex flex-wrap justify-center">
              {(product.supplies_quantities || []).map((supply) =>
                renderProductSupply(supply)
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <ModalShowMoreInfosLevel
          levels={allLevels}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default OneProductScreen;
