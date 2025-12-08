// src/pages/OneProductScreen.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ButtonInfoLevelSewing from '@/components/Button/ButtonInfoLevelSewing';
import ModalShowMoreInfosLevel from '@/components/Modal/OneProduct/ModalShowMoreInfosLevel';
import { supabase } from '../../supabaseClient.js';

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
  ribbon?: string;
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
        // Récupère produit + relations via Supabase
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

        // Formatage des données
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

  const formatListText = (text: string | undefined) => {
    if (!text) return null;
    return text.split(',').map((it, idx) => (
      <li key={idx} className="text-xs">
        {it.trim()}
      </li>
    ));
  };

  const renderProductSupply = (supply: SupplyQuantity) => {
    const isValid = (value: string | undefined) =>
      value && value.trim() !== '' && value !== 'N/A';
    return (
      <div key={supply.id} className="m-2 border p-2 rounded-md">
        {isValid(supply.main_fabric) && (
          <div>
            {t('oneProduct.supply_category.main_fabric')}: {supply.main_fabric}
          </div>
        )}
        {isValid(supply.interior_fabric) && (
          <div>
            {t('oneProduct.supply_category.interior_fabric')}:{' '}
            {supply.interior_fabric}
          </div>
        )}
        {isValid(supply.interling_fabric) && (
          <div>
            {t('oneProduct.supply_category.interling_fabric')}:{' '}
            {supply.interling_fabric}
          </div>
        )}
        {isValid(supply.closure) && (
          <div>
            {t('oneProduct.supply_category.closure')}: {supply.closure}
          </div>
        )}
        {isValid(supply.fastener) && (
          <div>
            {t('oneProduct.supply_category.fastener')}: {supply.fastener}
          </div>
        )}
        {isValid(supply.ribbon) && (
          <div>
            {t('oneProduct.supply_category.ribbon')}: {supply.ribbon}
          </div>
        )}
        {isValid(supply.decoration) && (
          <div>
            {t('oneProduct.supply_category.decoration')}: {supply.decoration}
          </div>
        )}
        {isValid(supply.accessory) && (
          <div>
            {t('oneProduct.supply_category.accessory')}: {supply.accessory}
          </div>
        )}
        {supply.pocket && (
          <div>{t('oneProduct.supply_category.pocket_fabric')}</div>
        )}
        {isValid(supply.pocket_fabric) && (
          <div>
            {t('oneProduct.supply_category.pocket_fabric')}:{' '}
            {supply.pocket_fabric}
          </div>
        )}
        {isValid(supply.pocket_closure) && (
          <div>
            {t('oneProduct.supply_category.pocket_closure')}:{' '}
            {supply.pocket_closure}
          </div>
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
              <h3>{t('oneProduct.quantity_textile_required')}</h3>
              <table className="table-auto mx-auto">
                <tbody>
                  {product.textile_quantity_required.split(',').map((q, i) => {
                    const [size, amount] = q.split(':');
                    return (
                      <tr key={i}>
                        <th className="px-4 py-2">{size}</th>
                        <td className="px-4 py-2">{amount}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Level */}
          <div className="my-6 flex justify-center items-center">
            <div className="border-2 rounded-lg p-5 pr-2">
              <div className="flex flex-col mr-2">
                <h2 className="mb-2">{t('oneProduct.h2level')}</h2>
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
            <ul className="flex flex-wrap justify-center">
              {(product.fabrics || []).map((f) => (
                <li key={f.id} className="mx-2 w-24">
                  <Link
                    to={`/fabrics/${f.id}`}
                    className="flex flex-col items-center"
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
