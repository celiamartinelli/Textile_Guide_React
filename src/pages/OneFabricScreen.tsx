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
        fabrics_washes_links(wash:washes(*)),
        products_fabrics_links(product:products(*)),
        fabrics_level_sewing_links(level:level_sewings(*)),
        weave_of_fabrics_fabrics_links(weave:weave_of_fabrics(*)),
        fabrics_categories_links(category:categories(*)),
   needle_type_fabrics_links(needle_type:needle_type(*))
      `
      )
      .eq('id', fabricId)
      .single();

    if (error) return console.error(error);

    const formattedData = {
      ...data,
      washes: data.fabrics_washes_links?.map((l: any) => l.wash) || [],
      products: data.products_fabrics_links?.map((l: any) => l.product) || [],
      level_sewing: data.fabrics_level_sewing_links?.[0]?.level || null,
      weave_of_fabrics: data.weave_of_fabrics_fabrics_links?.[0]?.weave || null,
      categories:
        data.fabrics_categories_links?.map((l: any) => l.category) || [],
      name_type:
        data.needle_type_fabrics_links?.[0]?.needle_type?.name_type || '',
      needle_img_url:
        data.needle_type_fabrics_links?.[0]?.needle_type?.needle_img_url || '',
      needle_size:
        data.needle_type_fabrics_links?.[0]?.needle_type?.needle_size || '',
      needle_description:
        data.needle_type_fabrics_links?.[0]?.needle_type?.needle_description ||
        '',
      needle_color:
        data.needle_type_fabrics_links?.[0]?.needle_type?.needle_color || '',
    };

    setFabric(formattedData);
    console.log(
      'Fabric data:',
      data.needle_type_fabrics_links?.[0]?.needle_type
    );
  };

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  if (!fabric) return <div>{t('loading')}</div>;

  // Small utility
  const renderList = (content?: string) =>
    content?.split(',').map((v, i) => <div key={i}>{v.trim()}</div>);

  return (
    <div className="pb-20">
      <div className="flex flex-col mx-3 pt-12 mt-24 md:mt-32">
        {/* IMAGE + TITLE + DESCRIPTION */}
        <div className="flex flex-col items-center mb-8 sm:flex-row sm:justify-center sm:gap-6">
          <img
            src={fabric.fabric_img_url || '/no-image.png'}
            className="w-36 h-36 rounded-lg shadow-md"
            alt={fabric.name}
          />
          <div className="sm:w-1/2 text-center sm:text-left">
            <h1 className="font-bold text-3xl text-white mt-4 sm:mt-0">
              {fabric.name}
            </h1>
            <p className="mt-3">{fabric.description}</p>
          </div>
        </div>

        {/* TABLE: Composition — Caractéristiques — Défauts — Avantages */}
        <div
          className={`border-2 rounded-md shadow-md ${isMobile ? '' : 'mx-6'}`}
        >
          {isMobile ? (
            <table className="table-auto w-full">
              <tbody>
                <tr className="border-b bg-white bg-opacity-30">
                  <th className="px-4 py-2">{t('oneFabric.h41')}</th>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">
                    {renderList(fabric.composition)}
                  </td>
                </tr>

                <tr className="border-b bg-white bg-opacity-30">
                  <th className="px-4 py-2">{t('oneFabric.h42')}</th>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">
                    {renderList(fabric.characteristic)}
                  </td>
                </tr>

                <tr className="border-b bg-white bg-opacity-30">
                  <th className="px-4 py-2">{t('oneFabric.h43')}</th>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">
                    {renderList(fabric.disadvantages)}
                  </td>
                </tr>

                <tr className="border-b bg-white bg-opacity-30">
                  <th className="px-4 py-2">{t('oneFabric.h44')}</th>
                </tr>
                <tr>
                  <td className="px-4 py-2">{renderList(fabric.benefit)}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-white bg-opacity-30 border-b">
                  <th className="px-4 py-2 border-r">{t('oneFabric.h41')}</th>
                  <th className="px-4 py-2 border-r">{t('oneFabric.h42')}</th>
                  <th className="px-4 py-2 border-r">{t('oneFabric.h43')}</th>
                  <th className="px-4 py-2">{t('oneFabric.h44')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-r">
                    {renderList(fabric.composition)}
                  </td>
                  <td className="px-4 py-2 border-r">
                    {renderList(fabric.characteristic)}
                  </td>
                  <td className="px-4 py-2 border-r">
                    {renderList(fabric.disadvantages)}
                  </td>
                  <td className="px-4 py-2">{renderList(fabric.benefit)}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        {/* ORIGINE */}
        <div className="text-center mt-8">
          <h4 className="font-bold text-3xl text-white mb-4">
            {t('oneFabric.h49')}
          </h4>
          <p>{fabric.origin}</p>
        </div>

        {/* TABLE: Poids — Apparence — Niveau — Armure */}
        <div
          className={`border-2 rounded-md shadow-md mt-6 ${
            isMobile ? '' : 'mx-6'
          }`}
        >
          {isMobile ? (
            <table className="table-auto w-full">
              <tbody>
                <tr className="border-b bg-white bg-opacity-30">
                  <th className="px-4 py-2">{t('oneFabric.h45')}</th>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">{fabric.weight}</td>
                </tr>

                <tr className="border-b bg-white bg-opacity-30">
                  <th className="px-4 py-2">{t('oneFabric.h46')}</th>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">
                    {renderList(fabric.appearance)}
                  </td>
                </tr>

                <tr className="border-b bg-white bg-opacity-30 flex justify-evenly">
                  <th className="px-4 py-2">
                    {t('oneFabric.h47')} <ButtonInfoLevelSewing />
                  </th>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">
                    {fabric.level_sewing?.name_level}
                  </td>
                </tr>

                <tr className="border-b bg-white bg-opacity-30">
                  <th className="px-4 py-2">{t('oneFabric.h48')}</th>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-center">
                    <div className="flex flex-col items-center">
                      {fabric.weave_of_fabrics?.category}
                      <p className="mt-1">{fabric.weave_of_fabrics?.name}</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table className="table-auto w-full">
              <thead className="border-b bg-white bg-opacity-30">
                <tr>
                  <th className="px-4 py-2 border-r">{t('oneFabric.h45')}</th>
                  <th className="px-4 py-2 border-r">{t('oneFabric.h46')}</th>
                  <th className="px-4 py-2 border-r">{t('oneFabric.h47')}</th>
                  <th className="px-4 py-2">{t('oneFabric.h48')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-r">{fabric.weight}</td>
                  <td className="px-4 py-2 border-r">
                    {renderList(fabric.appearance)}
                  </td>
                  <td className="px-4 py-2 border-r">
                    {fabric.level_sewing?.name_level}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex flex-col items-center">
                      {fabric.weave_of_fabrics?.category}
                      <p className="mt-1">{fabric.weave_of_fabrics?.name}</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        {/* WASHES */}
        <div className="mt-10 text-center">
          <h4 className="font-bold text-3xl text-white mb-4">
            {t('oneFabric.h51')}
          </h4>
          <ul className="flex flex-wrap justify-center">
            {fabric.washes.map((wash: any) => (
              <li key={wash.id} className="w-20 flex flex-col items-center m-2">
                <img
                  src={wash.washe_img_url || '/no-image.png'}
                  className="w-12 h-12 p-1 border rounded-md bg-white bg-opacity-30 shadow-md"
                  alt={wash.name}
                />
                <p className="text-xs mt-1 text-center">{wash.description}</p>
              </li>
            ))}
          </ul>
        </div>
        {/* NEEDLE */}
        {fabric.needle_type_fabrics_links?.[0]?.needle_type && (
          <div className="mt-12 text-center">
            <h4 className="font-bold text-3xl text-white mb-6">
              {t('oneFabric.h53')}
            </h4>

            <div className="flex justify-center mx-3">
              <div className="">
                <img
                  src={fabric.needle_img_url || '/no-image.png'}
                  alt={fabric.name_type}
                  className="mx-auto mb-3 w-60 h-60 object-contain bg-white bg-opacity-20 p-4 rounded-xl shadow-md backdrop-blur-sm"
                />{' '}
                {/* Crédit des images */}
                <p className="text-xs opacity-60 mt-3 italic">
                  Images provenant du site{' '}
                  <a
                    href="https://www.mondialtissus.fr/tutos-et-inspiration/mon-guide-couture/connaitre-toutes-les-techniques-de-couture/quelle-aiguille-utiliser-pour-quel-tissu.html?srsltid=AfmBOorNZHLBP1--9c47GGEi73CPNt0HnraiJRHDF2G8A8JFctmyJxBZ"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mondial Tissus
                  </a>
                </p>
              </div>
              <div className="items-center ml-8 flex flex-col justify-center w-64">
                <p className="font-semibold text-2xl">
                  Aiguilles {fabric.name_type}
                </p>
                <span
                  className="w-6 h-6 rounded-full mt-2 border border-gray-300"
                  style={{ backgroundColor: fabric.needle_color }}
                  title={fabric.needle_color}
                />

                <p className="text-xl font-bold mt-1">{fabric.needle_size}</p>

                <p className="text-lg ">{fabric.needle_description}</p>
              </div>
            </div>
          </div>
        )}
        {/* PRODUCTS */}
        <div className="mt-10 text-center">
          <h4 className="font-bold text-3xl text-white mb-4">
            {t('oneFabric.h52')}
          </h4>
          {fabric.products.length === 0 ? (
            <p className="text-sm">{t('oneFabric.none')}</p>
          ) : (
            <ul className="flex flex-wrap justify-center">
              {fabric.products.map((p: any) => (
                <li key={p.id} className="w-20 flex flex-col items-center m-2">
                  <Link to={`/products/${p.id}`}>
                    <img
                      src={p.product_img_url || '/no-image.png'}
                      className="w-16 h-16 p-2 rounded-full bg-white bg-opacity-30 shadow-md"
                      alt={p.name}
                    />
                    <p className="text-xs mt-1">{p.name}</p>
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
