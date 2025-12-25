# user Directory

## Overview

- customer-model.js: Queries for customer-router.js endpoints.
- customer-router.js: Endpoints for customer user type.
- manager-model.js: Queries for the manager-router.js endpoints.
- manager-router.js: Endpoints for manager user type.

## Endpoints
| **Request Type**| **Customer Endpoint** | **Description**|
|-----------------|-------------------|----------------|
| POST | `/api/user/buy-product/:product_id/:quantity` | Allows customer to buy product |
| GET | `/api/user/get-past-orders` | Retrieves all past orders of customer |


## Queries
|**Customer Model**|**Description**|
|--------------|---------------------------------------------------|
| addOrder(order) | Adds a customer order to database. |
| retrieveOrders(user_id) | Retrieves all orders of customer using user's id. |
