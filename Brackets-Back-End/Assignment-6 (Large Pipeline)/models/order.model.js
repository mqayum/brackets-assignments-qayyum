const Order = require("../schemas/order.schema");

const create = async (data) => {
    try{
        let order = new Order(data);
        return await order.save();
    }
    catch(err){
        return err;
    }
    
}
const getAll = async() => {
    
    try{
        const orderDetailPipeline = [
            {
              '$lookup': {
                'from': 'users', 
                'localField': '_customerId', 
                'foreignField': '_id', 
                'as': 'Customer', 
                'pipeline': [
                  {
                    '$project': {
                      'firstName': 1, 
                      'lastName': 1, 
                      'email': 1, 
                      'phoneNumber': 1, 
                      '_id': 0
                    }
                  }
                ]
              }
            }, {
              '$lookup': {
                'from': 'products', 
                'localField': '_productId', 
                'foreignField': '_id', 
                'pipeline': [
                  {
                    '$project': {
                      'productName': 1, 
                      'productPrice': 1, 
                      '_id': 0
                    }
                  }
                ], 
                'as': 'Product'
              }
            }
          ];

        return await Order.aggregate(orderDetailPipeline);
    }
    catch(err){
        return err;
    }

}
module.exports = {create, getAll};
