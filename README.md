# EasyMart Backend

A robust e-commerce backend API built with Node.js, Express, and MongoDB.

## Features

- **Authentication**: Secure user authentication using JWT (JSON Web Tokens) via headers (`x-auth-token` or `Authorization: Bearer`).
- **Authorization**: Role-based access control (Admin vs. User).
- **Product Management**: CRUD operations for products (Admin only for modifications).
- **Shopping Cart**: Persistent cart functionality for users.
- **Order Processing**: Seamless order creation from cart contents with stock validation.
- **Security**: Implemented with `helmet`, `cors`, and secure password hashing (`bcrypt`).
- **Logging**: Centralized logging using `winston` and `morgan`.
- **Testing**: Integration tests setup with `jest` and `supertest`.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Validation**: Joi
- **Testing**: Jest, Supertest

## Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd easymart
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configuration**
    *   The application uses the `config` package.
    *   Default configuration is in `config/default.json` (or `development.json`).
    *   Ensure you have MongoDB running locally or update the connection string.
    *   **Important**: Set the `JWT_SECRET` environment variable or update it in the config file for development.

4.  **Run the application**
    ```bash
    # Development mode (with nodemon if installed, or node)
    npm start
    ```
    The server runs on port **4000** by default.

## API Endpoints

### Authentication
*   `POST /api/user`: Register a new user.
*   `POST /api/user/login`: Login. Returns a JWT token in the body and `x-auth-token` header.

### Products
*   `GET /api/products`: Get all products.
*   `GET /api/products/:id`: Get a single product.
*   `POST /api/products/newproduct`: Add a product (**Admin only**).
*   `PUT /api/products/:id`: Update a product (**Admin only**).
*   `DELETE /api/products/:id`: Delete a product (**Admin only**).

### Cart
*   `GET /api/cart`: Get the logged-in user's cart.
*   `POST /api/cart`: Add an item to the cart.
    *   Body: `{ "productId": "...", "quantity": 1 }`
*   `DELETE /api/cart`: Remove an item from the cart.
    *   Body: `{ "productId": "..." }`

### Orders
*   `POST /api/orders`: Create an order from the current cart.
*   `GET /api/orders`: Get all orders (**Admin only**).

### Users
*   `GET /api/user`: Get current user details.

## Authentication Headers

Authenticated requests must include the token in the headers:
*   `x-auth-token`: `<your_token>`
*   OR `Authorization`: `Bearer <your_token>`

## Testing

Run the integration tests using:

```bash
npm test
```
