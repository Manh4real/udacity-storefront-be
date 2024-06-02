import { IOrderProduct } from "../models/order_product";

export const getCreateOrderProductsQuery = (orderProducts: IOrderProduct[]) => {
  const cols = ["order_id", "product_id", "quantity"];
  const query = ["INSERT INTO order_products"];
  query.push(`(${cols.join(", ")})`);
  query.push("VALUES");

  const preparedSet: string[] = [];
  const values: any[] = [];
  let j = 0;

  Object.entries(orderProducts).forEach(([_, orderProduct], i) => {
    preparedSet.push(`($${i + j + 1}, $${i + j + 2}, $${i + j + 3} )`);

    values.push(
      +orderProduct.order_id,
      +orderProduct.product_id,
      +orderProduct.quantity
    );

    j += 2;
  });

  query.push(preparedSet.join(","));
  query.push("RETURNING *");

  return {
    query: query.join(" "),
    values,
  };
};
