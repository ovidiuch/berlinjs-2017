export default {
  props: {},
  url: '/login',
  localStorage: {},
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
