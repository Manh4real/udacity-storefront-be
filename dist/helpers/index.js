"use strict";
exports.__esModule = true;
exports.getCreateOrderProductsQuery = void 0;
var getCreateOrderProductsQuery = function (orderProducts) {
    var cols = ["order_id", "product_id", "quantity"];
    var query = ["INSERT INTO order_products"];
    query.push("(".concat(cols.join(", "), ")"));
    query.push("VALUES");
    var preparedSet = [];
    var values = [];
    var j = 0;
    Object.entries(orderProducts).forEach(function (_a, i) {
        var index = _a[0], orderProduct = _a[1];
        preparedSet.push("($".concat(index + j + 1, ", $").concat(index + j + 2, ", $").concat(index + j + 3, " )"));
        values.push(+orderProduct.order_id, +orderProduct.product_id, +orderProduct.quantity);
        j += 2;
    });
    query.push(preparedSet.join(","));
    return {
        query: query.join(" "),
        values: values
    };
};
exports.getCreateOrderProductsQuery = getCreateOrderProductsQuery;
