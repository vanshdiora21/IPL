// src/lib/teamsData.ts

export type Role = 'BAT' | 'BOWL' | 'AR' | 'WK';

export interface CricketPlayer {
  name: string;
  team: string;
  role: Role;
  price: number;
  manager: string;
  // Populated at runtime via scraping
  points?: number;
  imageUrl?: string;
  crexId?: string;
}

export interface Manager {
  id: string;
  name: string;
  teamName: string;
  captain?: string;
  viceCaptain?: string;
  super3xPlayer?: string;
  players: CricketPlayer[];
}

export const MANAGERS: Manager[] = [
  {
    id: 'dharam',
    name: 'Dharam',
    teamName: "Dharam's XI",
    players: [
      { name: 'Romario Shepherd', team: 'RCB', role: 'AR', price: 1.5, manager: 'Dharam' },
      { name: 'Shubman Gill', team: 'GT', role: 'BAT', price: 16.5, manager: 'Dharam' },
      { name: 'Pathum Nissanka', team: 'DC', role: 'BAT', price: 4, manager: 'Dharam' },
      { name: 'Nitish Kumar Reddy', team: 'SRH', role: 'AR', price: 6, manager: 'Dharam' },
      { name: 'Jofra Archer', team: 'RR', role: 'BOWL', price: 12.5, manager: 'Dharam' },
      { name: 'Washington Sundar', team: 'GT', role: 'AR', price: 3.2, manager: 'Dharam' },
      { name: 'Aiden Markram', team: 'LSG', role: 'BAT', price: 2, manager: 'Dharam' },
      { name: 'Tim Seifert', team: 'KKR', role: 'BAT', price: 1.5, manager: 'Dharam' },
      { name: 'Tilak Varma', team: 'MI', role: 'AR', price: 8, manager: 'Dharam' },
      { name: 'Mayank Yadav', team: 'LSG', role: 'BOWL', price: 11, manager: 'Dharam' },
      { name: 'Vaibhav Sooryavanshi', team: 'RR', role: 'BAT', price: 1.1, manager: 'Dharam' },
      { name: 'Tim David', team: 'RCB', role: 'AR', price: 3, manager: 'Dharam' },
      { name: 'Mohammed Siraj', team: 'GT', role: 'BOWL', price: 12.25, manager: 'Dharam' },
      { name: 'Mitchell Santner', team: 'MI', role: 'AR', price: 2, manager: 'Dharam' },
      { name: 'Rohit Sharma', team: 'MI', role: 'BAT', price: 16.3, manager: 'Dharam' },
    ],
  },
  {
    id: 'jai',
    name: 'Jai',
    teamName: "Jai's XI",
    players: [
      { name: 'Will Jacks', team: 'MI', role: 'AR', price: 5.25, manager: 'Jai' },
      { name: 'Angkrish Raghuvanshi', team: 'KKR', role: 'BAT', price: 3, manager: 'Jai' },
      { name: 'Devdutt Padikkal', team: 'RCB', role: 'BAT', price: 2, manager: 'Jai' },
      { name: 'Trent Boult', team: 'MI', role: 'BOWL', price: 12.5, manager: 'Jai' },
      { name: 'Ayush Mhatre', team: 'CSK', role: 'BAT', price: 0.3, manager: 'Jai' },
      { name: 'Marco Jansen', team: 'PBKS', role: 'AR', price: 7, manager: 'Jai' },
      { name: 'Jos Buttler', team: 'GT', role: 'BAT', price: 15.75, manager: 'Jai' },
      { name: 'Shreyas Iyer', team: 'PBKS', role: 'BAT', price: 26.75, manager: 'Jai' },
      { name: 'Tushar Deshpande', team: 'RR', role: 'BOWL', price: 6.5, manager: 'Jai' },
      { name: 'Digvesh Rathi', team: 'LSG', role: 'BOWL', price: 0.3, manager: 'Jai' },
      { name: 'Vaibhav Arora', team: 'KKR', role: 'BOWL', price: 1.8, manager: 'Jai' },
      { name: 'Ajinkya Rahane', team: 'KKR', role: 'BAT', price: 1.5, manager: 'Jai' },
      { name: 'Rahul Chahar', team: 'CSK', role: 'BOWL', price: 5.2, manager: 'Jai' },
      { name: 'Krunal Pandya', team: 'RCB', role: 'AR', price: 5.75, manager: 'Jai' },
      { name: 'Ayush Badoni', team: 'LSG', role: 'AR', price: 4, manager: 'Jai' },
    ],
  },
  {
    id: 'sambhav',
    name: 'Sambhav',
    teamName: "Sambhav's XI",
    players: [
      { name: 'Prasidh Krishna', team: 'GT', role: 'BOWL', price: 9.5, manager: 'Sambhav' },
      { name: 'Aqib Nabi', team: 'DC', role: 'AR', price: 8.4, manager: 'Sambhav' },
      { name: 'Sherfane Rutherford', team: 'MI', role: 'BAT', price: 2.6, manager: 'Sambhav' },
      { name: 'Ravichandran Smaran', team: 'SRH', role: 'BAT', price: 0.3, manager: 'Sambhav' },
      { name: 'Shashank Singh', team: 'PBKS', role: 'AR', price: 5.5, manager: 'Sambhav' },
      { name: 'Urvil Patel', team: 'CSK', role: 'BAT', price: 0.3, manager: 'Sambhav' },
      { name: 'Rachin Ravindra', team: 'KKR', role: 'AR', price: 2, manager: 'Sambhav' },
      { name: 'Jasprit Bumrah', team: 'MI', role: 'BOWL', price: 18, manager: 'Sambhav' },
      { name: 'Sai Sudharsan', team: 'GT', role: 'BAT', price: 8.5, manager: 'Sambhav' },
      { name: 'Riyan Parag', team: 'RR', role: 'AR', price: 14, manager: 'Sambhav' },
      { name: 'Yashasvi Jaiswal', team: 'RR', role: 'BAT', price: 18, manager: 'Sambhav' },
      { name: 'Prithvi Shaw', team: 'DC', role: 'BAT', price: 0.75, manager: 'Sambhav' },
    ],
  },
  {
    id: 'arhan',
    name: 'Arhan',
    teamName: "Arhan's XI",
    players: [
      { name: 'Arshdeep Singh', team: 'PBKS', role: 'BOWL', price: 18, manager: 'Arhan' },
      { name: 'Naman Dhir', team: 'MI', role: 'AR', price: 5.25, manager: 'Arhan' },
      { name: 'Yuzvendra Chahal', team: 'PBKS', role: 'BOWL', price: 18, manager: 'Arhan' },
      { name: 'Tristan Stubbs', team: 'DC', role: 'BAT', price: 10, manager: 'Arhan' },
      { name: 'Lungi Ngidi', team: 'DC', role: 'BOWL', price: 2, manager: 'Arhan' },
      { name: 'Harshal Patel', team: 'SRH', role: 'AR', price: 8, manager: 'Arhan' },
      { name: 'Shimron Hetmyer', team: 'RR', role: 'BAT', price: 11, manager: 'Arhan' },
      { name: 'Dhruv Jurel', team: 'RR', role: 'BAT', price: 14, manager: 'Arhan' },
      { name: 'Axar Patel', team: 'DC', role: 'AR', price: 16.5, manager: 'Arhan' },
      { name: 'Ravi Bishnoi', team: 'RR', role: 'BOWL', price: 7.2, manager: 'Arhan' },
      { name: 'MS Dhoni', team: 'CSK', role: 'BAT', price: 4, manager: 'Arhan' },
      { name: 'Rishabh Pant', team: 'LSG', role: 'BAT', price: 27, manager: 'Arhan' },
      { name: 'Heinrich Klaasen', team: 'SRH', role: 'BAT', price: 23, manager: 'Arhan' },
    ],
  },
  {
    id: 'vansh',
    name: 'Vansh',
    teamName: "Vansh's XI",
    players: [
      { name: 'Mohammed Shami', team: 'LSG', role: 'BOWL', price: 10, manager: 'Vansh' },
      { name: 'Akash Deep', team: 'KKR', role: 'BOWL', price: 1, manager: 'Vansh' },
      { name: 'Akshat Raghuvanshi', team: 'LSG', role: 'BAT', price: 2.2, manager: 'Vansh' },
      { name: 'Priyansh Arya', team: 'PBKS', role: 'BAT', price: 3.8, manager: 'Vansh' },
      { name: 'Abishek Porel', team: 'DC', role: 'BAT', price: 4, manager: 'Vansh' },
      { name: 'Phil Salt', team: 'RCB', role: 'BAT', price: 11.5, manager: 'Vansh' },
      { name: 'Ravindra Jadeja', team: 'RR', role: 'AR', price: 14, manager: 'Vansh' },
      { name: 'Shahbaz Ahmed', team: 'LSG', role: 'AR', price: 2.4, manager: 'Vansh' },
      { name: 'Noor Ahmad', team: 'CSK', role: 'BOWL', price: 10, manager: 'Vansh' },
      { name: 'Rahul Tewatia', team: 'GT', role: 'AR', price: 4, manager: 'Vansh' },
      { name: 'Rashid Khan', team: 'GT', role: 'BOWL', price: 18, manager: 'Vansh' },
      { name: 'Mohsin Khan', team: 'LSG', role: 'BOWL', price: 4, manager: 'Vansh' },
      { name: 'David Miller', team: 'DC', role: 'BAT', price: 2, manager: 'Vansh' },
      { name: 'Travis Head', team: 'SRH', role: 'BAT', price: 14, manager: 'Vansh' },
      { name: 'Mitchell Owen', team: 'PBKS', role: 'AR', price: 3, manager: 'Vansh' },
    ],
  },
  {
    id: 'roshan',
    name: 'Roshan',
    teamName: "Roshan's XI",
    players: [
      { name: 'Virat Kohli', team: 'RCB', role: 'BAT', price: 21, manager: 'Roshan' },
      { name: 'Hardik Pandya', team: 'MI', role: 'AR', price: 16.35, manager: 'Roshan' },
      { name: 'Matthew Short', team: 'CSK', role: 'AR', price: 1.5, manager: 'Roshan' },
      { name: 'Abdul Samad', team: 'LSG', role: 'AR', price: 4.2, manager: 'Roshan' },
      { name: 'Azmatullah Omarzai', team: 'PBKS', role: 'AR', price: 2.4, manager: 'Roshan' },
      { name: 'Ryan Rickelton', team: 'MI', role: 'BAT', price: 1, manager: 'Roshan' },
      { name: 'Sai Kishore', team: 'GT', role: 'AR', price: 2, manager: 'Roshan' },
      { name: 'Shardul Thakur', team: 'MI', role: 'AR', price: 2, manager: 'Roshan' },
      { name: 'Deepak Chahar', team: 'MI', role: 'BOWL', price: 9.25, manager: 'Roshan' },
      { name: 'Khaleel Ahmed', team: 'CSK', role: 'BOWL', price: 4.8, manager: 'Roshan' },
      { name: 'Dewald Brevis', team: 'CSK', role: 'BAT', price: 2.2, manager: 'Roshan' },
      { name: 'Zeeshan Ansari', team: 'SRH', role: 'BOWL', price: 0.4, manager: 'Roshan' },
      { name: 'KL Rahul', team: 'DC', role: 'BAT', price: 14, manager: 'Roshan' },
      { name: 'Harpreet Brar', team: 'PBKS', role: 'AR', price: 1.5, manager: 'Roshan' },
      { name: 'Rinku Singh', team: 'KKR', role: 'BAT', price: 13, manager: 'Roshan' },
    ],
  },
  {
    id: 'shaurya',
    name: 'Shaurya',
    teamName: "Shaurya's XI",
    players: [
      { name: 'Abhishek Sharma', team: 'SRH', role: 'AR', price: 14, manager: 'Shaurya' },
      { name: 'Mayank Markande', team: 'MI', role: 'BOWL', price: 0.3, manager: 'Shaurya' },
      { name: 'Suryakumar Yadav', team: 'MI', role: 'BAT', price: 40, manager: 'Shaurya' },
      { name: 'Nehal Wadhera', team: 'PBKS', role: 'BAT', price: 4.2, manager: 'Shaurya' },
      { name: 'Finn Allen', team: 'KKR', role: 'BAT', price: 2, manager: 'Shaurya' },
      { name: 'Umran Malik', team: 'KKR', role: 'BOWL', price: 0.75, manager: 'Shaurya' },
      { name: 'Suyash Sharma', team: 'RCB', role: 'BOWL', price: 2.6, manager: 'Shaurya' },
      { name: 'Marcus Stoinis', team: 'PBKS', role: 'AR', price: 11, manager: 'Shaurya' },
      { name: 'Nitish Rana', team: 'DC', role: 'AR', price: 4.2, manager: 'Shaurya' },
      { name: 'T Natarajan', team: 'DC', role: 'BOWL', price: 10.75, manager: 'Shaurya' },
      { name: 'Mitchell Marsh', team: 'LSG', role: 'AR', price: 3.4, manager: 'Shaurya' },
      { name: 'Jacob Bethell', team: 'RCB', role: 'AR', price: 2.6, manager: 'Shaurya' },
      { name: 'M Shahrukh Khan', team: 'GT', role: 'AR', price: 4, manager: 'Shaurya' },
      { name: 'Glenn Phillips', team: 'GT', role: 'BAT', price: 2, manager: 'Shaurya' },
      { name: 'Jamie Overton', team: 'CSK', role: 'AR', price: 1.5, manager: 'Shaurya' },
    ],
  },
  {
    id: 'vibhu',
    name: 'Vibhu',
    teamName: "Vibhu's XI",
    players: [
      { name: 'Varun Chakravarthy', team: 'KKR', role: 'BOWL', price: 12, manager: 'Vibhu' },
      { name: 'Jitesh Sharma', team: 'RCB', role: 'BAT', price: 11, manager: 'Vibhu' },
      { name: 'Mangesh Yadav', team: 'RCB', role: 'AR', price: 5.2, manager: 'Vibhu' },
      { name: 'Ishan Kishan', team: 'SRH', role: 'BAT', price: 11.25, manager: 'Vibhu' },
      { name: 'Sameer Rizvi', team: 'DC', role: 'AR', price: 0.95, manager: 'Vibhu' },
      { name: 'Cameron Green', team: 'KKR', role: 'BAT', price: 25.2, manager: 'Vibhu' },
      { name: 'Sarfaraz Khan', team: 'CSK', role: 'BAT', price: 0.75, manager: 'Vibhu' },
      { name: 'Nicholas Pooran', team: 'LSG', role: 'BAT', price: 21, manager: 'Vibhu' },
      { name: 'Kagiso Rabada', team: 'GT', role: 'BOWL', price: 10.75, manager: 'Vibhu' },
      { name: 'Kuldeep Yadav', team: 'DC', role: 'BOWL', price: 13.25, manager: 'Vibhu' },
      { name: 'Bhuvneshwar Kumar', team: 'RCB', role: 'BOWL', price: 10.75, manager: 'Vibhu' },
      { name: 'Prashant Veer', team: 'CSK', role: 'AR', price: 14.2, manager: 'Vibhu' },
      { name: 'Harsh Dubey', team: 'SRH', role: 'AR', price: 0.3, manager: 'Vibhu' },
      { name: 'Quinton de Kock', team: 'MI', role: 'BAT', price: 2, manager: 'Vibhu' },
    ],
  },
  {
    id: 'aryan',
    name: 'Aryan',
    teamName: "Aryan's XI",
    players: [
      { name: 'Avesh Khan', team: 'LSG', role: 'BOWL', price: 9.75, manager: 'Aryan' },
      { name: 'Kartik Sharma', team: 'CSK', role: 'BAT', price: 14.2, manager: 'Aryan' },
      { name: 'Karun Nair', team: 'DC', role: 'BAT', price: 0.5, manager: 'Aryan' },
      { name: 'Rajat Patidar', team: 'RCB', role: 'BAT', price: 11, manager: 'Aryan' },
      { name: 'Sanju Samson', team: 'CSK', role: 'BAT', price: 18, manager: 'Aryan' },
      { name: 'Mukesh Kumar', team: 'DC', role: 'BOWL', price: 8, manager: 'Aryan' },
      { name: 'Ashutosh Sharma', team: 'DC', role: 'AR', price: 3.8, manager: 'Aryan' },
      { name: 'Shivam Dube', team: 'CSK', role: 'AR', price: 12, manager: 'Aryan' },
      { name: 'Kyle Jamieson', team: 'DC', role: 'BOWL', price: 2, manager: 'Aryan' },
      { name: 'Sunil Narine', team: 'KKR', role: 'BOWL', price: 12, manager: 'Aryan' },
      { name: 'Nandre Burger', team: 'RR', role: 'BOWL', price: 3.5, manager: 'Aryan' },
      { name: 'Mitchell Starc', team: 'DC', role: 'BOWL', price: 11.75, manager: 'Aryan' },
      { name: 'Ruturaj Gaikwad', team: 'CSK', role: 'BAT', price: 18, manager: 'Aryan' },
      { name: 'Prabhsimran Singh', team: 'PBKS', role: 'BAT', price: 4, manager: 'Aryan' },
      { name: 'Sandeep Sharma', team: 'RR', role: 'BOWL', price: 4, manager: 'Aryan' },
    ],
  },
];

export const IPL_TEAM_COLORS: Record<string, { bg: string; text: string; accent: string }> = {
  MI:   { bg: '#003366', text: '#FFFFFF', accent: '#0080FF' },
  CSK:  { bg: '#FDB913', text: '#1A1A1A', accent: '#0081C8' },
  RCB:  { bg: '#C8102E', text: '#FFFFFF', accent: '#FFD700' },
  KKR:  { bg: '#3A225D', text: '#FFFFFF', accent: '#B3A123' },
  DC:   { bg: '#0078BC', text: '#FFFFFF', accent: '#EF1C25' },
  SRH:  { bg: '#F26522', text: '#FFFFFF', accent: '#1A1A1A' },
  RR:   { bg: '#EA1A85', text: '#FFFFFF', accent: '#1B4D8E' },
  PBKS: { bg: '#ED1B24', text: '#FFFFFF', accent: '#A7A9AC' },
  GT:   { bg: '#1C4B9B', text: '#FFFFFF', accent: '#C8A951' },
  LSG:  { bg: '#A4C639', text: '#1A1A1A', accent: '#000000' },
};

export const ROLE_LABELS: Record<Role, string> = {
  BAT: 'Batsman',
  BOWL: 'Bowler',
  AR: 'All-Rounder',
  WK: 'Wicketkeeper',
};
