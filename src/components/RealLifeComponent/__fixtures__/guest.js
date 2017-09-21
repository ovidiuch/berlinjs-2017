export default {
  url: '/login',
  localStorage: {},
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
