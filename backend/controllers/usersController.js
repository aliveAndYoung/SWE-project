const users = [
    { id: 1, name: "User 1", email: "user1@example.com" },
    { id: 2, name: "User 2", email: "user2@example.com" },
];

exports.getAllUsers = (req, res) => {
    res.json(users);
};

exports.createUser = (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
};

exports.getUserById = (req, res) => {
    const user = users.find((u) => u.id == req.theID);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
};
