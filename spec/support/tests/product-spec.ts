import { Product } from "../../../src/models/product";

const product = new Product();

describe("Product Model", () => {
  it("should have an index method", () => {
    expect(product.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(product.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(product.create).toBeDefined();
  });
});

describe("[Product manipulation]", () => {
  const sampleProduct = {
    product_id: 1,
    name: "Test Product 1",
    price: 200,
    category: "test category 1",
  };

  it("create method should add a product", async () => {
    const result = await product.create(sampleProduct);

    expect(result).toEqual(sampleProduct);
  });

  it("index method should return a list of products", async () => {
    const result = await product.index();
    expect(result).toEqual([sampleProduct]);
  });

  it("show method should return the correct product", async () => {
    const result = await product.show("1");
    expect(result).toEqual(sampleProduct);
  });
});
