const Profile = require('./src/api/models/profileModel');
const User = require('./src/api/models/userModel');
const { locationModel, housePhotoModel, amenityModel, houseModel } = require('./src/api/models/housesModel');
const Review = require('./src/api/models/reviewModel');

const { connect } = require('mongoose');
require('dotenv').config();

const connectDb = async () => {
  try {
    await connect(process.env.MONGODB_URI);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`db connection failure: ${error}`);
  }
};

async function main() {
  const profile1 = await Profile.create({
    "bio": "This is my bio. i am profile1 for user 1",
    "country": "Ethiopia",
    "state": "Addis Abeba",
    "houseAddress": "house-address-1",
    "profileImage": ""
  });
  const profile2 = await Profile.create({
    "bio": "This is my bio. i am profile2 for user 2",
    "country": "Ethiopia",
    "state": "Addis Abeba",
    "houseAddress": "house-address-2",
    "profileImage": ""
  });
  const profile3 = await Profile.create({
    "bio": "This is my bio. i am profile3 for user 3",
    "country": "Ethiopia",
    "state": "Addis Abeba",
    "houseAddress": "house-address-3",
    "profileImage": ""
  });
  const profile4 = await Profile.create({
    "bio": "This is my bio. i am profile4 for user 4",
    "country": "Ethiopia",
    "state": "Addis Abeba",
    "houseAddress": "house-address-4",
    "profileImage": ""
  });
  const profile5 = await Profile.create({
    "bio": "This is my bio. i am profile5 for user 5",
    "country": "Ethiopia",
    "state": "Addis Abeba",
    "houseAddress": "house-address-5",
    "profileImage": ""
  });
  const profile6 = await Profile.create({
    "bio": "This is my bio. i am profile6 for user 6",
    "country": "Ethiopia",
    "state": "Addis Abeba",
    "houseAddress": "house-address-6",
    "profileImage": ""
  });


  const user1 = await User.create({
    "firstName": "aaaa",
    "lastName": "bbbb",
    "email": "ab@email1.com",
    "phoneNumber": "1234567890",
    "password": "test1234",
    "profile": profile1
  });
  const user2 = await User.create({
    "firstName": "cccc",
    "lastName": "dddd",
    "email": "ab@email2.com",
    "phoneNumber": "1234567890",
    "password": "test1234",
    "profile": profile2
  });
  const user3 = await User.create({
    "firstName": "eeee",
    "lastName": "ffff",
    "email": "ab@email3.com",
    "phoneNumber": "1234567890",
    "password": "test1234",
    "profile": profile3
  });
  const user4 = await User.create({
    "firstName": "gggg",
    "lastName": "hhhh",
    "email": "ab@email4.com",
    "phoneNumber": "1234567890",
    "password": "test1234",
    "profile": profile4
  });
  const user5 = await User.create({
    "firstName": "iiii",
    "lastName": "jjjj",
    "email": "ab@email5.com",
    "phoneNumber": "1234567890",
    "password": "test1234",
    "profile": profile5
  });
  const user6 = await User.create({
    "firstName": "kkkk",
    "lastName": "llll",
    "email": "ab@email6.com",
    "phoneNumber": "1234567890",
    "password": "test1234",
    "profile": profile6
  });
  const user_coordinates = { "latitude": 9.005401, "longitude": 38.763611 };
  // 9.005401, 38.763611 // 0m
  // 9.004901, 38.763397 // 60m
  // 9.006131, 38.764229 // 105m
  // 9.007665, 38.764056 // 256m
  // 9.002153, 38.764813 // 384m
  // 9.008912, 38.761920 // 432m
  // 9.009661, 38.760110 // 610m
  // 9.005362, 38.758299 // 583m
  // 9.009397, 38.774236 // 1248m
  // 9.006252, 38.750483 // 1444m
  // 9.017672, 38.772688 // 1689m

  const amenity1 = await amenityModel.create({ "name": "Wi-Fi" })
  const amenity2 = await amenityModel.create({ "name": "Water tanker" })
  const amenity3 = await amenityModel.create({ "name": "Ventlator" })
  const amenity4 = await amenityModel.create({ "name": "House heator" })
  const amenity5 = await amenityModel.create({ "name": "Wired cellphone" })
  const amenity6 = await amenityModel.create({ "name": "Steam bath" })

  const location1 = await locationModel.create({
    "country": "Ethiopia", "city": "Addis Abeba",
    "latitude": 9.004901, "longitude": 38.763397
  });
  const location2 = await locationModel.create({
    "country": "Ethiopia", "city": "Addis Abeba",
    "latitude": 9.017672, "longitude": 38.772688
  });
  const location3 = await locationModel.create({
    "country": "Ethiopia", "city": "Addis Abeba",
    "latitude": 9.009397, "longitude": 38.774236
  })
  const location4 = await locationModel.create({
    "country": "Ethiopia", "city": "Addis Abeba",
    "latitude": 9.008912, "longitude": 38.761920
  })
  const location5 = await locationModel.create({
    "country": "Ethiopia", "city": "Addis Abeba",
    "latitude": 9.006131, "longitude": 38.764229
  })
  const location6 = await locationModel.create({
    "country": "Ethiopia", "city": "Addis Abeba",
    "latitude": 9.009661, "longitude": 38.760110
  })
  const location7 = await locationModel.create({
    "country": "Ethiopia", "city": "Addis Abeba",
    "latitude": 9.005362, "longitude": 38.758299
  })
  const location8 = await locationModel.create({
    "country": "Ethiopia", "city": "Addis Abeba",
    "latitude": 9.002153, "longitude": 38.764813
  })
  const location9 = await locationModel.create({
    "country": "Ethiopia", "city": "Addis Abeba",
    "latitude": 9.006252, "longitude": 38.750483
  })
  const location10 = await locationModel.create({
    "country": "Ethiopia", "city": "Addis Abeba",
    "latitude": 9.007665, "longitude": 38.764056
  })

  // owners of the houses - 1,2,2,2,5,2,3,2,3,5
  const house1 = await houseModel.create({
    "user": user1,
    "name": "House1",
    "description": "This is Just a description for House1",
    "numberOfRooms": 2,
    "maxGuest": 3,
    "pricePerNight": 71,
    "location": location1,
    "amenities": [amenity3, amenity4, amenity5],
    "sharedBetween": 1,
    "housePhotoModels": await housePhotoModel.create({ filename: ["random"] })
  });

  const house2 = await houseModel.create({
    "user": user2,
    "name": "House2",
    "description": "This is Just a description for House2",
    "numberOfRooms": 3,
    "maxGuest": 4,
    "pricePerNight": 78,
    "location": location2,
    "amenities": [amenity1, amenity4, amenity5],
    "sharedBetween": 1,
    "housePhotoModels": await housePhotoModel.create({ filename: ["random"] }),
    "reservedBy": user4
  });

  const house3 = await houseModel.create({
    "user": user2,
    "name": "House3",
    "description": "This is Just a description for House3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "numberOfRooms": 1,
    "maxGuest": 5,
    "pricePerNight": 60,
    "location": location3,
    "amenities": [amenity5],
    "sharedBetween": 1,
    "housePhotoModels": await housePhotoModel.create({ filename: ["random"] }),
    "reservedBy": user6
  });

  const house4 = await houseModel.create({
    "user": user2,
    "name": "House4",
    "description": "This is Just a description for House4",
    "numberOfRooms": 7,
    "maxGuest": 8,
    "pricePerNight": 99,
    "location": location4,
    "amenities": [amenity1, amenity2, amenity3],
    "sharedBetween": 1,
    "housePhotoModels": await housePhotoModel.create({ filename: ["random"] })
  });

  const house5 = await houseModel.create({
    "user": user5,
    "name": "House5",
    "description": "This is Just a description for House5",
    "numberOfRooms": 2,
    "maxGuest": 1,
    "pricePerNight": 21,
    "location": location5,
    "amenities": [],
    "sharedBetween": 1,
    "housePhotoModels": await housePhotoModel.create({ filename: ["random"] })
  });

  const house6 = await houseModel.create({
    "user": user2,
    "name": "House6",
    "description": "This is Just a description for House6.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    "numberOfRooms": 4,
    "maxGuest": 4,
    "pricePerNight": 59,
    "location": location6,
    "amenities": [amenity1, amenity2, amenity4, amenity5],
    "sharedBetween": 1,
    "housePhotoModels": await housePhotoModel.create({ filename: ["random"] })
  });

  const house7 = await houseModel.create({
    "user": user3,
    "name": "House7",
    "description": "This is Just a description for House7",
    "numberOfRooms": 1,
    "maxGuest": 2,
    "pricePerNight": 52,
    "location": location7,
    "amenities": [amenity3],
    "sharedBetween": 1,
    "housePhotoModels": await housePhotoModel.create({ filename: ["random"] }),
    "reservedBy": user6
  });

  const house8 = await houseModel.create({
    "user": user2,
    "name": "House8",
    "description": "This is Just a description for House8",
    "numberOfRooms": 4,
    "maxGuest": 6,
    "pricePerNight": 45,
    "location": location8,
    "amenities": [],
    "sharedBetween": 1,
    "housePhotoModels": await housePhotoModel.create({ filename: ["random"] })
  });

  const house9 = await houseModel.create({
    "user": user3,
    "name": "House9",
    "description": "This is Just a description for House9",
    "numberOfRooms": 6,
    "maxGuest": 11,
    "pricePerNight": 90,
    "location": location9,
    "amenities": [amenity1, amenity2, amenity5],
    "sharedBetween": 1,
    "housePhotoModels": await housePhotoModel.create({ filename: ["random"] })
  });

  const house10 = await houseModel.create({
    "user": user5,
    "name": "House10",
    "description": "This is Just a description for House10Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "numberOfRooms": 10,
    "maxGuest": 12,
    "pricePerNight": 100,
    "location": location10,
    "amenities": [amenity1, amenity2, amenity3, amenity4, amenity5, amenity6],
    "sharedBetween": 1,
    "housePhotoModels": await housePhotoModel.create({ filename: ["random"] })
  });

  // review-type, house-number, (number-of-reviews), reviewers (1(6),3(3),4(4),5(7),6(1))
  // no Review 8, 3 (0, 0)
  // multiple reviews: 2, 5, 7, (4, 3, 5)
  // few reviews: 1, 6 (2, 2)
  // 1 review :4, 10, 9 (1, 1, 2)
  // 2,2,2,2,5,5,5,7,7,7,7,7,1,1,6,6,4,10,9, 9
  // 1,3,4,5,1,3,6,1,3,4,4,6,4,5,1,5,5, 1,5, 6
  const review1 = await Review.create({
    user: user1,
    house: house2,
    text: "I have lived in side this house and it was very comfortable. The neigbour hood have security guards and that made me feell safe."
  });

  const review2 = await Review.create({
    user: user3,
    house: house2,
    text: "I have lived in side this house and it was very comfortable. The neigbour hood have security guards and that made me feell safe."
  });

  const review3 = await Review.create({
    user: user4,
    house: house2,
    text: "I have lived in side this house and it was very comfortable. The neigbour hood have security guards and that made me feell safe."
  });

  const review4 = await Review.create({
    user: user5,
    house: house2,
    text: "I have lived in side this house and it was very comfortable. The neigbour hood have security guards and that made me feell safe. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus aut magni commodi accusantium debitis corrupti odit laudantium fuga dolorum ea, a expedita excepturi voluptatibus dicta, quasi, repellat ullam tenetur. Ad?"
  });

  const review5 = await Review.create({
    user: user1,
    house: house5,
    text: "The locks are broken"
  });

  const review6 = await Review.create({
    user: user3,
    house: house5,
    text: "I have lived in side this house and it was very comfortable. The neigbour hood have security guards and that made me feell safe."
  });

  const review7 = await Review.create({
    user: user6,
    house: house5,
    text: "How is a human being supposed to live here"
  });

  const review8 = await Review.create({
    user: user1,
    house: house7,
    text: "I have lived in side this house and it was very comfortable. The neigbour hood have security guards and that made me feell safe."
  });

  const review9 = await Review.create({
    user: user3,
    house: house7,
    text: "I have lived in side this house and it was very comfortable. The neigbour hood have security guards and that made me feell safe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus aut magni commodi accusantium debitis corrupti odit laudantium fuga dolorum ea, a expedita excepturi voluptatibus dicta, quasi, repellat ullam tenetur. Ad?"
  });

  const review10 = await Review.create({
    user: user4,
    house: house7,
    text: "Wooooow"
  });

  const review11 = await Review.create({
    user: user5,
    house: house7,
    text: "I have lived in side this house and it was very comfortable. The neigbour hood have security guards and that made me feell safe."
  });

  const review12 = await Review.create({
    user: user6,
    house: house7,
    text: "I have lived in side this house and it was very comfortable. The neigbour hood have security guards and that made me feell safe."
  });

  const review13 = await Review.create({
    user: user4,
    house: house1,
    text: "I have lived in side this house and it was very comfortable. The neigbour hood have security guards and that made me feell safe."
  });

  const review14 = await Review.create({
    user: user5,
    house: house1,
    text: "This is scam, it's price is very expensive."
  });

  const review15 = await Review.create({
    user: user1,
    house: house6,
    text: "very good neighbourhood"
  });

  const review16 = await Review.create({
    user: user4,
    house: house6,
    text: "The worst house i have ever seen"
  });

  const review17 = await Review.create({
    user: user5,
    house: house4,
    text: "I have lived in side this house and it was very comfortable. The neigbour hood have security guards and that made me feell safe. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus aut magni commodi accusantium debitis corrupti odit laudantium fuga dolorum ea, a expedita excepturi voluptatibus dicta, quasi, repellat ullam tenetur. Ad?"
  });

  const review18 = await Review.create({
    user: user1,
    house: house10,
    text: "I have lived in side this house and it was very comfortable. The neigbour hood have security guards and that made me feell safe Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus aut magni commodi accusantium debitis corrupti odit laudantium fuga dolorum ea, a expedita excepturi voluptatibus dicta, quasi, repellat ullam tenetur. Ad?."
  });

  const review19 = await Review.create({
    user: user5,
    house: house9,
    text: "I have lived in side this house and it was very comfortable. The neigbour hood have security guards and that made me feell safe."
  });

  const review20 = await Review.create({
    user: user6,
    house: house9,
    text: "It is a dream home"
  });


  // eslint-disable-next-line no-console
  console.log("done");
  process.exit();
}

connectDb().then(
  // eslint-disable-next-line no-console
  console.log("connected"),
  main()
);
