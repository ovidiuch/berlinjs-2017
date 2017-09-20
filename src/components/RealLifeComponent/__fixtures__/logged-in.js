export default {
  props: {},
  url: '/',
  localStorage: {
    name: 'Dan'
  },
  reduxState: {
    name: null
  },
  fetch: [
    {
      matcher: '/api/login',
      response: {
        name: 'Dan'
      }
    }
  ]
};
