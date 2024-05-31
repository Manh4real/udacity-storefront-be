import { IOrderProduct } from "../models/order_product";

export const getCreateOrderProductsQuery = (orderProducts: IOrderProduct[]) => {
  const cols = ["order_id", "product_id", "quantity"];
  const query = ["INSERT INTO order_products"];
  query.push(`(${cols.join(", ")})`);
  query.push("VALUES");

  const preparedSet: string[] = [];
  const values: any[] = [];
  let j = 0;

  Object.entries(orderProducts).forEach(([index, orderProduct], i) => {
    preparedSet.push(
      `($${index + j + 1}, $${index + j + 2}, $${index + j + 3} )`
    );

    values.push(
      +orderProduct.order_id,
      +orderProduct.product_id,
      +orderProduct.quantity
    );

    j += 2;
  });

  query.push(preparedSet.join(","));

  return {
    query: query.join(" "),
    values,
  };
};
