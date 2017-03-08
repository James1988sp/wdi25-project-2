const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const Beach = require('../models/beach');
const User = require('../models/user');

Beach.collection.drop();
User.collection.drop();

User
  .create([{
    firstName: 'Gianmaria',
    lastName: 'Carrodano',
    username: 'James1988sp',
    email: 'gianmariacarrodano@libero.it',
    password: 'dsquared',
    passwordConfirmation: 'dsquared'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Beach
      .create([{
        name: 'Fraser Island',
        country: 'Australia',
        seabed: 'sandy',
        waves: 'normal',
        description: 'The waters around Fraser Island, in south-east Queensland, are off limits. Unless you afraid to swim among the sharks and jellyfish as you struggle against strong currents. If you try to protect the shore you can encounter in the deadliest spiders in the world, water crocodiles or sea dingo that occasionally attack humans.',
        image: 'http://www.fraserexplorertours.com.au/images/siteimages/lakes.jpg',
        createdBy: users[0]
      },{
        name: 'Gansbaai',
        country: 'South Africa',
        seabed: 'sandy',
        waves: 'normal',
        description: 'A few miles from the coast lies an area called Shark Alley, a small channel between Dyer Island and Geyser Rock, where the sharks are not afraid to do. For here lives a colony of around 60,000 fur seals attacking the men who approach.',
        image: 'https://xplorio.com/userdocs/user_38_docs/images/Coast%20between%20Gansbaai%20%26%20Hermanus.jpg',
        createdBy: users[0]
      },{
        name: 'Hanakapiai',
        country: 'Hawaii',
        seabed: 'sandy',
        waves: 'normal, prone to strong when the wind rises',
        description: 'At this point last year alone 83 people drowned. As is the case all along the coast of Kauai, strong currents and waves make swimming very dangerous activity.',
        image: 'http://static.panoramio.com/photos/large/38520950.jpg',
        createdBy: users[0]
      },{
        name: 'Praia de Boa Viegem',
        country: 'Brasil',
        seabed: 'rocky',
        waves: 'very strong',
        description: 'This very popular beach in Recife, attracts sunbathers throughout the year and was considered safe from sharks. But since 1992 there have been at least 50 attacks including 19 fatal. Environmentalists say that their presence is due to the destruction of the coastal area by fishing boats that grow closer to the beach.',
        image: 'http://loucosporpraia.com.br/wp-content/uploads/2014/10/Praia-de-Boa-Viagem-Recife-Pernambuco-por-ecopassaporte.jpg',
        createdBy: users[0]
      },{
        name: 'Northern Territory e Queensland',
        country: 'Autralia',
        seabed: 'rocky',
        waves: 'massive',
        description: 'Each year between October and April countless herds of box jellyfish force the barriers of hundreds of beaches on the north coast of the country. This is the most poisonous species in the world of jellyfish, responsible for at least 70 deaths since 1883. Its sting is so painful that some die of heart failure before even reaching the shore.',
        image: 'http://photos.harcourts.com.au/013/946/996-QAI6377-Peppers-Palm-Bay-Long-Island-Mackay-Region-North-Queensland-Queensland-Australia.jpg',
        createdBy: users[0]
      },{
        name: 'Volusia County',
        country: 'Florida',
        seabed: 'rocky',
        waves: 'huge',
        description: 'According to the International Shark Attack File (ISAF), a database that reports the number of shark attacks, there have been more along the coast of Volusia County in Florida and throughout South Africa: 235 in total since 1882. No one, however, it was fatal.',
        image: 'http://bloximages.chicago2.vip.townnews.com/lompocrecord.com/content/tncms/assets/v3/editorial/b/31/b31a799c-06f6-5f6e-8a8c-d5800bbe9f12/56c520431a152.image.jpg?resize=1200%2C662',
        createdBy: users[0]
      }]);
  })

  .then((beaches) => console.log(`${beaches.length} beaches created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
