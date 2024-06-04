import supertest from "supertest";

import { Order } from "../../../src/models/order";
import { Product } from "../../../src/models/product";
import { User } from "../../../src/models/user";
import { app } from "../../../src/server";

let route = supertest(app);
const user = new User();
const product = new Product();
const order = new Order();

describe("Suite", () => {
  const sampleUser = {
    user_id: "1",
    firstName: "admin",
    lastName: "admin",
    password: "123456",
  };
  const sampleProduct = {
    product_id: 1,
    name: "Test Product 1",
    price: 200,
    category: "test category 1",
  };

  let token: string;
  beforeAll(async () => {
    token = (await route.post("/auth/login").send(sampleUser)).body.accessToken;
  });

  describe("User", () => {
    describe("[User Model]", () => {
      it("should have an index method", () => {
        expect(user.index).toBeDefined();
      });

      it("should have a show method", () => {
        expect(user.show).toBeDefined();
      });

      it("should have a create method", () => {
        expect(user.create).toBeDefined();
      });
    });

    describe("[User endpoints]", () => {
      it("should have a POST endpoint - create user", (done) => {
        route
          .post("/users")
          .send({
            firstName: "test user",
            lastName: "test",
            password: "123456",
          })
          .auth(token, { type: "bearer" })
          .then((response) => {
            expect(response.status).toBe(200);
            done();
          });
      });

      it("should have a GET endpoint - show users", (done) => {
        route
          .get("/users")
          .auth(token, { type: "bearer" })
          .then((response) => {
            expect(response.status).toBe(200);
            done();
          });
      });

      it("should have a GET endpoint - show user", (done) => {
        route
          .get("/users/1")
          .auth(token, { type: "bearer" })
          .then((response) => {
            expect(response.status).toBe(200);
            done();
          });
      });
    });
  });

  describe("Product", () => {
    describe("[Product Model]", () => {
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

    describe("[Product endpoints]", () => {
      it("should have a GET endpoint - show list of product", (done) => {
        route
          .get("/products")
          .auth(token, { type: "bearer" })
          .then((response) => {
            expect(response.status).toBe(200);
            done();
          });
      });

      it("should have a GET endpoint - show product", (done) => {
        route
          .get("/products/1")
          .auth(token, { type: "bearer" })
          .then((response) => {
            expect(response.status).toBe(200);
            done();
          });
      });

      it("should have a POST endpoint - create product", (done) => {
        route
          .post("/products")
          .auth(token, { type: "bearer" })
          .send(sampleProduct)
          .then((response) => {
            expect(response.status).toBe(200);
            done();
          });
      });
    });
  });

  describe("Order", () => {
    describe("[Order Model]", () => {
      it("should have an create method", () => {
        expect(order.create).toBeDefined();
      });

      it("should have a show current user completed orders method", () => {
        expect(order.showCurrentUserCompletedOrders).toBeDefined();
      });

      it("should have a show current user orders method", () => {
        expect(order.showCurrentUserOrders).toBeDefined();
      });

      it("should have a change order status to complete method", () => {
        expect(order.updateToCompleted).toBeDefined();
      });
    });

    describe("[Order endpoints]", () => {
      const products = [
        {
          product_id: "1",
          quantity: 3,
        },
      ];

      describe("Current user", () => {
        it("should have a POST method - create current user's order", (done) => {
          route
            .post("/orders")
            .auth(token, { type: "bearer" })
            .send(products)
            .then((response) => {
              expect(response.status).toBe(200);
              done();
            });
        });

        it("should have a GET endpoint - show current user completed orders method", (done) => {
          route
            .get("/orders/completed")
            .auth(token, { type: "bearer" })
            .then((response) => {
              expect(response.status).toBe(200);
              done();
            });
        });

        it("should have a GET endpoint - show current user orders method", (done) => {
          route
            .get("/orders")
            .auth(token, { type: "bearer" })
            .then((response) => {
              expect(response.status).toBe(200);
              done();
            });
        });
      });

      describe("Specified User", () => {
        beforeAll(async () => {
          await route
            .post("/users")
            .send({
              firstName: "Manh",
              lastName: "test",
              password: "123456",
            })
            .auth(token, { type: "bearer" });
        });

        it("should have a POST method - create specified user's order", (done) => {
          route
            .post("/orders/2")
            .auth(token, { type: "bearer" })
            .send(products)
            .then((response) => {
              expect(response.status).toBe(200);
              done();
            });
        });
        it("should have a GET endpoint - show specified user completed orders method", (done) => {
          route
            .get("/orders/completed/2")
            .auth(token, { type: "bearer" })
            .then((response) => {
              expect(response.status).toBe(200);
              done();
            });
        });

        it("should have a GET endpoint - show specified user orders method", (done) => {
          route
            .get("/orders/2")
            .auth(token, { type: "bearer" })
            .then((response) => {
              expect(response.status).toBe(200);
              done();
            });
        });
      });

      it("should have a POST endpoint - change order status to complete method", (done) => {
        route
          .post("/orders/to-completed/1")
          .auth(token, { type: "bearer" })
          .then((response) => {
            expect(response.status).toBe(200);
            done();
          });
      });
    });
  });
});
