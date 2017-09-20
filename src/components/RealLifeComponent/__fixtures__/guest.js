export default {
  props: {},
  url: '/login',
  localStorage: {},
  fetch: [
    {
      matcher: '/api/login',
      response: {
        name: 'Dan'
      }
    }
  ]
};
