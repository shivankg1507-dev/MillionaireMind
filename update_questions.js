const fs = require('fs');
const p = 'src/assets/questions.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));

// clean up existing images in medium and hard to prevent duplicates
d.medium = d.medium.filter(q => !q.image);
d.hard = d.hard.filter(q => !q.image);

const newMedium = [
  { text: 'Identify this famous monument.', textHindi: 'इस प्रसिद्ध स्मारक को पहचानें।', options: ['Red Fort', 'Qutub Minar', 'Taj Mahal', 'India Gate'], optionsHindi: ['लाल किला', 'कुतुब मीनार', 'ताजमहल', 'इंडिया गेट'], correctIndex: 2, image: 'assets/images/taj_mahal.png' },
  { text: 'Identify this iconic landmark.', textHindi: 'इस प्रतिष्ठित लैंडमार्क को पहचानें।', options: ['Big Ben', 'Eiffel Tower', 'Leaning Tower of Pisa', 'Empire State Building'], optionsHindi: ['बिग बेन', 'एफिल टॉवर', 'पीसा की झुकी मीनार', 'एम्पायर स्टेट बिल्डिंग'], correctIndex: 1, image: 'assets/images/eiffel_tower.png' },
  { text: 'Identify this ancient wonder.', textHindi: 'इस प्राचीन आश्चर्य को पहचानें।', options: ['Colosseum', 'Taj Mahal', 'Pyramids of Giza', 'Machu Picchu'], optionsHindi: ['कोलोसियम', 'ताजमहल', 'गीज़ा के पिरामिड', 'माचू पिचू'], correctIndex: 2, image: 'assets/images/pyramids.png' },
  { text: 'Identify this musical instrument.', textHindi: 'इस वाद्य यंत्र को पहचानें।', options: ['Guitar', 'Piano', 'Violin', 'Flute'], optionsHindi: ['गिटार', 'पियानो', 'वायलिन', 'बांसुरी'], correctIndex: 2, image: 'assets/images/violin.jpg' },
  { text: 'Identify this mode of flight.', textHindi: 'उड़ान के इस तरीके को पहचानें।', options: ['Helicopter', 'Airplane', 'Hot Air Balloon', 'Drone'], optionsHindi: ['हेलीकाप्टर', 'हवाई जहाज', 'हॉट एयर बैलून', 'ड्रोन'], correctIndex: 2, image: 'assets/images/hot_air_balloon.jpg' }
];

const newHard = [
  { text: 'Identify this ancient structure.', textHindi: 'इस प्राचीन संरचना को पहचानें।', options: ['Colosseum', 'Machu Picchu', 'Great Wall of China', 'Petra'], optionsHindi: ['कोलोसियम', 'माचू पिचू', 'चीन की महान दीवार', 'पेट्रा'], correctIndex: 2, image: 'assets/images/great_wall.png' },
  { text: 'Identify this famous waterfall.', textHindi: 'इस प्रसिद्ध झरने को पहचानें।', options: ['Victoria Falls', 'Angel Falls', 'Niagara Falls', 'Iguazu Falls'], optionsHindi: ['विक्टोरिया फॉल्स', 'एंजेल फॉल्स', 'नियाग्रा फॉल्स', 'इग्वाज़ू फॉल्स'], correctIndex: 2, image: 'assets/images/niagara_falls.png' },
  { text: 'Identify this classic navigation tool.', textHindi: 'इस क्लासिक नेविगेशन टूल को पहचानें।', options: ['Barometer', 'Compass', 'Sundial', 'Telescope'], optionsHindi: ['बैरोमीटर', 'कम्पास', 'धूपघड़ी', 'दूरबीन'], correctIndex: 1, image: 'assets/images/compass.png' },
  { text: 'Identify this scientific instrument.', textHindi: 'इस वैज्ञानिक उपकरण को पहचानें।', options: ['Microscope', 'Telescope', 'Binoculars', 'Periscope'], optionsHindi: ['सूक्ष्मदर्शी', 'दूरबीन', 'द्विनेत्री', 'पेरिस्कोप'], correctIndex: 0, image: 'assets/images/microscope.png' },
  { text: 'Identify this electronic machine.', textHindi: 'इस इलेक्ट्रॉनिक मशीन को पहचानें।', options: ['Television', 'Computer', 'Radio', 'Telephone'], optionsHindi: ['टेलीविजन', 'कंप्यूटर', 'रेडियो', 'टेलीफोन'], correctIndex: 1, image: 'assets/images/computer.jpg' }
];

d.medium.push(...newMedium);
d.hard.push(...newHard);
fs.writeFileSync(p, JSON.stringify(d, null, 2));
console.log('Successfully updated questions!');
