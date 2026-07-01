import { Injectable } from '@angular/core';

export interface Question {
  text: string;
  textHindi: string;
  options: string[];
  optionsHindi: string[];
  correctIndex: number;
  prize: string;
  isMilestone?: boolean;
}

export interface Lifeline {
  name: string;
  used: boolean;
  type: '50-50' | 'audience' | 'double' | 'phone';
  icon: string;
}

const PRIZE_LADDER = [
  { prize: '1,000', isMilestone: false },
  { prize: '2,000', isMilestone: false },
  { prize: '3,000', isMilestone: false },
  { prize: '5,000', isMilestone: false },
  { prize: '10,000', isMilestone: true },
  { prize: '20,000', isMilestone: false },
  { prize: '40,000', isMilestone: false },
  { prize: '80,000', isMilestone: false },
  { prize: '1,60,000', isMilestone: false },
  { prize: '3,20,000', isMilestone: true },
  { prize: '6,40,000', isMilestone: false },
  { prize: '12,50,000', isMilestone: false },
  { prize: '25,00,000', isMilestone: false },
  { prize: '50,00,000', isMilestone: false },
  { prize: '1 CRORE', isMilestone: true },
  { prize: '7 CRORE', isMilestone: true }
];

const EASY_POOL: Question[] = [
  { text: 'Which planet is known as the Red Planet?', textHindi: 'किस ग्रह को लाल ग्रह के नाम से जाना जाता है?', options: ['Earth', 'Mars', 'Jupiter', 'Venus'], optionsHindi: ['पृथ्वी', 'मंगल', 'बृहस्पति', 'शुक्र'], correctIndex: 1, prize: '' },
  { text: 'What is the capital of France?', textHindi: 'फ्रांस की राजधानी क्या है?', options: ['Berlin', 'Madrid', 'Paris', 'Rome'], optionsHindi: ['बर्लिन', 'मैड्रिड', 'पेरिस', 'रोम'], correctIndex: 2, prize: '' },
  { text: 'How many days are in a leap year?', textHindi: 'एक लीप वर्ष में कितने दिन होते हैं?', options: ['364', '365', '366', '367'], optionsHindi: ['364', '365', '366', '367'], correctIndex: 2, prize: '' },
  { text: 'What is the largest mammal on Earth?', textHindi: 'पृथ्वी पर सबसे बड़ा स्तनपायी जीव कौन सा है?', options: ['Elephant', 'Blue Whale', 'Giraffe', 'Shark'], optionsHindi: ['हाथी', 'नीली व्हेल', 'जिराफ', 'शार्क'], correctIndex: 1, prize: '' },
  { text: 'Which color is not in the rainbow?', textHindi: 'इंद्रधनुष में कौन सा रंग नहीं होता है?', options: ['Red', 'Yellow', 'Black', 'Blue'], optionsHindi: ['लाल', 'पीला', 'काला', 'नीला'], correctIndex: 2, prize: '' },
  { text: 'What is the main ingredient in guacamole?', textHindi: 'गुआकामोल में मुख्य सामग्री क्या है?', options: ['Tomato', 'Avocado', 'Onion', 'Pepper'], optionsHindi: ['टमाटर', 'एवोकैडो', 'प्याज', 'काली मिर्च'], correctIndex: 1, prize: '' },
  { text: 'How many legs does a spider have?', textHindi: 'मकड़ी के कितने पैर होते हैं?', options: ['6', '8', '10', '12'], optionsHindi: ['6', '8', '10', '12'], correctIndex: 1, prize: '' },
  { text: 'What is the boiling point of water in Celsius?', textHindi: 'सेल्सियस में पानी का क्वथनांक क्या है?', options: ['90', '100', '110', '120'], optionsHindi: ['90', '100', '110', '120'], correctIndex: 1, prize: '' },
  { text: 'Which bird is known as the universal symbol of peace?', textHindi: 'किस पक्षी को शांति का सार्वभौमिक प्रतीक माना जाता है?', options: ['Dove', 'Eagle', 'Crow', 'Swan'], optionsHindi: ['कबूतर', 'चील', 'कौवा', 'हंस'], correctIndex: 0, prize: '' },
  { text: 'Who is the author of "Harry Potter"?', textHindi: '"हैरी पॉटर" के लेखक कौन हैं?', options: ['J.R.R. Tolkien', 'J.K. Rowling', 'Stephen King', 'George R.R. Martin'], optionsHindi: ['जे.आर.आर. टोल्किन', 'जे.के. राउलिंग', 'स्टीफन किंग', 'जॉर्ज आर.आर. मार्टिन'], correctIndex: 1, prize: '' },
  { text: 'What do bees collect to make honey?', textHindi: 'मधुमक्खियाँ शहद बनाने के लिए क्या इकट्ठा करती हैं?', options: ['Pollen', 'Nectar', 'Sap', 'Water'], optionsHindi: ['पराग', 'मकरंद (Nectar)', 'रस', 'पानी'], correctIndex: 1, prize: '' },
  { text: 'What is the opposite of "Opposite"?', textHindi: '"Opposite" (विपरीत) का विलोम क्या है?', options: ['Different', 'Same', 'Similar', 'Alike'], optionsHindi: ['अलग', 'समान', 'मिलता-जुलता', 'एक जैसा'], correctIndex: 1, prize: '' },
  { text: 'Which of these is a root vegetable?', textHindi: 'इनमें से कौन सी जड़ वाली सब्जी है?', options: ['Tomato', 'Carrot', 'Peas', 'Corn'], optionsHindi: ['टमाटर', 'गाजर', 'मटर', 'मक्का'], correctIndex: 1, prize: '' },
  { text: 'What is 15 multiplied by 3?', textHindi: '15 को 3 से गुणा करने पर क्या आता है?', options: ['30', '45', '50', '60'], optionsHindi: ['30', '45', '50', '60'], correctIndex: 1, prize: '' },
  { text: 'Which organ pumps blood in the human body?', textHindi: 'मानव शरीर में कौन सा अंग रक्त पंप करता है?', options: ['Brain', 'Liver', 'Heart', 'Lungs'], optionsHindi: ['मस्तिष्क', 'यकृत (Liver)', 'हृदय', 'फेफड़े'], correctIndex: 2, prize: '' },
  { text: 'What is the national currency of India?', textHindi: 'भारत की राष्ट्रीय मुद्रा क्या है?', options: ['Dollar', 'Euro', 'Rupee', 'Yen'], optionsHindi: ['डॉलर', 'यूरो', 'रुपया', 'येन'], correctIndex: 2, prize: '' },
  { text: 'Which direction does the sun rise?', textHindi: 'सूर्य किस दिशा से उगता है?', options: ['North', 'South', 'East', 'West'], optionsHindi: ['उत्तर', 'दक्षिण', 'पूर्व', 'पश्चिम'], correctIndex: 2, prize: '' },
  { text: 'How many vowels are in the English alphabet?', textHindi: 'अंग्रेजी वर्णमाला में कितने स्वर (vowels) होते हैं?', options: ['4', '5', '6', '7'], optionsHindi: ['4', '5', '6', '7'], correctIndex: 1, prize: '' },
  { text: 'What is the national animal of India?', textHindi: 'भारत का राष्ट्रीय पशु कौन सा है?', options: ['Lion', 'Tiger', 'Elephant', 'Peacock'], optionsHindi: ['शेर', 'बाघ', 'हाथी', 'मोर'], correctIndex: 1, prize: '' },
  { text: 'Which festival is known as the festival of lights?', textHindi: 'किस त्योहार को रोशनी का त्योहार कहा जाता है?', options: ['Holi', 'Diwali', 'Eid', 'Christmas'], optionsHindi: ['होली', 'दिवाली', 'ईद', 'क्रिसमस'], correctIndex: 1, prize: '' },
];

const MEDIUM_POOL: Question[] = [
  { text: 'Who wrote "Hamlet"?', textHindi: '"हैमलेट" किसने लिखा था?', options: ['Charles Dickens', 'William Shakespeare', 'Mark Twain', 'Jane Austen'], optionsHindi: ['चार्ल्स डिकेंस', 'विलियम शेक्सपियर', 'मार्क ट्वेन', 'जेन ऑस्टेन'], correctIndex: 1, prize: '' },
  { text: 'Which element has the chemical symbol "O"?', textHindi: 'किस तत्व का रासायनिक प्रतीक "O" है?', options: ['Gold', 'Oxygen', 'Osmium', 'Iron'], optionsHindi: ['सोना', 'ऑक्सीजन', 'ऑस्मियम', 'लोहा'], correctIndex: 1, prize: '' },
  { text: 'Which ocean is the largest?', textHindi: 'कौन सा महासागर सबसे बड़ा है?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], optionsHindi: ['अटलांटिक', 'हिंद', 'आर्कटिक', 'प्रशांत (Pacific)'], correctIndex: 3, prize: '' },
  { text: 'What is the tallest mountain in the world?', textHindi: 'विश्व का सबसे ऊँचा पर्वत कौन सा है?', options: ['K2', 'Mount Everest', 'Mount Kilimanjaro', 'Denali'], optionsHindi: ['K2', 'माउंट एवरेस्ट', 'माउंट किलिमंजारो', 'डेनाली'], correctIndex: 1, prize: '' },
  { text: 'Who painted the Mona Lisa?', textHindi: 'मोनालिसा की पेंटिंग किसने बनाई थी?', options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet'], optionsHindi: ['विंसेंट वैन गॉग', 'पाब्लो पिकासो', 'लियोनार्डो दा विंची', 'क्लाउड मोनेट'], correctIndex: 2, prize: '' },
  { text: 'Which planet is closest to the Sun?', textHindi: 'कौन सा ग्रह सूर्य के सबसे निकट है?', options: ['Venus', 'Mercury', 'Earth', 'Mars'], optionsHindi: ['शुक्र', 'बुध', 'पृथ्वी', 'मंगल'], correctIndex: 1, prize: '' },
  { text: 'Who discovered Penicillin?', textHindi: 'पेनिसिलिन की खोज किसने की थी?', options: ['Marie Curie', 'Alexander Fleming', 'Louis Pasteur', 'Isaac Newton'], optionsHindi: ['मैरी क्यूरी', 'अलेक्जेंडर फ्लेमिंग', 'लुई पाश्चर', 'आइजैक न्यूटन'], correctIndex: 1, prize: '' },
  { text: 'Which country is the largest by land area?', textHindi: 'क्षेत्रफल की दृष्टि से सबसे बड़ा देश कौन सा है?', options: ['China', 'USA', 'Canada', 'Russia'], optionsHindi: ['चीन', 'अमेरिका', 'कनाडा', 'रूस'], correctIndex: 3, prize: '' },
  { text: 'What is the hardest natural substance on Earth?', textHindi: 'पृथ्वी पर सबसे कठोर प्राकृतिक पदार्थ कौन सा है?', options: ['Gold', 'Iron', 'Diamond', 'Platinum'], optionsHindi: ['सोना', 'लोहा', 'हीरा', 'प्लैटिनम'], correctIndex: 2, prize: '' },
  { text: 'How many bones are in the adult human body?', textHindi: 'वयस्क मानव शरीर में कितनी हड्डियाँ होती हैं?', options: ['206', '208', '210', '212'], optionsHindi: ['206', '208', '210', '212'], correctIndex: 0, prize: '' },
  { text: 'In which year did the Titanic sink?', textHindi: 'टाइटैनिक किस वर्ष डूबा था?', options: ['1910', '1912', '1914', '1916'], optionsHindi: ['1910', '1912', '1914', '1916'], correctIndex: 1, prize: '' },
  { text: 'What is the capital of Japan?', textHindi: 'जापान की राजधानी क्या है?', options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'], optionsHindi: ['सियोल', 'बीजिंग', 'टोक्यो', 'बैंकॉक'], correctIndex: 2, prize: '' },
  { text: 'Which metal is liquid at room temperature?', textHindi: 'कमरे के तापमान पर कौन सी धातु तरल (liquid) होती है?', options: ['Iron', 'Mercury', 'Gold', 'Silver'], optionsHindi: ['लोहा', 'पारा (Mercury)', 'सोना', 'चांदी'], correctIndex: 1, prize: '' },
  { text: 'Who was the first person to walk on the moon?', textHindi: 'चंद्रमा पर कदम रखने वाले पहले व्यक्ति कौन थे?', options: ['Yuri Gagarin', 'Buzz Aldrin', 'Neil Armstrong', 'Michael Collins'], optionsHindi: ['यूरी गागरिन', 'बज़ एल्ड्रिन', 'नील आर्मस्ट्रांग', 'माइकल कोलिन्स'], correctIndex: 2, prize: '' },
  { text: 'Which planet is known for its rings?', textHindi: 'कौन सा ग्रह अपने छल्लों (rings) के लिए जाना जाता है?', options: ['Uranus', 'Neptune', 'Saturn', 'Jupiter'], optionsHindi: ['यूरेनस', 'नेपच्यून', 'शनि', 'बृहस्पति'], correctIndex: 2, prize: '' },
  { text: 'What is the chemical symbol for Gold?', textHindi: 'सोने (Gold) का रासायनिक प्रतीक क्या है?', options: ['Ag', 'Au', 'Gd', 'Go'], optionsHindi: ['Ag', 'Au', 'Gd', 'Go'], correctIndex: 1, prize: '' },
  { text: 'Which of the following is NOT a primary color?', textHindi: 'निम्नलिखित में से कौन सा प्राथमिक रंग (primary color) नहीं है?', options: ['Red', 'Yellow', 'Blue', 'Green'], optionsHindi: ['लाल', 'पीला', 'नीला', 'हरा'], correctIndex: 3, prize: '' },
  { text: 'What is the longest river in the world?', textHindi: 'विश्व की सबसे लंबी नदी कौन सी है?', options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'], optionsHindi: ['अमेज़न', 'नील (Nile)', 'यांग्त्ज़ी', 'मिसिसिपी'], correctIndex: 1, prize: '' },
  { text: 'Which river is considered the holiest in India?', textHindi: 'भारत में सबसे पवित्र नदी किसे माना जाता है?', options: ['Yamuna', 'Godavari', 'Ganga', 'Brahmaputra'], optionsHindi: ['यमुना', 'गोदावरी', 'गंगा', 'ब्रह्मपुत्र'], correctIndex: 2, prize: '' },
  { text: 'Who is known as the Father of the Nation in India?', textHindi: 'भारत में राष्ट्रपिता के रूप में किसे जाना जाता है?', options: ['Jawaharlal Nehru', 'Sardar Patel', 'Mahatma Gandhi', 'Bhagat Singh'], optionsHindi: ['जवाहरलाल नेहरू', 'सरदार पटेल', 'महात्मा गांधी', 'भगत सिंह'], correctIndex: 2, prize: '' },
];

const HARD_POOL: Question[] = [
  { text: 'Who was the first President of independent India?', textHindi: 'स्वतंत्र भारत के प्रथम राष्ट्रपति कौन थे?', options: ['Jawaharlal Nehru', 'Sardar Vallabhbhai Patel', 'Dr. Rajendra Prasad', 'B.R. Ambedkar'], optionsHindi: ['जवाहरलाल नेहरू', 'सरदार वल्लभभाई पटेल', 'डॉ. राजेंद्र प्रसाद', 'बी.आर. अंबेडकर'], correctIndex: 2, prize: '' },
  { text: 'Which Indian state has the longest coastline?', textHindi: 'भारत के किस राज्य की तटरेखा सबसे लंबी है?', options: ['Maharashtra', 'Tamil Nadu', 'Gujarat', 'Andhra Pradesh'], optionsHindi: ['महाराष्ट्र', 'तमिलनाडु', 'गुजरात', 'आंध्र प्रदेश'], correctIndex: 2, prize: '' },
  { text: 'What is the rarest blood type?', textHindi: 'सबसे दुर्लभ रक्त समूह (blood type) कौन सा है?', options: ['O Negative', 'B Negative', 'AB Negative', 'A Negative'], optionsHindi: ['O नेगेटिव', 'B नेगेटिव', 'AB नेगेटिव', 'A नेगेटिव'], correctIndex: 2, prize: '' },
  { text: 'Which ancient wonder was located in Alexandria?', textHindi: 'सिकंदरिया (Alexandria) में कौन सा प्राचीन अजूबा स्थित था?', options: ['Hanging Gardens', 'Colossus', 'Lighthouse', 'Pyramid'], optionsHindi: ['हैंगिंग गार्डन्स', 'कोलॉसस', 'लाइटहाउस', 'पिरामिड'], correctIndex: 2, prize: '' },
  { text: 'Who wrote the epic poem "The Odyssey"?', textHindi: 'महाकाव्य "द ओडिसी" किसने लिखा था?', options: ['Virgil', 'Homer', 'Sophocles', 'Ovid'], optionsHindi: ['वर्जिल', 'होमर', 'सोफोक्लेस', 'ओविड'], correctIndex: 1, prize: '' },
  { text: 'What is the smallest country in the world by area?', textHindi: 'क्षेत्रफल की दृष्टि से विश्व का सबसे छोटा देश कौन सा है?', options: ['Monaco', 'San Marino', 'Vatican City', 'Liechtenstein'], optionsHindi: ['मोनाको', 'सैन मैरिनो', 'वेटिकन सिटी', 'लिकटेंस्टीन'], correctIndex: 2, prize: '' },
  { text: 'Which element is named after the creator of dynamite?', textHindi: 'डायनामाइट के निर्माता के नाम पर किस तत्व का नाम रखा गया है?', options: ['Einsteinium', 'Nobelium', 'Fermium', 'Mendelevium'], optionsHindi: ['आइंस्टीनियम', 'नोबेलियम', 'फर्मियम', 'मेंडेलिवियम'], correctIndex: 1, prize: '' },
  { text: 'Who was the first female Prime Minister of a country?', textHindi: 'किसी देश की पहली महिला प्रधान मंत्री कौन थीं?', options: ['Indira Gandhi', 'Margaret Thatcher', 'Sirimavo Bandaranaike', 'Golda Meir'], optionsHindi: ['इंदिरा गांधी', 'मार्गरेट थैचर', 'सिरिमावो भंडारनायके', 'गोल्डा मीर'], correctIndex: 2, prize: '' },
  { text: 'In which year did the Soviet Union dissolve?', textHindi: 'सोवियत संघ का विघटन किस वर्ष हुआ था?', options: ['1989', '1990', '1991', '1992'], optionsHindi: ['1989', '1990', '1991', '1992'], correctIndex: 2, prize: '' },
  { text: 'What is the capital of Iceland?', textHindi: 'आइसलैंड की राजधानी क्या है?', options: ['Oslo', 'Reykjavik', 'Helsinki', 'Stockholm'], optionsHindi: ['ओस्लो', 'रेक्जाविक', 'हेलसिंकी', 'स्टॉकहोम'], correctIndex: 1, prize: '' },
  { text: 'Who formulated the laws of motion?', textHindi: 'गति के नियमों का प्रतिपादन किसने किया?', options: ['Albert Einstein', 'Galileo Galilei', 'Isaac Newton', 'Johannes Kepler'], optionsHindi: ['अल्बर्ट आइंस्टीन', 'गैलीलियो गैलीली', 'आइजैक न्यूटन', 'जोहान्स केपलर'], correctIndex: 2, prize: '' },
  { text: 'What is the currency of Brazil?', textHindi: 'ब्राजील की मुद्रा क्या है?', options: ['Peso', 'Real', 'Bolivar', 'Sol'], optionsHindi: ['पेसो', 'रियल', 'बोलिवर', 'सोल'], correctIndex: 1, prize: '' },
  { text: 'Which physicist developed the uncertainty principle?', textHindi: 'किस भौतिक विज्ञानी ने अनिश्चितता सिद्धांत (uncertainty principle) विकसित किया?', options: ['Niels Bohr', 'Werner Heisenberg', 'Max Planck', 'Erwin Schrödinger'], optionsHindi: ['नील्स बोहर', 'वर्नर हाइजेनबर्ग', 'मैक्स प्लैंक', 'इरविन श्रोडिंगर'], correctIndex: 1, prize: '' },
  { text: 'What is the longest bone in the human body?', textHindi: 'मानव शरीर की सबसे लंबी हड्डी कौन सी है?', options: ['Tibia', 'Fibula', 'Femur', 'Humerus'], optionsHindi: ['टिबिया', 'फाइबुला', 'फीमर', 'ह्यूमरस'], correctIndex: 2, prize: '' },
  { text: 'Which war was fought between 1914 and 1918?', textHindi: '1914 और 1918 के बीच कौन सा युद्ध लड़ा गया था?', options: ['World War I', 'World War II', 'Vietnam War', 'Korean War'], optionsHindi: ['प्रथम विश्व युद्ध', 'द्वितीय विश्व युद्ध', 'वियतनाम युद्ध', 'कोरियाई युद्ध'], correctIndex: 0, prize: '' },
  { text: 'What is the study of mushrooms called?', textHindi: 'मशरूम के अध्ययन को क्या कहा जाता है?', options: ['Botany', 'Mycology', 'Zoology', 'Entomology'], optionsHindi: ['बॉटनी', 'माइकोलॉजी', 'जूलॉजी', 'एंटोमोलॉजी'], correctIndex: 1, prize: '' },
  { text: 'Which monarch had the longest reign in British history?', textHindi: 'ब्रिटिश इतिहास में किस सम्राट का शासनकाल सबसे लंबा रहा?', options: ['Queen Victoria', 'King George III', 'Queen Elizabeth II', 'King Henry VIII'], optionsHindi: ['महारानी विक्टोरिया', 'राजा जॉर्ज तृतीय', 'महारानी एलिजाबेथ द्वितीय', 'राजा हेनरी अष्टम'], correctIndex: 2, prize: '' },
  { text: 'What was the first artificial Earth satellite?', textHindi: 'पहला कृत्रिम पृथ्वी उपग्रह कौन सा था?', options: ['Apollo 11', 'Vostok 1', 'Sputnik 1', 'Explorer 1'], optionsHindi: ['अपोलो 11', 'वोस्तोक 1', 'स्पुतनिक 1', 'एक्सप्लोरर 1'], correctIndex: 2, prize: '' },
  { text: 'Who wrote the Indian national anthem "Jana Gana Mana"?', textHindi: 'भारतीय राष्ट्रगान "जन गण मन" किसने लिखा था?', options: ['Bankim Chandra Chatterjee', 'Rabindranath Tagore', 'Sarojini Naidu', 'Premchand'], optionsHindi: ['बंकिम चंद्र चटर्जी', 'रवींद्रनाथ टैगोर', 'सरोजिनी नायडू', 'प्रेमचंद'], correctIndex: 1, prize: '' },
  { text: 'What is the primary language spoken in Brazil?', textHindi: 'ब्राज़ील में मुख्य रूप से कौन सी भाषा बोली जाती है?', options: ['Spanish', 'Portuguese', 'English', 'French'], optionsHindi: ['स्पेनिश', 'पुर्तगाली', 'अंग्रेजी', 'फ्रेंच'], correctIndex: 1, prize: '' }
];

@Injectable({
  providedIn: 'root'
})
export class GameService {
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  currentPrize: string = '0';
  playerName: string = '';
  
  lifelines: Lifeline[] = [
    { name: 'Phone a Friend', used: false, type: 'phone', icon: 'call' },
    { name: 'Audience Poll', used: false, type: 'audience', icon: 'people' },
    { name: 'Double Chance', used: false, type: 'double', icon: 'reload-circle' },
    { name: '50:50', used: false, type: '50-50', icon: 'close-circle' } 
  ];

  constructor() {
    this.generateNewGame();
  }

  generateNewGame() {
    // Select 5 Easy, 6 Medium, 5 Hard
    const selectedEasy = this.getRandomQuestions(EASY_POOL, 5);
    const selectedMedium = this.getRandomQuestions(MEDIUM_POOL, 6);
    const selectedHard = this.getRandomQuestions(HARD_POOL, 5);
    
    const combined = [...selectedEasy, ...selectedMedium, ...selectedHard];
    
    // Assign prizes and milestones dynamically
    this.questions = combined.map((q, index) => {
      // Deep copy to prevent modifying the constant pools
      const newQ = { ...q, options: [...q.options], optionsHindi: [...q.optionsHindi] };
      newQ.prize = PRIZE_LADDER[index].prize;
      newQ.isMilestone = PRIZE_LADDER[index].isMilestone;
      return newQ;
    });
    
    this.shuffleAllOptions();
  }
  
  getRandomQuestions(pool: Question[], count: number): Question[] {
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  }

  shuffleAllOptions() {
    this.questions.forEach(q => {
      const correctAnswer = q.options[q.correctIndex];
      for (let i = q.options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [q.options[i], q.options[j]] = [q.options[j], q.options[i]];
        [q.optionsHindi[i], q.optionsHindi[j]] = [q.optionsHindi[j], q.optionsHindi[i]];
      }
      q.correctIndex = q.options.indexOf(correctAnswer);
    });
  }

  getCurrentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  checkAnswer(selectedIndex: number): boolean {
    const isCorrect = selectedIndex === this.getCurrentQuestion().correctIndex;
    if (isCorrect) {
      this.currentPrize = this.getCurrentQuestion().prize;
      this.currentQuestionIndex++;
    }
    return isCorrect;
  }

  useLifeline(type: '50-50' | 'audience' | 'double' | 'phone'): any {
    const lifeline = this.lifelines.find(l => l.type === type);
    if (!lifeline || lifeline.used) return null;
    
    lifeline.used = true;
    const currentQ = this.getCurrentQuestion();
    
    if (type === 'phone') {
      const isCorrect = Math.random() < 0.8;
      const optionsArray = ['A', 'B', 'C', 'D'];
      let selectedIndex = currentQ.correctIndex;
      let quote = '';
      
      if (isCorrect) {
        const correctQuotes = [
          `I just googled it, the answer is definitely ${optionsArray[selectedIndex]}! Hurry up!`,
          `Are you serious? It's so easy! It's option ${optionsArray[selectedIndex]}!`,
          `I am 100% sure it is ${optionsArray[selectedIndex]}. Lock it!`,
          `My dad says it's ${optionsArray[selectedIndex]}. Trust me on this one.`,
          `Bro, I literally read about this yesterday. It's ${optionsArray[selectedIndex]}!`,
          `Don't overthink it, my friend. Lock ${optionsArray[selectedIndex]} and win the money!`,
          `If it's not ${optionsArray[selectedIndex]}, I will give you the prize money myself!`,
          `I asked ChatGPT for you, it says the answer is ${optionsArray[selectedIndex]}.`,
          `I saw this in a meme yesterday, the answer is ${optionsArray[selectedIndex]}. Thank me later!`,
          `Amitabh Bachchan whispered this to me in a dream... it's definitely ${optionsArray[selectedIndex]}!`,
          `If it's not ${optionsArray[selectedIndex]}, I'll eat my shoe. Lock it in!`,
          `Bro, this is literally my favorite topic. Go with ${optionsArray[selectedIndex]} and buy me dinner!`,
          `My dog barked ${selectedIndex + 1} times, so it has to be ${optionsArray[selectedIndex]}!`
        ];
        quote = correctQuotes[Math.floor(Math.random() * correctQuotes.length)];
      } else {
        const wrongIndices = [0, 1, 2, 3].filter(i => i !== currentQ.correctIndex);
        selectedIndex = wrongIndices[Math.floor(Math.random() * wrongIndices.length)];
        const unsureQuotes = [
          `Hello? Bro I am sleeping... I think it's ${optionsArray[selectedIndex]} but don't blame me if you go bankrupt!`,
          `I'm not really sure... maybe ${optionsArray[selectedIndex]}? Good luck man.`,
          `Uhh... I think I read somewhere it was ${optionsArray[selectedIndex]}. Please don't lock it if you're not sure!`,
          `I don't know this one! If I had to guess, maybe ${optionsArray[selectedIndex]}?`,
          `Why did you call me for this?! Just guess ${optionsArray[selectedIndex]} and pray.`,
          `Wait, is Amitabh Bachchan there? Tell him I said hi! Oh, and the answer might be ${optionsArray[selectedIndex]}.`,
          `My internet is down! Uh... ${optionsArray[selectedIndex]}? Just go with it!`,
          `I asked my little brother and he said ${optionsArray[selectedIndex]}. He is 5 years old though...`
        ];
        quote = unsureQuotes[Math.floor(Math.random() * unsureQuotes.length)];
      }
      
      return { option: optionsArray[selectedIndex], quote: quote };
    }
    
    if (type === '50-50') {
      let incorrectIndices = [0, 1, 2, 3].filter(i => i !== currentQ.correctIndex);
      incorrectIndices = incorrectIndices.sort(() => 0.5 - Math.random()).slice(0, 2);
      return incorrectIndices; 
    }
    
    if (type === 'audience') {
      let percentages = [0, 0, 0, 0];
      let remaining = 100;
      
      let correctPercentage = Math.floor(Math.random() * 31) + 40; 
      percentages[currentQ.correctIndex] = correctPercentage;
      remaining -= correctPercentage;
      
      let wrongIndices = [0, 1, 2, 3].filter(i => i !== currentQ.correctIndex);
      wrongIndices.forEach((index, i) => {
        if (i === 2) {
          percentages[index] = remaining;
        } else {
          let p = Math.floor(Math.random() * remaining);
          percentages[index] = p;
          remaining -= p;
        }
      });
      return percentages;
    }
    
    if (type === 'double') {
      return true;
    }
  }
  
  resetGame() {
    this.currentQuestionIndex = 0;
    this.currentPrize = '0';
    this.lifelines.forEach(l => l.used = false);
    this.generateNewGame();
  }
}
