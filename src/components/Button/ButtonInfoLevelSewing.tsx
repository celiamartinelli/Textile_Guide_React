import React, { useState, useEffect } from 'react';
import ModalShowMoreInfosLevel from '@/components/Modal/OneProduct/ModalShowMoreInfosLevel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../../../supabaseClient';

interface Level {
  id: string;
  name_level: string;
  description: string;
  typical_projects: string;
  skills: string;
  technical: string;
  example: string;
}

const ShowMoreInfosButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLevels() {
      const { data, error } = await supabase.from('level_sewings').select('*');

      if (error) {
        console.error('Erreur Supabase :', error);
      } else {
        setLevels(data as Level[]);
      }

      setLoading(false); // ✔ IMPORTANT !
    }

    fetchLevels();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="flex w-7 justify-center items-center bg-cream dark:bg-rosyBrown rounded-full h-7">
      <button
        type="button"
        className="text-brown dark:text-white"
        onClick={() => setIsModalOpen(true)}
        aria-label="Afficher plus d'informations sur le niveau de couture"
      >
        <FontAwesomeIcon icon={faInfo} />
      </button>

      {isModalOpen && (
        <ModalShowMoreInfosLevel
          levels={levels}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ShowMoreInfosButton;
