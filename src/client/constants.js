export const SEC_TO_MSEC = 1000;
export const DEV_URL_BASE = 'http://localhost:8000';
export const DEV_SOCKET_BASE = 'http://0.0.0.0:8000';
export const PROD_URL_BASE = 'http://ec2-54-215-137-120.us-west-1.compute.amazonaws.com';
export const PROD_SOCKET_BASE = 'http://ec2-54-215-137-120.us-west-1.compute.amazonaws.com:80';
export const LEADERBOARDS_ENDPOINT = 'api/leaderboards';
export const EXERCISES_ENDPOINT = 'api/exercises';
export const HOUSES = ['Stark', 'Lannister', 'Targaryen', 'Baratheon', 'Greyjoy'];
const GITHUB = {BASE_URL: 'https://github.com', ICON: 'fa-github', SITE: 'github'};
const LINKEDIN = {BASE_URL: 'https://linkedin.com/in', ICON: 'fa-linkedin', SITE: 'linkedin'};
export const TEAMS = [
    {
        house: 'Stark',
        person: 'Rahat Dhande',
        role: 'Platform',
        links: [
            {url: `${GITHUB.BASE_URL}/rahatchd`, site: GITHUB.SITE, icon: GITHUB.ICON},
            {url: `${LINKEDIN.BASE_URL}/rahat-dhande-297122105`, site: LINKEDIN.SITE, icon: LINKEDIN.ICON}
        ],
        banner: 'https://vignette.wikia.nocookie.net/gameofthrones/images/8/8a/House-Stark-Main-Shield.PNG/revision/latest?cb=20170101103142',
        words: 'Workouts are Coming',
        desc: 'House Stark believes that the one who picks the workout should do the first set.',
        avatar: 'https://media.licdn.com/dms/image/C4E03AQGduuKt6ntQMg/profile-displayphoto-shrink_200_200/0?e=1527717600&v=alpha&t=9Fx-haQxfTlBgd3XJB71JBNoB5m1mLopIGcB87ratyQ'
    },
    {
        house: 'Lannister',
        person: 'Jonah Killam',
        role: 'Sensor',
        links: [
            {url: `${GITHUB.BASE_URL}/jkillam`, site: GITHUB.SITE, icon: GITHUB.ICON},
            {url: `${LINKEDIN.BASE_URL}/jonah-killam-79783ba8`, site: LINKEDIN.SITE, icon: LINKEDIN.ICON}
        ],
        banner: 'https://vignette.wikia.nocookie.net/gameofthrones/images/8/8a/House-Lannister-Main-Shield.PNG/revision/latest?cb=20170101095357',
        words: 'Watch Me Squat!',
        desc: 'A rich and proud House, House Lannister believes in having people watch them, not spot them.',
        avatar: 'https://media.licdn.com/dms/image/C4E03AQHTcZ5FE5wk0Q/profile-displayphoto-shrink_800_800/0?e=1527717600&v=alpha&t=r7i20V9xzK_4cItfq3h7iU-oxXaDCwXatARJ1yMJggU'
    },
    {
        house: 'Targaryen',
        person: 'Andrew Dworschak',
        role: 'Platform',
        links: [
            {url: `${GITHUB.BASE_URL}/andrewDworschak`, site: GITHUB.SITE, icon: GITHUB.ICON},
            {url: `${LINKEDIN.BASE_URL}/andrew-dworschak`, site: LINKEDIN.SITE, icon: LINKEDIN.ICON}
        ],
        banner: 'https://vignette.wikia.nocookie.net/gameofthrones/images/4/43/House-Targaryen-Main-Shield.PNG/revision/latest?cb=20170510235320',
        words: 'Fire and Curls',
        desc: 'Immune to fire and muscle fatigue, this House boasts a long line of curlers.',
        avatar: 'https://media.licdn.com/dms/image/C5603AQH8uqxi6QTB9Q/profile-displayphoto-shrink_800_800/0?e=1527717600&v=alpha&t=e3a8ByQF_Ti5OpAUjr3QPCCiBzW184_mrBmLxliV_lg'
    },
    {
        house: 'Baratheon',
        person: 'Jacob Budzis',
        role: 'Platform',
        links: [
            {url: `${GITHUB.BASE_URL}/Jacobinski`, site: GITHUB.SITE, icon: GITHUB.ICON},
            {url: `${LINKEDIN.BASE_URL}/jacob-budzis`, site: LINKEDIN.SITE, icon: LINKEDIN.ICON}
        ],
        banner: 'https://vignette.wikia.nocookie.net/gameofthrones/images/0/00/House-Baratheon-Main-Shield.PNG/revision/latest?cb=20170519002924',
        words: 'Ours Is the Dropset',
        desc: 'House Baratheon attributes its strength to the Lord of Light and dropsets.',
        avatar: 'https://media.licdn.com/dms/image/C5603AQEzvF0xi1vOsA/profile-displayphoto-shrink_800_800/0?e=1527717600&v=alpha&t=JxbOOIBEDCEod5_n-IshIBClmE5whmkX024shhgyiO4'
    },
    {
        house: 'Greyjoy',
        person: 'Ryan Cotsakis',
        role: 'Sensors',
        links: [
            {url: `${GITHUB.BASE_URL}/RyanCotsakis`, site: GITHUB.SITE, icon: GITHUB.ICON},
        ],
        banner: 'https://vignette.wikia.nocookie.net/gameofthrones/images/8/86/House-Greyjoy-Main-Shield.PNG/revision/latest?cb=20170523015836',
        words: 'We Do Not Row',
        desc: 'House Greyjoy does row.',
        avatar: 'https://scontent-sea1-1.xx.fbcdn.net/v/t31.0-8/21273639_10155615230934898_1564199196888037762_o.jpg?_nc_cat=0&oh=8666995e26ede69327f53f0a06a1bb33&oe=5B68AA96'
    },
    {
        house: 'Tyrell',
        person: 'Justin Kang',
        role: 'Sensors',
        links: [
            {url: `${GITHUB.BASE_URL}/rahatchd`, site: GITHUB.SITE, icon: GITHUB.ICON},
            {url: `${LINKEDIN.BASE_URL}/justin-kang-031b9014b`, site: LINKEDIN.SITE, icon: LINKEDIN.ICON}
        ],
        banner: 'https://vignette.wikia.nocookie.net/gameofthrones/images/c/cf/House-Tyrell-Main-Shield.PNG/revision/latest?cb=20170108163035',
        words: 'Growing Strong',
        desc: 'Lol',
        avatar: 'https://scontent-sea1-1.xx.fbcdn.net/v/t31.0-8/21688369_769883073206225_77114959757984018_o.jpg?_nc_cat=0&oh=001c737486610a51c62b9c64470085d8&oe=5B6C9A4D'
    }
];
