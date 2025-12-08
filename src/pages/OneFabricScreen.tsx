import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import ButtonInfoLevelSewing from '@/components/Button/ButtonInfoLevelSewing';
import { useTranslation } from 'react-i18next';

const OneFabricScreen: React.FC = () => {
  const { t } = useTranslation();
  const { fabricId } = useParams();
  const [fabric, setFabric] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    fetchFabric();
  }, [fabricId]);

  const fetchFabric = async () => {
    const { data, error } = await supabase
      .from('fabrics')
      .select(
        `
        *,
        fabrics_washes_links(
          wash: washes(*),
          wash_order,
          fabric_order
        ),
        products_fabrics_links(
          product: products(*),
          product_order,
          fabric_order
        ),
        fabrics_level_sewing_links(
          level: level_sewings(*),
          level_sewing_order
        ),
        weave_of_fabrics_fabrics_links(
          weave: weave_of_fabrics(*),
          weave_of_fabric_order,
          fabric_order
        ),
        fabrics_categories_links(
          category: categories(*),
          category_order,
          fabric_order
        )
      `
      )
      .eq('id', fabricId)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    // Reformate les données pour simplifier l'affichage
    const formattedData = {
      ...data,
      washes: data.fabrics_washes_links?.map((link: any) => link.wash) || [],
      products:
        data.products_fabrics_links?.map((link: any) => link.product) || [],
      level_sewing: data.fabrics_level_sewing_links?.[0]?.level || null,
      weave_of_fabrics: data.weave_of_fabrics_fabrics_links?.[0]?.weave || null,
      categories:
        data.fabrics_categories_links?.map((link: any) => link.category) || [],
    };

    setFabric(formattedData);
  };

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  if (!fabric) return <div>{t('loading')}</div>;

  return (
    <div className="pb-20">
      <div className="flex flex-col h-full mx-3 pt-12 mt-24 md:mt-32">
        {/* Image et nom */}
        <img
          src={fabric.fabric_img_url || '/no-image.png'}
          alt={fabric.name}
          className="w-40 h-40 rounded-lg mx-auto"
        />
        <h1 className="text-white text-3xl font-bold text-center mt-4">
          {fabric.name}
        </h1>
        <p className="text-center">{fabric.description}</p>

        {/* Composition */}
        <div className="mt-6 text-center">
          <h3 className="font-bold text-xl mb-2">{t('oneFabric.h41')}</h3>
          <p>{fabric.composition}</p>
        </div>

        {/* Caractéristiques */}
        <div className="mt-6 text-center">
          <h3 className="font-bold text-xl mb-2">{t('oneFabric.h42')}</h3>
          <p>{fabric.characteristic}</p>
        </div>

        {/* Niveau de couture */}
        <div className="mt-6 text-center">
          <h3 className="font-bold text-xl mb-2">
            {t('oneFabric.h47')} <ButtonInfoLevelSewing />
          </h3>
          <p>{fabric.level_sewing?.name_level || t('oneFabric.noLevel')}</p>
        </div>

        {/* Armure */}
        <div className="mt-6 text-center">
          <h3 className="font-bold text-xl mb-2">{t('oneFabric.h48')}</h3>
          <p>
            {fabric.weave_of_fabrics?.category || t('oneFabric.noCategory')}
          </p>
          <p>{fabric.weave_of_fabrics?.name || t('oneFabric.noName')}</p>
        </div>

        {/* Washes */}
        <div className="mt-6 text-center">
          <h3 className="font-bold text-xl mb-4">{t('oneFabric.h51')}</h3>
          <ul className="flex justify-center flex-wrap">
            {fabric.washes.map((wash: any) => (
              <li key={wash.id} className="m-2 text-center">
                <img
                  src={wash.washe_img_url || '/no-image.png'}
                  className="w-12 h-12 mx-auto"
                  alt={wash.name || 'wash'}
                />
                <p className="text-xs mt-1">{wash.description}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Produits liés */}
        <div className="mt-6 text-center">
          <h3 className="font-bold text-xl mb-4">{t('oneFabric.h52')}</h3>
          {fabric.products.length === 0 ? (
            <p>{t('oneFabric.none')}</p>
          ) : (
            <ul className="flex flex-wrap justify-center">
              {fabric.products.map((p: any) => (
                <li key={p.id} className="m-2 text-center">
                  <Link to={`/products/${p.id}`}>
                    <img
                      src={p.product_img_url || '/no-image.png'}
                      alt={p.name}
                      className="w-14 h-14 mx-auto rounded-full"
                    />
                    <p className="mt-1 text-xs">{p.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default OneFabricScreen;
