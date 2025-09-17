export const appRoutes = {
  index: '/',
  clients: {
    index: '/clients',
    new: '/clients/new',
    detail: (id: string) => `/clients/${id}`,
    edit: (id: string) => `/clients/${id}/edit`
  },
  calendar: {
    index: '/calendar',
    new: '/calendar/new'
  },
  products: {
    index: '/products',
    new: '/products/new',
    detail: (id: string) => `/products/${id}`,
    edit: (id: string) => `/products/${id}/edit`
  },
  signIn: {
    index: '/sign-in'
  },
  userProfile: {
    index: '/user-profile'
  }
};
