const fs = require('fs');
const home = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');
const about = fs.readFileSync('src/pages/AboutPage.tsx', 'utf8');

const homeStart = home.indexOf('<section id="contact"');
const homeEnd = home.indexOf('</section>', homeStart) + 10;
const homeContact = home.substring(homeStart, homeEnd);

const aboutStart = about.indexOf('<section id="contact-cta"');
const aboutEnd = about.indexOf('</section>', aboutStart) + 10;
const aboutContact = about.substring(aboutStart, aboutEnd);

console.log('=== HOME CONTACT ===\n', homeContact);
console.log('\n=== ABOUT CONTACT ===\n', aboutContact);

