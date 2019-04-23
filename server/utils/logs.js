const mode = process.env.NODE_ENV;

exports.log = (...message) => {
   if(mode === 'production') {
      return;
   } else {
      return console.log(...message);
   }
}