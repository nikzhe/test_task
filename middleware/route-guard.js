export default function ({ store, redirect }) {
  store.dispatch('storeBasicSetup')
  let isAuthentificated = store.getters.isLoggedIn;

  if (isAuthentificated) {
    return redirect('/');
  }
}