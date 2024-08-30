export const getBaseUrl = () => {
  return process.env.BASE_URL === 'development'
    ? 'http://localhost:1337'
    : 'https://textile-guide-srv.fr';
};
