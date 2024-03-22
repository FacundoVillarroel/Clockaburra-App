import User from "../models/user";

const imagePath =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWvXbaMv4cP4DlP8BLXRwUPmrLY0Y5dOGE1g&usqp=CAU";

const UserExample = new User(
  Math.random().toString(),
  "Facundo",
  "",
  "Villarroel",
  "admin",
  "facu@gmail.com",
  "123456789",
  imagePath,
  "Fake 123"
);

export default UserExample;
