let key = [
  'G', 'l', 'a', 'z', '1', '6',
  'E', 'c', '6', 'C', 'H', 'j',
  'a', 'H', 'B', 'h', 'P', 'j',
  'v', 'H', '8', '0', 's', 'p',
  't', '0', 'S', 'l', 'L', 'r',
  '0', 'L'
];

const reverseGeocodeLink = (lat, long) => {
  return `https://api.tomtom.com/search/2/reverseGeocode/${lat},${long}.json?key=${key.join('')}`
};

export default reverseGeocodeLink;