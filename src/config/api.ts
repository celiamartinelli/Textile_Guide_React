export const getBaseUrl = () => {
  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:1337'
    : 'https://supreme-rainbow-f7999372d6.strapiapp.com';
};
