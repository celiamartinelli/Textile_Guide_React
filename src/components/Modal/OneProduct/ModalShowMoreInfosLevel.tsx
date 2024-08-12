import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface Level {
  id: string;
  attributes: {
    name_level: string;
    description: string;
  };
}

interface ModalShowMoreInfosLevelProps {
  levels: Level[];
  onClose: () => void;
}

const ModalShowMoreInfosLevel: React.FC<ModalShowMoreInfosLevelProps> = ({
  levels,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-[80%] max-h-[80%] flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-lg font-bold mb-4">Niveaux de couture</h2>
          <button
            type="button"
            onClick={onClose}
            title="Fermer"
            className="text-lg font-bold mb-4"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto">
          <ul className="list-disc pl-5 mb-4">
            {levels.map((level) => (
              <li key={level.id} className="text-sm mb-2">
                <strong>{level.attributes.name_level}</strong>:{' '}
                {level.attributes.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModalShowMoreInfosLevel;
