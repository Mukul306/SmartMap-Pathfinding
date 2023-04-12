function euclideanDistance(nodeA, nodeB) {
    const x = nodeA.location.x - nodeB.location.x;
    const y = nodeA.location.y - nodeB.location.y;
  
    return Math.sqrt(x ** 2 + y ** 2);
}

function haversineDistance(nodeA, nodeB) {
    const earthRadius = 6371; // in kilometers
  
    const lat1 = nodeA.location.lat;
    const lon1 = nodeA.location.lng;
    const lat2 = nodeB.location.lat;
    const lon2 = nodeB.location.lng;
  
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
