export default {
  props: {},
  url: '/',
  localStorage: {
    name: 'Dan'
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
