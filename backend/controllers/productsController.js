const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
];

exports.getAllProducts = (req, res) => {
    res.json(products);
};

exports.createProduct = (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json(newProduct);
};

exports.getProductById = (req, res) => {
    const product = products.find((p) => p.id == req.theID);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
};
