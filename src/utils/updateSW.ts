import { registerSW } from 'virtual:pwa-register';

export const updateSW = registerSW({
  onNeedRefresh() {
    const answer = confirm('New version is available. Update?');

    if (answer) {
      updateSW();
    }
  },

  onOfflineReady() {
    alert('Your app is successfully installed');
  },

  onRegisterError(error) {
    alert(`Error on installing: ${error}`);
  },
});
