export const appRoutes = {
  index: '/',
  clients: {
    index: '/clients',
    new: '/clients/new',
    edit: (id: string) => `/clients/${id}/edit`
  },
  calendar: {
    index: '/calendar',
    new: '/calendar/new'
  },
  products: {
    index: '/products',
    new: '/products/new'
  },
  signIn: {
    index: '/sign-in'
  },
  userProfile: {
    index: '/user-profile'
  }
};
