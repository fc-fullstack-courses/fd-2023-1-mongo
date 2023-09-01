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

// вернуть все компании и количество их сотрудников
db.companies.aggregate([
  {
    $lookup: {
      from: 'workers',
      localField: '_id',
      foreignField: 'companyId',
      as: 'workers'
    }
  },
  {
    $unwind: '$workers'
  },
  {
    $group: {
      _id: '$name',
      workersAmount: {
        $count: {}
      },
      // для монги меньше 5,0
      workersAmountOld: {
        $sum: 1
      }
    }
  }
]);

/*
  К таблице Компаний добавте таблицу товаров
  у товаров могут быть названия, цена, количество, компания-производитель

  С помощью аггрегаций получите следующие данные:
    - все компании и их товары
    - все компании и количество их товаров

*/

db.createCollection('products', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'companyId'],
      properties: {
        name: {
          bsonType: 'string'
        },
        price: {
          bsonType: 'number',
          minimum: 0
        },
        quantity: {
          bsonType: 'int',
          minimum: 0
        },
        companyId: {
          bsonType: 'objectId'
        }
      }
    }
  }
});

db.products.insertMany([
  {
    name: 'Product 1',
    price: 9999.99,
    quantity: 100,
    companyId: new ObjectId('64f08f1c8190d1a45b64de28')
  },
  {
    name: 'Product 2',
    price: 52.99,
    quantity: 7558,
    companyId: new ObjectId('64f08f1c8190d1a45b64de28')
  },
  {
    name: 'Product 3',
    price: 1727.99,
    quantity: 10,
    companyId: new ObjectId('64f08f1c8190d1a45b64de29')
  },
  {
    name: 'Product 4',
    price: 5725257.99,
    quantity: 414777,
    companyId: new ObjectId('64f08f1c8190d1a45b64de2a')
  },
]);

// - все компании и их товары
db.companies.aggregate([
  {
    $lookup: {
      from: 'products',
      localField: '_id',
      foreignField: 'companyId',
      as: 'products'
    }
  }
]);

// - все компании и количество их товаров
db.companies.aggregate([
  {
    $lookup: {
      from: 'products',
      localField: '_id',
      foreignField: 'companyId',
      as: 'products'
    }
  },
  {
    $unwind: '$products'
  },
  {
    $group: {
      _id: '$name',
      productsAmount: {
        $count: {}
      }
    }
  }
]);