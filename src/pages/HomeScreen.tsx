// src/pages/HomeScreen.tsx
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from '@/components/App/DarkModeContext';
import ButtonInfoLevelSewing from '@/components/Button/ButtonInfoLevelSewing';
import { supabase } from '../../supabaseClient.js'; // Assurez-vous que le chemin est correct

interface Level {
  id: string;
  name_level: string;
  description: string;
  typical_projects: string;
  skills: string;
  technical: string;
  example: string;
}

export default function HomeScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isDarkMode } = useDarkMode();

  const [allLevels, setAllLevels] = useState<Level[]>([]);

  useEffect(() => {
    async function fetchLevels() {
      const { data, error } = await supabase.from('level_sewings').select('*');

      if (error) {
        console.error('Erreur Supabase :', error);
        return;
      }

      setAllLevels(data as Level[]);
    }

    fetchLevels();
  }, []);
  const searchByProjectImg = isDarkMode
    ? '../../../assets/search_by_project_dark.png'
    : '../../../assets/search_by_project.png';
  const searchByFabricImg = isDarkMode
    ? '../../../assets/search_by_fabric_dark.png'
    : '../../../assets/search_by_fabric.png';

  return (
    <div className="pb-20">
      <div className="flex flex-col justify-center items-center min-h-screen mt-16">
        <div className="mb-5 text-center">
          <h1 className="pb-8 text-2xl font-bold">{t('home.welcome')}</h1>
          <h2>{t('home.intro')}</h2>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h3>{t('home.search_by')}</h3>
          <div className="flex flex-row m-2">
            <div
              className="flex flex-col justify-center items-center border rounded-md p-2 m-2 shadow-lg bg-lightBackground hover:bg-lightBackgroundLightHover dark:bg-darkPruneLogo hover:dark:bg-darkPruneBG"
              onClick={() => {
                navigate('/products');
              }}
            >
              <h4>{t('home.projects')}</h4>
              <img
                className="w-36"
                src={searchByProjectImg}
                alt="search by project"
              />
            </div>
            <div
              className="flex flex-col justify-center items-center border rounded-md p-2 m-2 shadow-lg bg-lightBackground hover:bg-lightBackgroundLightHover dark:bg-darkPruneLogo hover:dark:bg-darkPruneBG"
              onClick={() => {
                navigate('/fabrics');
              }}
            >
              <h4>{t('home.fabrics')}</h4>
              <img
                className="w-36"
                src={searchByFabricImg}
                alt="search by project"
              />
            </div>
          </div>
          <ButtonInfoLevelSewing />
        </div>
      </div>
    </div>
  );
}
