// src/lib/teamsData.ts
// Crex player images: https://cricketvectors.akamaized.net/players/org/{crexId}.png

export type Role = 'BAT' | 'BOWL' | 'AR' | 'WK';

export interface Player {
  name: string;       // Full name (for matching API data)
  shortName: string;  // Display: "R. Sharma"
  team: string;
  role: Role;
  price: number;
  crexId: string;     // From crex.com/player/{slug}-{ID}
  crexSlug: string;   // e.g. "rohit-sharma"
}

export interface Manager {
  id: string;
  name: string;
  teamName: string;
  captain?: string;      // player shortName
  viceCaptain?: string;  // player shortName
  super3xPlayer?: string;
  players: Player[];
}

function fmt(first: string, last: string): string {
  return `${first[0]}. ${last}`;
}

export const MANAGERS: Manager[] = [
  {
    id: 'dharam', name: 'Dharam', teamName: "Dharam's XI",
    captain: 'Shubman Gill', viceCaptain: 'Rohit Sharma',
    players: [
      { name: 'Romario Shepherd',      shortName: fmt('R','Shepherd'),       team:'RCB', role:'AR',   price:1.5,  crexId:'1CR',  crexSlug:'romario-shepherd' },
      { name: 'Shubman Gill',          shortName: fmt('S','Gill'),            team:'GT',  role:'BAT',  price:16.5, crexId:'1AJ',  crexSlug:'shubman-gill' },
      { name: 'Pathum Nissanka',       shortName: fmt('P','Nissanka'),        team:'DC',  role:'BAT',  price:4,    crexId:'DS',   crexSlug:'pathum-nissanka' },
      { name: 'Nitish Kumar Reddy',    shortName: fmt('N','Reddy'),           team:'SRH', role:'AR',   price:6,    crexId:'1HO',  crexSlug:'nitish-kumar-reddy' },
      { name: 'Jofra Archer',          shortName: fmt('J','Archer'),          team:'RR',  role:'BOWL', price:12.5, crexId:'6J',   crexSlug:'jofra-archer' },
      { name: 'Washington Sundar',     shortName: fmt('W','Sundar'),          team:'GT',  role:'AR',   price:3.2,  crexId:'BO',   crexSlug:'washington-sundar' },
      { name: 'Aiden Markram',         shortName: fmt('A','Markram'),         team:'LSG', role:'BAT',  price:2,    crexId:'5A',   crexSlug:'aiden-markram' },
      { name: 'Tim Seifert',           shortName: fmt('T','Seifert'),         team:'KKR', role:'BAT',  price:1.5,  crexId:'EJ',   crexSlug:'tim-seifert' },
      { name: 'Tilak Varma',           shortName: fmt('T','Varma'),           team:'MI',  role:'AR',   price:8,    crexId:'1BW',  crexSlug:'tilak-varma' },
      { name: 'Mayank Yadav',          shortName: fmt('M','Yadav'),           team:'LSG', role:'BOWL', price:11,   crexId:'1HN',  crexSlug:'mayank-yadav' },
      { name: 'Vaibhav Suryavanshi',   shortName: fmt('V','Suryavanshi'),     team:'RR',  role:'BAT',  price:1.1,  crexId:'1LT',  crexSlug:'vaibhav-suryavanshi' },
      { name: 'Tim David',             shortName: fmt('T','David'),           team:'RCB', role:'AR',   price:3,    crexId:'HA',   crexSlug:'tim-david' },
      { name: 'Mohammed Siraj',        shortName: fmt('M','Siraj'),           team:'GT',  role:'BOWL', price:12.25,crexId:'BV',   crexSlug:'mohammed-siraj' },
      { name: 'Mitchell Santner',      shortName: fmt('M','Santner'),         team:'MI',  role:'AR',   price:2,    crexId:'6C',   crexSlug:'mitchell-santner' },
      { name: 'Rohit Sharma',          shortName: fmt('R','Sharma'),          team:'MI',  role:'BAT',  price:16.3, crexId:'7',    crexSlug:'rohit-sharma' },
    ],
  },
  {
    id: 'jai', name: 'Jai', teamName: "Jai's XI",
    captain: 'Jos Buttler', viceCaptain: 'Shreyas Iyer',
    players: [
      { name: 'Will Jacks',            shortName: fmt('W','Jacks'),           team:'MI',  role:'AR',   price:5.25, crexId:'1BR',  crexSlug:'will-jacks' },
      { name: 'Angkrish Raghuvanshi',  shortName: fmt('A','Raghuvanshi'),     team:'KKR', role:'BAT',  price:3,    crexId:'1HJ',  crexSlug:'angkrish-raghuvanshi' },
      { name: 'Devdutt Padikkal',      shortName: fmt('D','Padikkal'),        team:'RCB', role:'BAT',  price:2,    crexId:'1AP',  crexSlug:'devdutt-padikkal' },
      { name: 'Trent Boult',           shortName: fmt('T','Boult'),           team:'MI',  role:'BOWL', price:12.5, crexId:'3R',   crexSlug:'trent-boult' },
      { name: 'Ayush Mhatre',          shortName: fmt('A','Mhatre'),          team:'CSK', role:'BAT',  price:0.3,  crexId:'1KA',  crexSlug:'ayush-mhatre' },
      { name: 'Marco Jansen',          shortName: fmt('M','Jansen'),          team:'PBKS',role:'AR',   price:7,    crexId:'1CE',  crexSlug:'marco-jansen' },
      { name: 'Jos Buttler',           shortName: fmt('J','Buttler'),         team:'GT',  role:'BAT',  price:15.75,crexId:'1I',   crexSlug:'jos-buttler' },
      { name: 'Shreyas Iyer',          shortName: fmt('S','Iyer'),            team:'PBKS',role:'BAT',  price:26.75,crexId:'AZ',   crexSlug:'shreyas-iyer' },
      { name: 'Tushar Deshpande',      shortName: fmt('T','Deshpande'),       team:'RR',  role:'BOWL', price:6.5,  crexId:'1AA',  crexSlug:'tushar-deshpande' },
      { name: 'Digvesh Rathi',         shortName: fmt('D','Rathi'),           team:'LSG', role:'BOWL', price:0.3,  crexId:'1KR',  crexSlug:'digvesh-rathi' },
      { name: 'Vaibhav Arora',         shortName: fmt('V','Arora'),           team:'KKR', role:'BOWL', price:1.8,  crexId:'1CJ',  crexSlug:'vaibhav-arora' },
      { name: 'Ajinkya Rahane',        shortName: fmt('A','Rahane'),          team:'KKR', role:'BAT',  price:1.5,  crexId:'2E',   crexSlug:'ajinkya-rahane' },
      { name: 'Rahul Chahar',          shortName: fmt('R','Chahar'),          team:'CSK', role:'BOWL', price:5.2,  crexId:'BX',   crexSlug:'rahul-chahar' },
      { name: 'Krunal Pandya',         shortName: fmt('K','Pandya'),          team:'RCB', role:'AR',   price:5.75, crexId:'AU',   crexSlug:'krunal-pandya' },
      { name: 'Ayush Badoni',          shortName: fmt('A','Badoni'),          team:'LSG', role:'AR',   price:4,    crexId:'1CK',  crexSlug:'ayush-badoni' },
    ],
  },
  {
    id: 'sambhav', name: 'Sambhav', teamName: "Sambhav's XI",
    captain: 'Yashasvi Jaiswal', viceCaptain: 'Sai Sudharsan',
    players: [
      { name: 'Prasidh Krishna',       shortName: fmt('P','Krishna'),         team:'GT',  role:'BOWL', price:9.5,  crexId:'EF',   crexSlug:'prasidh-krishna' },
      { name: 'Aqib Nabi',             shortName: fmt('A','Nabi'),            team:'DC',  role:'AR',   price:8.4,  crexId:'1M',   crexSlug:'aqib-nabi' },
      { name: 'Sherfane Rutherford',   shortName: fmt('S','Rutherford'),      team:'MI',  role:'BAT',  price:2.6,  crexId:'1DL',  crexSlug:'sherfane-rutherford' },
      { name: 'Ravichandran Smaran',   shortName: fmt('R','Smaran'),          team:'SRH', role:'BAT',  price:0.3,  crexId:'1LN',  crexSlug:'ravichandran-smaran' },
      { name: 'Shashank Singh',        shortName: fmt('S','Singh'),           team:'PBKS',role:'AR',   price:5.5,  crexId:'1BE',  crexSlug:'shashank-singh' },
      { name: 'Urvil Patel',           shortName: fmt('U','Patel'),           team:'CSK', role:'BAT',  price:0.3,  crexId:'1LG',  crexSlug:'urvil-patel' },
      { name: 'Rachin Ravindra',       shortName: fmt('R','Ravindra'),        team:'KKR', role:'AR',   price:2,    crexId:'1BH',  crexSlug:'rachin-ravindra' },
      { name: 'Jasprit Bumrah',        shortName: fmt('J','Bumrah'),          team:'MI',  role:'BOWL', price:18,   crexId:'AU',   crexSlug:'jasprit-bumrah' },
      { name: 'Sai Sudharsan',         shortName: fmt('S','Sudharsan'),       team:'GT',  role:'BAT',  price:8.5,  crexId:'6M2',  crexSlug:'b-sai-sudharsan' },
      { name: 'Riyan Parag',           shortName: fmt('R','Parag'),           team:'RR',  role:'AR',   price:14,   crexId:'1AO',  crexSlug:'riyan-parag' },
      { name: 'Yashasvi Jaiswal',      shortName: fmt('Y','Jaiswal'),         team:'RR',  role:'BAT',  price:18,   crexId:'1AH',  crexSlug:'yashasvi-jaiswal' },
      { name: 'Prithvi Shaw',          shortName: fmt('P','Shaw'),            team:'DC',  role:'BAT',  price:0.75, crexId:'1AD',  crexSlug:'prithvi-shaw' },
    ],
  },
  {
    id: 'arhan', name: 'Arhan', teamName: "Arhan's XI",
    captain: 'Axar Patel', viceCaptain: 'Heinrich Klaasen',
    players: [
      { name: 'Arshdeep Singh',        shortName: fmt('A','Singh'),           team:'PBKS',role:'BOWL', price:18,   crexId:'1AK',  crexSlug:'arshdeep-singh' },
      { name: 'Naman Dhir',            shortName: fmt('N','Dhir'),            team:'MI',  role:'AR',   price:5.25, crexId:'1HM',  crexSlug:'naman-dhir' },
      { name: 'Yuzvendra Chahal',      shortName: fmt('Y','Chahal'),          team:'PBKS',role:'BOWL', price:18,   crexId:'5L',   crexSlug:'yuzvendra-chahal' },
      { name: 'Tristan Stubbs',        shortName: fmt('T','Stubbs'),          team:'DC',  role:'BAT',  price:10,   crexId:'1CY',  crexSlug:'tristan-stubbs' },
      { name: 'Lungi Ngidi',           shortName: fmt('L','Ngidi'),           team:'DC',  role:'BOWL', price:2,    crexId:'7E',   crexSlug:'lungi-ngidi' },
      { name: 'Harshal Patel',         shortName: fmt('H','Patel'),           team:'SRH', role:'AR',   price:8,    crexId:'4Z',   crexSlug:'harshal-patel' },
      { name: 'Shimron Hetmyer',       shortName: fmt('S','Hetmyer'),         team:'RR',  role:'BAT',  price:11,   crexId:'7O',   crexSlug:'shimron-hetmyer' },
      { name: 'Dhruv Jurel',           shortName: fmt('D','Jurel'),           team:'RR',  role:'BAT',  price:14,   crexId:'1HG',  crexSlug:'dhruv-jurel' },
      { name: 'Axar Patel',            shortName: fmt('A','Patel'),           team:'DC',  role:'AR',   price:16.5, crexId:'5Y',   crexSlug:'axar-patel' },
      { name: 'Ravi Bishnoi',          shortName: fmt('R','Bishnoi'),         team:'RR',  role:'BOWL', price:7.2,  crexId:'1AX',  crexSlug:'ravi-bishnoi' },
      { name: 'MS Dhoni',              shortName: fmt('M','Dhoni'),           team:'CSK', role:'BAT',  price:4,    crexId:'3',    crexSlug:'ms-dhoni' },
      { name: 'Rishabh Pant',          shortName: fmt('R','Pant'),            team:'LSG', role:'BAT',  price:27,   crexId:'AX',   crexSlug:'rishabh-pant' },
      { name: 'Heinrich Klaasen',      shortName: fmt('H','Klaasen'),         team:'SRH', role:'BAT',  price:23,   crexId:'4H',   crexSlug:'heinrich-klaasen' },
    ],
  },
  {
    id: 'vansh', name: 'Vansh', teamName: "Vansh's XI",
    captain: 'Travis Head', viceCaptain: 'Phil Salt',
    players: [
      { name: 'Mohammed Shami',        shortName: fmt('M','Shami'),           team:'LSG', role:'BOWL', price:10,   crexId:'5Q',   crexSlug:'mohammed-shami' },
      { name: 'Akash Deep',            shortName: fmt('A','Deep'),            team:'KKR', role:'BOWL', price:1,    crexId:'1HC',  crexSlug:'akash-deep' },
      { name: 'Akshat Raghuvanshi',    shortName: fmt('A','Raghuvanshi'),     team:'LSG', role:'BAT',  price:2.2,  crexId:'1LH',  crexSlug:'akshat-raghuvanshi' },
      { name: 'Priyansh Arya',         shortName: fmt('P','Arya'),            team:'PBKS',role:'BAT',  price:3.8,  crexId:'1JR',  crexSlug:'priyansh-arya' },
      { name: 'Abishek Porel',         shortName: fmt('A','Porel'),           team:'DC',  role:'BAT',  price:4,    crexId:'1HB',  crexSlug:'abishek-porel' },
      { name: 'Phil Salt',             shortName: fmt('P','Salt'),            team:'RCB', role:'BAT',  price:11.5, crexId:'1BV',  crexSlug:'phil-salt' },
      { name: 'Ravindra Jadeja',       shortName: fmt('R','Jadeja'),          team:'RR',  role:'AR',   price:14,   crexId:'1K',   crexSlug:'ravindra-jadeja' },
      { name: 'Shahbaz Ahmed',         shortName: fmt('S','Ahmed'),           team:'LSG', role:'AR',   price:2.4,  crexId:'1AB',  crexSlug:'shahbaz-ahmed' },
      { name: 'Noor Ahmad',            shortName: fmt('N','Ahmad'),           team:'CSK', role:'BOWL', price:10,   crexId:'1EU',  crexSlug:'noor-ahmad' },
      { name: 'Rahul Tewatia',         shortName: fmt('R','Tewatia'),         team:'GT',  role:'AR',   price:4,    crexId:'BR',   crexSlug:'rahul-tewatia' },
      { name: 'Rashid Khan',           shortName: fmt('R','Khan'),            team:'GT',  role:'BOWL', price:18,   crexId:'7N',   crexSlug:'rashid-khan' },
      { name: 'Mohsin Khan',           shortName: fmt('M','Khan'),            team:'LSG', role:'BOWL', price:4,    crexId:'1BM',  crexSlug:'mohsin-khan' },
      { name: 'David Miller',          shortName: fmt('D','Miller'),          team:'DC',  role:'BAT',  price:2,    crexId:'2L',   crexSlug:'david-miller' },
      { name: 'Travis Head',           shortName: fmt('T','Head'),            team:'SRH', role:'BAT',  price:14,   crexId:'5H',   crexSlug:'travis-head' },
      { name: 'Mitchell Owen',         shortName: fmt('M','Owen'),            team:'PBKS',role:'AR',   price:3,    crexId:'1LE',  crexSlug:'mitchell-owen' },
    ],
  },
  {
    id: 'roshan', name: 'Roshan', teamName: "Roshan's XI",
    captain: 'KL Rahul', viceCaptain: 'Hardik Pandya',
    players: [
      { name: 'Virat Kohli',           shortName: fmt('V','Kohli'),           team:'RCB', role:'BAT',  price:21,   crexId:'C',    crexSlug:'virat-kohli' },
      { name: 'Hardik Pandya',         shortName: fmt('H','Pandya'),          team:'MI',  role:'AR',   price:16.35,crexId:'AQ',   crexSlug:'hardik-pandya' },
      { name: 'Matthew Short',         shortName: fmt('M','Short'),           team:'CSK', role:'AR',   price:1.5,  crexId:'1FE',  crexSlug:'matthew-short' },
      { name: 'Abdul Samad',           shortName: fmt('A','Samad'),           team:'LSG', role:'AR',   price:4.2,  crexId:'1AY',  crexSlug:'abdul-samad' },
      { name: 'Azmatullah Omarzai',    shortName: fmt('A','Omarzai'),         team:'PBKS',role:'AR',   price:2.4,  crexId:'1FB',  crexSlug:'azmatullah-omarzai' },
      { name: 'Ryan Rickelton',        shortName: fmt('R','Rickelton'),       team:'MI',  role:'BAT',  price:1,    crexId:'1LA',  crexSlug:'ryan-rickelton' },
      { name: 'Sai Kishore',           shortName: fmt('S','Kishore'),         team:'GT',  role:'AR',   price:2,    crexId:'1CA',  crexSlug:'r-sai-kishore' },
      { name: 'Shardul Thakur',        shortName: fmt('S','Thakur'),          team:'MI',  role:'AR',   price:2,    crexId:'BZ',   crexSlug:'shardul-thakur' },
      { name: 'Deepak Chahar',         shortName: fmt('D','Chahar'),          team:'MI',  role:'BOWL', price:9.25, crexId:'BW',   crexSlug:'deepak-chahar' },
      { name: 'Khaleel Ahmed',         shortName: fmt('K','Ahmed'),           team:'CSK', role:'BOWL', price:4.8,  crexId:'BN',   crexSlug:'khaleel-ahmed' },
      { name: 'Dewald Brevis',         shortName: fmt('D','Brevis'),          team:'CSK', role:'BAT',  price:2.2,  crexId:'1CG',  crexSlug:'dewald-brevis' },
      { name: 'Zeeshan Ansari',        shortName: fmt('Z','Ansari'),          team:'SRH', role:'BOWL', price:0.4,  crexId:'1LJ',  crexSlug:'zeeshan-ansari' },
      { name: 'KL Rahul',              shortName: 'KL Rahul',                 team:'DC',  role:'BAT',  price:14,   crexId:'5T',   crexSlug:'kl-rahul' },
      { name: 'Harpreet Brar',         shortName: fmt('H','Brar'),            team:'PBKS',role:'AR',   price:1.5,  crexId:'1AI',  crexSlug:'harpreet-brar' },
      { name: 'Rinku Singh',           shortName: fmt('R','Singh'),           team:'KKR', role:'BAT',  price:13,   crexId:'1CC',  crexSlug:'rinku-singh' },
    ],
  },
  {
    id: 'shaurya', name: 'Shaurya', teamName: "Shaurya's XI",
    captain: 'Abhishek Sharma', viceCaptain: 'Suryakumar Yadav',
    players: [
      { name: 'Abhishek Sharma',       shortName: fmt('A','Sharma'),          team:'SRH', role:'AR',   price:14,   crexId:'1AL',  crexSlug:'abhishek-sharma' },
      { name: 'Mayank Markande',       shortName: fmt('M','Markande'),        team:'MI',  role:'BOWL', price:0.3,  crexId:'BK',   crexSlug:'mayank-markande' },
      { name: 'Suryakumar Yadav',      shortName: fmt('S','Yadav'),           team:'MI',  role:'BAT',  price:40,   crexId:'BB',   crexSlug:'suryakumar-yadav' },
      { name: 'Nehal Wadhera',         shortName: fmt('N','Wadhera'),         team:'PBKS',role:'BAT',  price:4.2,  crexId:'1HK',  crexSlug:'nehal-wadhera' },
      { name: 'Finn Allen',            shortName: fmt('F','Allen'),           team:'KKR', role:'BAT',  price:2,    crexId:'1CF',  crexSlug:'finn-allen' },
      { name: 'Umran Malik',           shortName: fmt('U','Malik'),           team:'KKR', role:'BOWL', price:0.75, crexId:'1BX',  crexSlug:'umran-malik' },
      { name: 'Suyash Sharma',         shortName: fmt('S','Sharma'),          team:'RCB', role:'BOWL', price:2.6,  crexId:'1HI',  crexSlug:'suyash-sharma' },
      { name: 'Marcus Stoinis',        shortName: fmt('M','Stoinis'),         team:'PBKS',role:'AR',   price:11,   crexId:'5D',   crexSlug:'marcus-stoinis' },
      { name: 'Nitish Rana',           shortName: fmt('N','Rana'),            team:'DC',  role:'AR',   price:4.2,  crexId:'AV',   crexSlug:'nitish-rana' },
      { name: 'T Natarajan',           shortName: fmt('T','Natarajan'),       team:'DC',  role:'BOWL', price:10.75,crexId:'1AW',  crexSlug:'t-natarajan' },
      { name: 'Mitchell Marsh',        shortName: fmt('M','Marsh'),           team:'LSG', role:'AR',   price:3.4,  crexId:'2X',   crexSlug:'mitchell-marsh' },
      { name: 'Jacob Bethell',         shortName: fmt('J','Bethell'),         team:'RCB', role:'AR',   price:2.6,  crexId:'1GH',  crexSlug:'jacob-bethell' },
      { name: 'Shahrukh Khan',         shortName: fmt('S','Khan'),            team:'GT',  role:'AR',   price:4,    crexId:'1BC',  crexSlug:'m-shahrukh-khan' },
      { name: 'Glenn Phillips',        shortName: fmt('G','Phillips'),        team:'GT',  role:'BAT',  price:2,    crexId:'D8',   crexSlug:'glenn-phillips' },
      { name: 'Jamie Overton',         shortName: fmt('J','Overton'),         team:'CSK', role:'AR',   price:1.5,  crexId:'1CB',  crexSlug:'jamie-overton' },
    ],
  },
  {
    id: 'vibhu', name: 'Vibhu', teamName: "Vibhu's XI",
    captain: 'Ishan Kishan', viceCaptain: 'Cameron Green',
    players: [
      { name: 'Varun Chakravarthy',    shortName: fmt('V','Chakravarthy'),    team:'KKR', role:'BOWL', price:12,   crexId:'1AV',  crexSlug:'varun-chakravarthy' },
      { name: 'Jitesh Sharma',         shortName: fmt('J','Sharma'),          team:'RCB', role:'BAT',  price:11,   crexId:'1BI',  crexSlug:'jitesh-sharma' },
      { name: 'Mangesh Yadav',         shortName: fmt('M','Yadav'),           team:'RCB', role:'AR',   price:5.2,  crexId:'1HF',  crexSlug:'mangesh-yadav' },
      { name: 'Ishan Kishan',          shortName: fmt('I','Kishan'),          team:'SRH', role:'BAT',  price:11.25,crexId:'BD',   crexSlug:'ishan-kishan' },
      { name: 'Sameer Rizvi',          shortName: fmt('S','Rizvi'),           team:'DC',  role:'AR',   price:0.95, crexId:'1HE',  crexSlug:'sameer-rizvi' },
      { name: 'Cameron Green',         shortName: fmt('C','Green'),           team:'KKR', role:'BAT',  price:25.2, crexId:'1BF',  crexSlug:'cameron-green' },
      { name: 'Sarfaraz Khan',         shortName: fmt('S','Khan'),            team:'CSK', role:'BAT',  price:0.75, crexId:'BY',   crexSlug:'sarfaraz-khan' },
      { name: 'Nicholas Pooran',       shortName: fmt('N','Pooran'),          team:'LSG', role:'BAT',  price:21,   crexId:'B6',   crexSlug:'nicholas-pooran' },
      { name: 'Kagiso Rabada',         shortName: fmt('K','Rabada'),          team:'GT',  role:'BOWL', price:10.75,crexId:'6B',   crexSlug:'kagiso-rabada' },
      { name: 'Kuldeep Yadav',         shortName: fmt('K','Yadav'),           team:'DC',  role:'BOWL', price:13.25,crexId:'5W',   crexSlug:'kuldeep-yadav' },
      { name: 'Bhuvneshwar Kumar',     shortName: fmt('B','Kumar'),           team:'RCB', role:'BOWL', price:10.75,crexId:'G',    crexSlug:'bhuvneshwar-kumar' },
      { name: 'Prashant Veer',         shortName: fmt('P','Veer'),            team:'CSK', role:'AR',   price:14.2, crexId:'1LB',  crexSlug:'prashant-veer' },
      { name: 'Harsh Dubey',           shortName: fmt('H','Dubey'),           team:'SRH', role:'AR',   price:0.3,  crexId:'1LI',  crexSlug:'harsh-dubey' },
      { name: 'Quinton de Kock',       shortName: fmt('Q','de Kock'),         team:'MI',  role:'BAT',  price:2,    crexId:'4O',   crexSlug:'quinton-de-kock' },
    ],
  },
  {
    id: 'aryan', name: 'Aryan', teamName: "Aryan's XI",
    captain: 'Ruturaj Gaikwad', viceCaptain: 'Sanju Samson',
    players: [
      { name: 'Avesh Khan',            shortName: fmt('A','Khan'),            team:'LSG', role:'BOWL', price:9.75, crexId:'BJ',   crexSlug:'avesh-khan' },
      { name: 'Kartik Sharma',         shortName: fmt('K','Sharma'),          team:'CSK', role:'BAT',  price:14.2, crexId:'1LO',  crexSlug:'kartik-sharma' },
      { name: 'Karun Nair',            shortName: fmt('K','Nair'),            team:'DC',  role:'BAT',  price:0.5,  crexId:'6F',   crexSlug:'karun-nair' },
      { name: 'Rajat Patidar',         shortName: fmt('R','Patidar'),         team:'RCB', role:'BAT',  price:11,   crexId:'1BK',  crexSlug:'rajat-patidar' },
      { name: 'Sanju Samson',          shortName: fmt('S','Samson'),          team:'CSK', role:'BAT',  price:18,   crexId:'5X',   crexSlug:'sanju-samson' },
      { name: 'Mukesh Kumar',          shortName: fmt('M','Kumar'),           team:'DC',  role:'BOWL', price:8,    crexId:'1CM',  crexSlug:'mukesh-kumar' },
      { name: 'Ashutosh Sharma',       shortName: fmt('A','Sharma'),          team:'DC',  role:'AR',   price:3.8,  crexId:'1JJ',  crexSlug:'ashutosh-sharma' },
      { name: 'Shivam Dube',           shortName: fmt('S','Dube'),            team:'CSK', role:'AR',   price:12,   crexId:'1AE',  crexSlug:'shivam-dube' },
      { name: 'Kyle Jamieson',         shortName: fmt('K','Jamieson'),        team:'DC',  role:'BOWL', price:2,    crexId:'1BL',  crexSlug:'kyle-jamieson' },
      { name: 'Sunil Narine',          shortName: fmt('S','Narine'),          team:'KKR', role:'BOWL', price:12,   crexId:'1L',   crexSlug:'sunil-narine' },
      { name: 'Nandre Burger',         shortName: fmt('N','Burger'),          team:'RR',  role:'BOWL', price:3.5,  crexId:'1EZ',  crexSlug:'nandre-burger' },
      { name: 'Mitchell Starc',        shortName: fmt('M','Starc'),           team:'DC',  role:'BOWL', price:11.75,crexId:'2S',   crexSlug:'mitchell-starc' },
      { name: 'Ruturaj Gaikwad',       shortName: fmt('R','Gaikwad'),         team:'CSK', role:'BAT',  price:18,   crexId:'1AN',  crexSlug:'ruturaj-gaikwad' },
      { name: 'Prabhsimran Singh',     shortName: fmt('P','Singh'),           team:'PBKS',role:'BAT',  price:4,    crexId:'1AG',  crexSlug:'prabhsimran-singh' },
      { name: 'Sandeep Sharma',        shortName: fmt('S','Sharma'),          team:'RR',  role:'BOWL', price:4,    crexId:'5V',   crexSlug:'sandeep-sharma' },
    ],
  },
];

export const IPL_TEAM_COLORS: Record<string, { bg: string; text: string }> = {
  MI:   { bg: '#003DA5', text: '#FFFFFF' },
  CSK:  { bg: '#F9CD05', text: '#1A1A1A' },
  RCB:  { bg: '#C8102E', text: '#FFFFFF' },
  KKR:  { bg: '#3A225D', text: '#F0C84A' },
  DC:   { bg: '#0078BC', text: '#FFFFFF' },
  SRH:  { bg: '#F7A721', text: '#1A1A1A' },
  RR:   { bg: '#EA1A85', text: '#FFFFFF' },
  PBKS: { bg: '#AA0000', text: '#FFFFFF' },
  GT:   { bg: '#1C4B9B', text: '#C8A951' },
  LSG:  { bg: '#A4C639', text: '#1A1A1A' },
};

export const ROLE_ICONS: Record<Role, string> = {
  BAT: '🏏', BOWL: '⚾', AR: '⚡', WK: '🧤',
};

export const ROLE_LABELS: Record<Role, string> = {
  BAT: 'Batsman', BOWL: 'Bowler', AR: 'All-Rounder', WK: 'Wicketkeeper',
};

// CREX fantasy points system
export const CREX_POINTS = {
  // Batting
  run: 1,
  four: 1,
  six: 2,
  fifty: 8,
  century: 16,
  duck: -4,
  // Strike rate bonus (min 10 balls)
  srAbove170: 6, srAbove150: 4, srAbove130: 2,
  srBelow50: -6, srBelow60: -4, srBelow70: -2,
  // Bowling
  wicket: 25,
  lbwBowled: 8,  // bonus on top of wicket
  threeWickets: 4,
  fourWickets: 8,
  fiveWickets: 16,
  maiden: 8,
  // Economy bonus (min 2 overs)
  econBelow5: 6, econBelow6: 4, econBelow7: 2,
  econAbove12: -6, econAbove11: -4, econAbove10: -2,
  // Fielding
  catch: 8,
  stumping: 12,
  runOut: 6, // direct
  // Playing
  playing: 4,
};

export function calcCrexPoints(stats: {
  runs?: number; balls?: number; fours?: number; sixes?: number;
  wickets?: number; oversBowled?: number; runsConceded?: number;
  maidens?: number; catches?: number; stumpings?: number; runOuts?: number;
  isLbwBowled?: number; didPlay?: boolean;
}): number {
  let pts = 0;
  const { runs=0, balls=0, fours=0, sixes=0, wickets=0, oversBowled=0,
    runsConceded=0, maidens=0, catches=0, stumpings=0, runOuts=0,
    isLbwBowled=0, didPlay=false } = stats;

  if (didPlay) pts += CREX_POINTS.playing;

  // Batting
  pts += runs * CREX_POINTS.run;
  pts += fours * CREX_POINTS.four;
  pts += sixes * CREX_POINTS.six;
  if (runs >= 100) pts += CREX_POINTS.century;
  else if (runs >= 50) pts += CREX_POINTS.fifty;
  if (runs === 0 && balls > 0) pts += CREX_POINTS.duck;
  if (balls >= 10) {
    const sr = (runs / balls) * 100;
    if (sr >= 170) pts += CREX_POINTS.srAbove170;
    else if (sr >= 150) pts += CREX_POINTS.srAbove150;
    else if (sr >= 130) pts += CREX_POINTS.srAbove130;
    else if (sr < 50) pts += CREX_POINTS.srBelow50;
    else if (sr < 60) pts += CREX_POINTS.srBelow60;
    else if (sr < 70) pts += CREX_POINTS.srBelow70;
  }

  // Bowling
  pts += wickets * CREX_POINTS.wicket;
  pts += isLbwBowled * CREX_POINTS.lbwBowled;
  if (wickets >= 5) pts += CREX_POINTS.fiveWickets;
  else if (wickets >= 4) pts += CREX_POINTS.fourWickets;
  else if (wickets >= 3) pts += CREX_POINTS.threeWickets;
  pts += maidens * CREX_POINTS.maiden;
  if (oversBowled >= 2) {
    const eco = runsConceded / oversBowled;
    if (eco < 5) pts += CREX_POINTS.econBelow5;
    else if (eco < 6) pts += CREX_POINTS.econBelow6;
    else if (eco < 7) pts += CREX_POINTS.econBelow7;
    else if (eco > 12) pts += CREX_POINTS.econAbove12;
    else if (eco > 11) pts += CREX_POINTS.econAbove11;
    else if (eco > 10) pts += CREX_POINTS.econAbove10;
  }

  // Fielding
  pts += catches * CREX_POINTS.catch;
  pts += stumpings * CREX_POINTS.stumping;
  pts += runOuts * CREX_POINTS.runOut;

  return pts;
}
