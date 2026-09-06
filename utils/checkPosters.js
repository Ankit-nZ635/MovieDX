import mongoose from 'mongoose';
import https from 'https';

mongoose.connect('mongodb+srv://ankit_ekka_db:dbAnkitekka@icine.36picpj.mongodb.net/iCinema?appName=iCine', {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(async () => {
  const titles = ['Avatar 3','Avengers: Doomsday','Mission: Impossible 8','Jurassic World Rebirth','Superman','Black Panther 3'];
  const movies = await mongoose.connection.db.collection('movies').find({ title: { $in: titles } }).toArray();
  
  for (const m of movies) {
    await new Promise((resolve) => {
      if (!m.image) { console.log(m.title, '| NO IMAGE URL'); resolve(); return; }
      https.get(m.image, (res) => {
        console.log(m.title, '| HTTP:', res.statusCode, '| isUpcoming:', m.isUpcoming);
        resolve();
      }).on('error', (e) => { console.log(m.title, '| ERROR:', e.message); resolve(); });
    });
  }
  mongoose.connection.close();
});
