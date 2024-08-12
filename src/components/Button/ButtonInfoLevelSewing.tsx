import React, { useState, useEffect } from 'react';
import ModalShowMoreInfosLevel from '@/components/Modal/OneProduct/ModalShowMoreInfosLevel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

interface Level {
  id: string;
  attributes: {
    name_level: string;
    description: string;
  };
}

const ShowMoreInfosButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/level-sewings');
        const result = await response.json();
        setLevels(result.data);
        setLoading(false);
      } catch (error) {
        console.error(
          'Erreur lors du chargement des niveaux de couture',
          error
        );
        setLoading(false);
      }
    };

    fetchLevels();
  }, []);

  if (loading) return <p>Chargement...</p>;
  return (
    <>
      <button
        type="button"
        className="bg-cream p-2 rounded-full text-brown mr-2"
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
    </>
  );
};

export default ShowMoreInfosButton;
