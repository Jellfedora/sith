
// const fs = require('fs');
// var path = require('path')

// var finder = require('findit')(process.argv[2] || '.');
// var cast = require('./cast');

// // Astuce process.env.HOME est le chemin depuis /home



// import './config/database';
const server = require('./config/server');

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`SITH running on port ${PORT}`);
});



