db.createCollection('companies', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name'],
      properties: {
        name: {
          bsonType: 'string',
          minLength: 1
        },
        yearOfCreation: {
          bsonType: 'int',
          minimum: 1000
        },
        address: {
          bsonType: 'object',
          required: ['country'],
          properties: {
            country: {
              bsonType: 'string'
            },
            city: {
              bsonType: 'string'
            },
            phoneNumber: {
              bsonType: 'string'
            }
          }
        }
      }
    }
  }
});

db.companies.insertMany([
  {
    name: 'Company 1',
    yearOfCreation: 2005
  },
  {
    name: 'Company 2',
    yearOfCreation: 1818
  },
  {
    name: 'Company 3',
    address: {
      country: 'UK',
      city: 'London'
    }
  },
  {
    name: 'Company 4'
  },
]);

db.createCollection('workers', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'companyId'],
      properties: {
        name: {
          bsonType: 'string'
        },
        department: {
          bsonType: 'string'
        },
        salary: {
          bsonType: 'number'
        },
        companyId: {
          bsonType: 'objectId'
        }
      }
    }
  }
});

//

db.workers.insertMany([
  {
    name: 'Worker 1',
    companyId: new ObjectId('64f08f1c8190d1a45b64de28')
  },
  {
    name: 'Worker 2',
    companyId: new ObjectId('64f08f1c8190d1a45b64de28')
  },
  {
    name: 'Worker 3',
    companyId: new ObjectId('64f08f1c8190d1a45b64de29')
  },
  {
    name: 'Worker 4',
    companyId: new ObjectId('64f08f1c8190d1a45b64de2a')
  },
  {
    name: 'Worker 5',
    companyId: new ObjectId('64f08f1c8190d1a45b64de2a')
  },
  {
    name: 'Worker 6',
    companyId: new ObjectId('64f08f1c8190d1a45b64de2a')
  },
  {
    name: 'Worker 7',
    companyId: new ObjectId('64f08f1c8190d1a45b64de2b')
  },
]);

// все данные о работниках и о их компаниях
db.workers.aggregate([
  // 1 этап - LEFT JOIN 
  {
    $lookup: {
      from: 'companies', // название коллекции, которую мы джойним
      localField: "companyId", // поле по которому связываемся из исходной таблицы
      foreignField: "_id", // поле по которому связываемся из подключаемой таблицы
      as: 'company' // названия поля массива, в который вставятся подключаемые записи
    }
  },
  // 2 этап - убираем ненужный массив
  {
    $unwind: '$company'
  },
  // 3 этап - убрать поле companyId
  {
    $unset: 'companyId'
  }
]);