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
      <div className=" p-6 rounded-lg max-w-[80%] max-h-[80%] flex flex-col bg-cream dark:bg-darkPruneLBG">
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
          <ul className="list-disc pl-5 m-4">
            {levels.map((level) => (
              <li key={level.id} className="text-sm m-2">
                <strong className="bg-sage dark:bg-darkPruneBG p-2 m-1 rounded-md">
                  {level.attributes.name_level}
                </strong>
                <p className="my-4">
                  {level.attributes.description
                    .split('/')
                    .map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModalShowMoreInfosLevel;
