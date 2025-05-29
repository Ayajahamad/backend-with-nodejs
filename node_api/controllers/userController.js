let users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Poorvika KS", email: "poorvi@example.com" }
];

exports.getAllUsers = (req, res) => {
    res.status(200).json(users);
};

exports.createUser = (req, res) => {
    const { name, email } = req.body;
    const newUser = {
        id: users.length + 1,
        name,
        email
    };
    users.push(newUser);
    res.status(201).json(newUser);
};

exports.getUserById = (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
};

exports.updateUser = (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, email } = req.body;
    user.name = name;
    user.email = email;

    res.status(200).json(user);
};

exports.deleteUser = (req, res) => {
    users = users.filter(u => u.id !== parseInt(req.params.id));
    res.status(204).send(); // No content
};
