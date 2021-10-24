
import fetch from 'node-fetch'
globalThis.fetch = fetch

var markers = [
    {
        "title": "Lost Cat",
        "user": "James Smith",
        "latitude": 43.128242,
        "longitude": -77.630194,
        "comment": "A stray cat has been wandering around in the neighborhood for about a week. It’s black and white and it shows up on this street every evening. It comes to you if you have food in your hand. It needs to be sent to animal shelter.",
        "type": "Animal",
        "image": "https://media.discordapp.net/attachments/901251629658013698/901666304346435614/unknown.png",
        "currentUser": "",
        "points": 300,
    },
    {
        "title": "Trash Cleanup",
        "user": "Doughlass Marino",
        "latitude": 43.128587,
        "longitude": -77.629263,
        "comment": "The beach nearby is full of trash and it smells so bad everyday. We need volunteers to clean up the beach.",
        "type": "Social",
        "image": "https://media.discordapp.net/attachments/901251629658013698/901667216997613660/unknown.png",
        "currentUser": "",
        "points": 400,
    },
    {
        "title": "Fundraiser",
        "user": "Dale Robinson",
        "latitude": 43.130004, 
        "longitude": -77.631355,
        "comment": "The neighborhood has a fund raising sale this Saturday, we need volunteers to help.",
        "type": "Social",
        "image": "https://media.discordapp.net/attachments/901251629658013698/901667851935580220/unknown.png",
        "currentUser": "",
        "points": 233,
    },
    {
        "title": "Open House Tour",
        "user": "Miguel Hardee",
        "latitude": 43.126300, 
        "longitude": -77.628405,
        "comment": "For Open House Day this weekend, we need tourist to show our guests around the campus.",
        "type": "Tourism",
        "image": "https://media.discordapp.net/attachments/901251629658013698/901668800775196692/unknown.png",
        "currentUser": "",
        "points": 50,
    }
];

const getBase64FromUrl = async (url) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob); 
    reader.onloadend = () => {
      const base64data = reader.result;   
      resolve(base64data);
    }
  });
}

async function main() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].image = await getBase64FromUrl(markers[i].image);
    console.log(markers[i]);
  }
}
 
 main()
.then(() => {
    process.exit(0);
})
.catch(err => {
    console.error(err); // Writes to stderr
    process.exit(1);
});
