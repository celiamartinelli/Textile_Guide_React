// src/pages/OneProductScreen.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ButtonInfoLevelSewing from '@/components/Button/ButtonInfoLevelSewing';
import ModalShowMoreInfosLevel from '@/components/Modal/OneProduct/ModalShowMoreInfosLevel';
import { supabase } from '../../supabaseClient.js'; // Assurez-vous que le chemin est correct

interface Level {
  id: number | string;
  name_level?: string;
  description?: string;
  // si ta table levels a plus de champs, ajoute-les ici
}

interface Fabric {
  id: number;
  name?: string;
  picture_url?: string | null;
  description?: string;
  benefit?: string;
  characteristic?: string;
  // etc.
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
  // etc.
}

interface ProductRow {
  id: number;
  name?: string;
  category?: string;
  second_category?: string;
  description?: string;
  textile_quantity_required?: string | null;
  icon_url?: string | null; // si tu as une colonne icon_url
  // relations possibles (peuvent être undefined si non renseignées)
  fabrics?: Fabric[];
  supplies_quantities?: SupplyQuantity[];
  level_sewing?: Level[]; // ou level_sewings
}

const OneProductScreen: React.FC = () => {
  const { t } = useTranslation();
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [allLevels, setAllLevels] = useState<Level[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);

  // si tu stockes des assets ailleurs, adapte la baseURL
  // const storageBaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';

  useEffect(() => {
    if (!productId) return;

    const idNum = isNaN(Number(productId)) ? productId : Number(productId);

    async function fetchProduct() {
      setLoading(true);

      // 1) tentative : récupérer le produit + relations en une requête (si FK/relations configurées)
      try {
        const { data, error } = await supabase
          .from('products')
          .select(
            `
              id,
              name,
              category,
              second_category,
              description,
              textile_quantity_required,
              icon_url,
              fabrics ( id, name, picture_url, description ),
              supplies_quantities ( id, main_fabric, interior_fabric, interling_fabric, closure, fastener, ribbon, decoration, accessory, pocket, pocket_fabric, pocket_closure ),
              level_sewing ( id, name_level, description )
            `
          )
          .eq('id', idNum)
          .single();

        if (error && error.code !== 'PGRST116') {
          // PGRST116 = maybe no relation or other; on log pour debug
          console.error('Supabase select with relations error:', error);
        }

        if (data) {
          // Data contient déjà la structure souhaitée si relations existantes
          const mapped: ProductRow = {
            id: data.id,
            name: data.name,
            category: data.category,
            second_category: data.second_category,
            description: data.description,
            textile_quantity_required: data.textile_quantity_required,
            icon_url: data.icon_url ?? null,
            fabrics: Array.isArray(data.fabrics)
              ? data.fabrics.map((f: any) => ({
                  id: f.id,
                  name: f.name,
                  picture_url: f.picture_url ?? null,
                  description: f.description,
                }))
              : [],
            supplies_quantities: Array.isArray(data.supplies_quantities)
              ? data.supplies_quantities
              : [],
            level_sewing: Array.isArray(data.level_sewing)
              ? data.level_sewing
              : [],
          };

          setProduct(mapped);
          setLoading(false);

          // si niveau présent et tu veux remplir allLevels pour le modal
          if (mapped.level_sewing && mapped.level_sewing.length > 0) {
            setAllLevels(mapped.level_sewing as Level[]);
          }

          return;
        }
      } catch (err) {
        console.error('Erreur fetch produit (attempt relations):', err);
      }

      // 2) fallback si la requête ensembre n'a pas fonctionné : on récupère séparément
      try {
        const { data: productOnly, error: pErr } = await supabase
          .from('products')
          .select(
            'id, name, category, second_category, description, textile_quantity_required, icon_url'
          )
          .eq('id', idNum)
          .single();

        if (pErr) {
          console.error('Erreur fetch product only:', pErr);
          setLoading(false);
          return;
        }

        const mapped: ProductRow = {
          id: productOnly.id,
          name: productOnly.name,
          category: productOnly.category,
          second_category: productOnly.second_category,
          description: productOnly.description,
          textile_quantity_required: productOnly.textile_quantity_required,
          icon_url: productOnly.icon_url ?? null,
          fabrics: [],
          supplies_quantities: [],
          level_sewing: [],
        };

        // Récupérer fabrics : on tente un filtre direct product_id
        try {
          const { data: fabricsData, error: fErr } = await supabase
            .from('fabrics')
            .select('id, name, picture_url, description')
            .eq('product_id', idNum); // si tu as product_id dans fabrics

          if (!fErr && Array.isArray(fabricsData) && fabricsData.length > 0) {
            mapped.fabrics = fabricsData.map((f: any) => ({
              id: f.id,
              name: f.name,
              picture_url: f.picture_url ?? null,
              description: f.description,
            }));
          } else {
            // si pas de product_id, peut-être relation via table pivot product_fabrics
            const { data: pf, error: pfErr } = await supabase
              .from('product_fabrics')
              .select('fabric_id')
              .eq('product_id', idNum);

            if (!pfErr && Array.isArray(pf) && pf.length > 0) {
              const fabricIds = pf.map((r: any) => r.fabric_id);
              const { data: fabricsByIds } = await supabase
                .from('fabrics')
                .select('id, name, picture_url, description')
                .in('id', fabricIds);

              if (Array.isArray(fabricsByIds)) {
                mapped.fabrics = fabricsByIds.map((f: any) => ({
                  id: f.id,
                  name: f.name,
                  picture_url: f.picture_url ?? null,
                  description: f.description,
                }));
              }
            }
          }
        } catch (fabricErr) {
          console.error('Erreur fetch fabrics fallback:', fabricErr);
        }

        // Récupérer supplies_quantities (on suppose product_id sur supplies_quantities)
        try {
          const { data: suppliesData, error: sErr } = await supabase
            .from('supplies_quantities')
            .select('*')
            .eq('product_id', idNum);

          if (!sErr && Array.isArray(suppliesData)) {
            mapped.supplies_quantities = suppliesData;
          }
        } catch (sErr2) {
          console.error('Erreur fetch supplies fallback:', sErr2);
        }

        // Récupérer level(s) lié(s)
        try {
          // cas: table level_sewing avec product_id
          const { data: lvData, error: lvErr } = await supabase
            .from('level_sewings')
            .select('*')
            .eq('product_id', idNum);

          if (!lvErr && Array.isArray(lvData) && lvData.length > 0) {
            mapped.level_sewing = lvData.map((l: any) => ({
              id: l.id,
              name_level: l.name_level ?? l.name,
              description: l.description ?? null,
            })) as any;
            setAllLevels(mapped.level_sewing as Level[]);
          } else {
            // cas pivot product_level_sewing ou colonne level_id
            const { data: productLevel, error: plErr } = await supabase
              .from('product_level_sewings')
              .select('level_sewing_id')
              .eq('product_id', idNum);

            if (
              !plErr &&
              Array.isArray(productLevel) &&
              productLevel.length > 0
            ) {
              const levelIds = productLevel.map((r: any) => r.level_sewing_id);
              const { data: levels } = await supabase
                .from('level_sewings')
                .select('*')
                .in('id', levelIds);

              if (Array.isArray(levels)) {
                mapped.level_sewing = levels.map((l: any) => ({
                  id: l.id,
                  name_level: l.name_level ?? l.name,
                  description: l.description ?? null,
                })) as any;
                setAllLevels(mapped.level_sewing as Level[]);
              }
            }
          }
        } catch (lvErr2) {
          console.error('Erreur fetch levels fallback:', lvErr2);
        }

        setProduct(mapped);
      } catch (err2) {
        console.error('Erreur fetch product fallback:', err2);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  if (loading) return <div>Chargement...</div>;
  if (!product) return <div>Produit introuvable</div>;

  // helper pour afficher l'image (gère url absolue ou chemin enregistré)
  const renderIcon = () => {
    if (product.icon_url) {
      // si icon_url est déjà une URL publique
      return (
        <img
          src={product.icon_url}
          alt={product.name}
          className="w-24 h-24 rounded-lg m-2 mx-auto"
        />
      );
    }
    // si tu utilises Supabase Storage et que tu as saved path, adapte ici
    // example: storage path "icons/filename.png" => `${storageBaseUrl}/storage/v1/object/public/icons/filename.png`
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
    // exemple simple pour afficher les champs non null
    return (
      <div key={supply.id} className="m-2">
        {supply.main_fabric && <div>Main: {supply.main_fabric}</div>}
        {supply.interior_fabric && (
          <div>Interior: {supply.interior_fabric}</div>
        )}
        {/* ajoute le reste */}
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
            <p> - </p>
            <p>{product.second_category}</p>
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
                    {f.picture_url ? (
                      <img
                        src={f.picture_url}
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
                renderProductSupply(supply as SupplyQuantity)
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
