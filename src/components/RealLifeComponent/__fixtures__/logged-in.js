export default {
  url: '/',
  localStorage: {
    name: 'Dan'
  },
  reduxState: {},
  fetch: [
    {
      matcher: '/api/login',
      response: {
        name: 'Dan'
      }
    }
  ]
};
