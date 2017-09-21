export default {
  props: {},
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
