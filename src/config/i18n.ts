// src/config/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { send } from 'vite';

const resources = {
  en: {
    translation: {
      home: {
        welcome: 'Welcome to our Textile Guide',
        intro:
          'Here you can find which textile suits best according to the project you want to carry out in the textile world.',
        search_by: 'Search by:',
        projects: 'Projects',
        fabrics: 'Fabrics',
      },
      header: {
        about: 'About',
        projects: 'Projects',
        fabrics: 'Fabrics',
        change_language: 'Change Language',
      },
      footer: {
        text: 'Textile-Guide. All rights reserved',
      },
      oneProduct: {
        quantity_textile_required: 'Quantity of textile required:',
        laize: '* for a width of 1.45m',
        h2level: 'Sewing Level',
        h2Fabric: 'Associated Fabrics',
        h2AssociatedSupply: 'Supply Quantities',
        supply_category: {
          main_fabric: 'Main Fabric',
          interior_fabric: 'Interior Fabric',
          interling_fabric: 'Interling Fabric',
          closure: 'Closure',
          fastener: 'Fasteners',
          ribbon: 'Ribbon',
          decoration: 'Decoration',
          accessory: 'Accessory',
          pocket_fabric: 'Pocket Fabric',
          pocket_closure: 'Pocket Closure',
        },
      },
      oneFabric: {
        none: 'No associated project for the moment',
        h41: 'Composition',
        h42: 'Characteristics',
        h43: 'Disadvantages',
        h44: 'Advantages',
        h45: 'Weight for 1m²',
        h46: 'Aspect of the Fabric',
        h47: 'Sewing Level',
        h48: 'Weave of the Fabric',
        h49: 'Origin:',
        h50: 'Energy Consumption:',
        h51: 'Care',
        h52: 'Associated Projects',
      },
      modalInfoLevel: {
        title: 'Sewing Level',
        title1: 'Skills',
        title2: 'Typical Projects',
        title3: 'Techniques',
        title4: 'Examples of Fabrics',
      },
      about: {
        title: 'About Guide Textile',
        p1: 'Welcome to our textile guide application, your reliable source for everything related to textiles. Our mission is to provide comprehensive and accessible information to help you better understand the different types of fabrics, their uses, and their care.',
        p2: "Imagine you have a piece of fabric and want to start a project, but you are not sure which project to choose. Our application offers projects suited to your fabric. Additionally, you can search by project. For example, if you are interested in a project but don't know which fabric to use, our application recommends suitable fabrics for that project.",
        p3: 'This application was designed and conceived for sewers by a sewer, to know which projects to make with certain fabrics and which fabrics to choose based on the project you have in mind, or simply to seek inspiration.',
        title2: 'Our Story',
        p4: 'The idea for the textile guide was born out of my passion for fabrics and sewing. Noticing the lack of centralized and accessible information on textiles, and constantly seeking information on this subject myself, I decided to create a comprehensive resource for both amateurs and professionals. As a sewer always in the process of learning, I felt the need for such a platform to enhance my knowledge and share this valuable information with the community.',
        title3: 'Our Mission',
        p5: 'Our mission is to provide comprehensive and accessible information to help you better understand the different types of fabrics, their uses, and their care.',
        title4: 'Search by Textile',
        p6: 'Our application allows you to easily search for different types of fabrics. Use our search bar to find detailed information on each fabric.',
        title5: 'Care Guides',
        p7: 'Each fabric sheet is accompanied by detailed care guides, helping you keep your textiles in perfect condition.',
        title6: 'Search by Products',
        p8: 'We offer product recommendations and associated projects for each type of fabric, making it easier for you to choose and get inspired for your creations.',
        title7: 'Contact Us',
        p9: 'We would love to hear from you. If you have any questions, suggestions, or comments, please do not hesitate to contact us.',
        form1: 'Name',
        form2: 'Email',
        form3: 'Message',
        send: 'Send',
      },
      modal: {
        h1modal: 'Message sent successfully!',
        pmodal:
          'Thank you for your message. Our team will get back to you as soon as possible.',

        close: 'Close',
      },
    },
  },
  fr: {
    translation: {
      home: {
        welcome: 'Bienvenue dans le Guide des Textiles',
        intro:
          "Ici tu peux trouver quel textile convient le mieux selon le projet que tu souhaites réaliser dans l'univers du textile.",
        search_by: 'Recherché par:',
        projects: 'Projets',
        fabrics: 'Tissus',
      },
      header: {
        about: 'À propos',
        projects: 'Projets',
        fabrics: 'Tissus',
        change_language: 'Changer de langue',
      },
      footer: {
        text: 'Textile-Guide. Tous droits réservés',
      },
      oneProduct: {
        quantity_textile_required: 'Quantité de tissus nécessaire:',
        laize: '* pour une laize de 1,45m',
        h2level: 'Niveau de Couture',
        h2Fabric: 'Tissus Associés',
        h2AssociatedSupply: 'Quantités de Fournitures',
        supply_category: {
          main_fabric: 'Tissu Principal',
          interior_fabric: 'Tissu Intérieur',
          interling_fabric: 'Entoilage',
          closure: 'Fermeture',
          fastener: 'Attache',
          ribbon: 'Rubanerie',
          decoration: 'Decoration',
          accessory: 'Accessoire',
          pocket_fabric: 'Tissu de Poche',
          pocket_closure: 'Fermeture de Poche',
        },
      },
      oneFabric: {
        none: 'Aucun Projet associé pour le moment',
        h41: 'Composition',
        h42: 'Caractéristiques',
        h43: 'Inconvénients',
        h44: 'Avantages',
        h45: 'Poids pour 1m²',
        h46: 'Aspect du Tissus',
        h47: 'Niveau de Couture',
        h48: 'Armure du Tissus',
        h49: 'Origine:',
        h50: 'Consommation Energitique:',
        h51: 'Entretien',
        h52: 'Projets Associés',
      },
      modalInfoLevel: {
        title: 'Niveau de Couture',
        title1: 'Compétences',
        title2: 'Projets Typiques',
        title3: 'Techniques',
        title4: 'Exemples de Tissus',
      },
      about: {
        title: 'A Propos de Guide Textile',
        p1: ' Bienvenue sur notre application de guide textile, votre source fiable pour tout ce qui concerne les textiles. Notre mission est de fournir des informations complètes et accessibles pour vous aider à mieux comprendre les différents types de tissus, leurs utilisations et leurs entretiens.',
        p2: 'Imaginez que vous avez une chute de tissu et que vous souhaitez en faire un projet, mais vous ne savez pas encore quel projet choisir. Notre application vous propose des projets adaptés à votre tissu. De plus, vous avez la possibilité de faire des recherches par projet. Par exemple, si un projet vous intéresse mais que vous ne savez pas quel tissu utiliser, notre application vous recommande des tissus adaptés à ce projet.',
        p3: 'Cette application a été conçue et pensée pour les couturiers et couturières par une couturière, afin de savoir quels projets réaliser avec certains tissus et quels tissus choisir en fonction du projet que vous avez en tête, ou tout simplement pour chercher de l inspiration.',
        title2: 'Notre Histoire',
        p4: "L idée du guide textile est née de ma passion pour les tissus et la couture. Constatant le manque d informations centralisées et accessibles sur les textiles, et étant moi-même en constante recherche d informations sur ce sujet, j ai décidé de créer une ressource complète pour les amateurs et les professionnels. En tant que couturière toujours en apprentissage, j ai ressenti le besoin d'une telle plateforme pour améliorer mes connaissances et partager ces informations précieuses avec la communauté.",
        title3: 'Notre Mission',
        p5: 'Notre mission est de fournir des informations complètes et accessibles pour vous aider à mieux comprendre les différents types de tissus, leurs utilisations et leurs entretiens.',
        title4: 'Recherche par Textile',
        p6: 'Notre application permet de rechercher facilement différents types de tissus. Utilisez notre barre de recherche pour trouver des informations détaillées sur chaque tissu.',
        title5: "Guides d' Entretien",
        p7: "Chaque fiche de tissu est accompagnée de guides d'entretien détaillés, vous aidant à maintenir vos textiles en parfait état.",
        title6: 'Recherche par Produits',
        p8: 'Nous proposons des recommandations de produits et des projets associés pour chaque type de tissu, facilitant ainsi vos choix et inspirations pour vos créations.',
        title7: 'Contactez-nous',
        p9: "Nous aimerions avoir de vos nouvelles. Si vous avez des questions, des suggestions ou des commentaires, n'hésitez pas à nous contacter.",
        form1: 'Nom',
        form2: 'Email',
        form3: 'Message',
        send: 'Envoyer',
      },
      modal: {
        h1modal: 'Message envoyé avec succès!',
        pmodal:
          'Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.',
        close: 'Fermer',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'fr', // Langue par défaut
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false, // React gère déjà la protection contre les XSS
  },
});

export default i18n;
