self.onmessage = function (e) {
    if (e.data === 'startTracking') {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            self.postMessage({ latitude, longitude });
          },
          (error) => {
            console.error('Error getting location:', error);
          },
          { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
        );
      } else {
        console.error('Geolocation is not supported.');
      }
    }
  };
  