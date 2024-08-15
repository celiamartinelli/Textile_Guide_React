import { useState, useEffect } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Level {
  id: string;
  attributes: {
    name_level: string;
    description: string;
    skills: string;
    typical_projects: string;
    technical: string;
    example: string;
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
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="p-6 rounded-lg max-w-[80%] max-h-[80%] flex flex-col bg-cream dark:bg-darkPruneLBG">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-lg font-bold mb-4">
            {t('modalInfoLevel.title')}
          </h2>
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
                <div className="my-4">
                  <p> {level.attributes.description}</p>
                  <div className="border-2 border-brown rounded-lg my-6">
                    <table className="min-w-full">
                      <tbody>
                        <tr className="border-b border-brown">
                          <td className="border-r border-brown p-2 font-semibold bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-10">
                            {t('modalInfoLevel.title1')}
                          </td>
                          <td className=" p-2">{level.attributes.skills}</td>
                        </tr>
                        <tr className="border-b border-brown">
                          <td className="border-r border-brown p-2 font-semibold bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-10">
                            {t('modalInfoLevel.title2')}
                          </td>
                          <td className=" p-2">
                            {level.attributes.typical_projects}
                          </td>
                        </tr>
                        <tr className="border-b border-brown">
                          <td className="border-r border-brown p-2 font-semibold bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-10">
                            {t('modalInfoLevel.title3')}
                          </td>
                          <td className="p-2">{level.attributes.technical}</td>
                        </tr>
                        <tr>
                          <td className="border-r border-brown p-2 font-semibold bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-10">
                            {t('modalInfoLevel.title4')}
                          </td>
                          <td className=" p-2">{level.attributes.example}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModalShowMoreInfosLevel;
