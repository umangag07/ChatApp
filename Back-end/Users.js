const users = [];

const addUser = ({ id, name, room }) => {
  //working on name
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );
  if (existingUser) {
    return { error: "User exist with the same name" };
  }
  const user = { id, name, room };
  users.push(user);
  console.log({ "Usrs array": users });
  return { user };
};
const removeUser = ({ id }) => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    return users.splice(index, 1)[0];
  }
};
const getUser = (id) => users.find((user) => user.id === id);

const getUserInRoom = (room) => {
  return users.filter((user) => user.room === room);
};

module.exports = { addUser, removeUser, getUser, getUserInRoom };
