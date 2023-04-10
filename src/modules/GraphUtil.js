function euclideanDistance(a, b) {
    const x = a.x - b.x;
    const y = a.y - b.y;
  
    return Math.sqrt(x ** 2 + y ** 2);
}

function haversineDistance(a, b) {
    const earthRadius = 6371; // in kilometers
  
    const lat1 = a.lat;
    const lon1 = a.lng;
    const lat2 = b.lat;
    const lon2 = b.lng;
  
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
  
    const haversine =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;
  
    const distance = 2 * earthRadius * Math.asin(Math.sqrt(haversine));
  
    return distance;
  }

  module.exports = {euclideanDistance, haversineDistance}

// TODO: validasi graf, validasi index graf, validasi apakah start terhubung ke goal
