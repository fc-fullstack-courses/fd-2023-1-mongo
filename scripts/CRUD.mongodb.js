// коннекшн стринга
// mongodb://127.0.0.1:PORT/DB-NAME
// или
// mongodb+srv://LOGIN:PASSWORD@cluster0.ozlvdnp.mongodb.net/DB
db.users.insertOne({});

// ctrl + alt + s - запуск выделенных строчек
db.users.find();

// CREATE
// insertOne
db.users.insertOne({
  email: "test@test.test",
  password: "12345sakdnfdsokf",
  isMale: true,
  address : {
    countty: "UA",
    city: "ZP",
  },
  phoneNumbers: [
    '036547896',
    '06547876546',
    '1354897643433'
  ]
});

// insertMany
db.users.insertMany([
  {
    email: 'mail1@mail.com',
  },
  {
    email: 'mail2@mail.com',
  },
  {
    email: 'mail3@mail.com',
  },
  {
    email: 'mail4@mail.com',
  },
  {
    email: 'mail5@mail.com',
  },
]);