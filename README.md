# BlueTech
 
BlueTech is a full-stack e-commerce web application with a **.NET 7 Web API** backend and a **React + TypeScript** frontend. It covers the core flows of an online store: product catalog with filtering, shopping basket, checkout with Stripe payments, order history, user accounts, and an admin panel for managing products.
 
## Tech Stack
 
**Backend (`API/`)**
- ASP.NET Core 7 Web API
- Entity Framework Core with **PostgreSQL** (Npgsql)
- ASP.NET Core Identity + **JWT bearer authentication**
- **Stripe.net** for payment intents and webhooks
- **CloudinaryDotNet** for product image hosting
- AutoMapper for DTO mapping
- Swagger / OpenAPI for API documentation
**Frontend (`client/`)**
- React 18 with TypeScript
- Redux Toolkit for state management
- React Router v6
- MUI (Material UI) + Emotion / styled-components
- React Hook Form + Yup for form validation
- Axios for HTTP requests
- Stripe.js / React Stripe.js for the checkout UI
## Project Structure
 
```
BlueTech/
├── API/                    # ASP.NET Core Web API
│   ├── Controllers/        # Account, Products, Basket, Orders, Payments, Bugs
│   ├── Data/                # DbContext, migrations, DB seeding
│   ├── DTO/                  # Data transfer objects
│   ├── Entities/            # Domain models (Product, Basket, Order, User, ...)
│   ├── Extensions/          # Extension methods
│   ├── Middleware/          # Global exception handling
│   ├── RequestHelpers/      # Paging, sorting, image upload helpers
│   ├── Services/            # TokenService, PaymentService, ImageService
│   └── Program.cs
├── client/                  # React + TypeScript SPA
│   └── src/
│       ├── app/             # Store, API client, router, shared components/hooks
│       └── features/        # catalog, basket, checkout, orders, account, admin, home, about, contact
└── BlueTech.sln
```
 
## Features
 
- **Catalog** – browse, search, filter (by brand/type), sort, and paginate products
- **Basket** – add/remove items, quantities persisted server-side
- **Checkout** – multi-step checkout with Stripe payment intent creation and webhook handling
- **Accounts** – register, login (JWT), view/update profile, saved shipping address
- **Orders** – view current user's order history and order details
- **Admin panel** – create, update, and delete products, brands, and product types (with image upload via Cloudinary)
- **Error handling** – dedicated endpoints/pages for testing 400/401/404/500 responses
## Getting Started
 
### Prerequisites
 
- [.NET 7 SDK](https://dotnet.microsoft.com/download/dotnet/7.0)
- [Node.js](https://nodejs.org/) (v16+) and npm
- [PostgreSQL](https://www.postgresql.org/download/)
- A [Stripe](https://stripe.com/) account (test API keys)
- A [Cloudinary](https://cloudinary.com/) account (for image uploads)
### 1. Clone the repository
 
```bash
git clone https://github.com/ErmalKeqmezi/BlueTech.git
cd BlueTech
```
 
### 2. Configure the API
 
Create a PostgreSQL database and user matching your connection string, or update `API/appsettings.Development.json`:
 
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Port=5432;User Id=bluetech;Password=bluetech;Database=store"
  },
  "JWTSettings": {
    "TokenKey": "<your-secret-key>"
  }
}
```
 
Add your Stripe and Cloudinary credentials — ideally via [.NET user-secrets](https://learn.microsoft.com/aspnet/core/security/app-secrets) rather than committing them:
 
```bash
cd API
dotnet user-secrets set "StripeSettings:SecretKey" "sk_test_..."
dotnet user-secrets set "StripeSettings:PublishableKey" "pk_test_..."
dotnet user-secrets set "StripeSettings:WhSecret" "whsec_..."
dotnet user-secrets set "Cloudinary:CloudName" "your-cloud-name"
dotnet user-secrets set "Cloudinary:ApiKey" "your-api-key"
dotnet user-secrets set "Cloudinary:ApiSecret" "your-api-secret"
```
 
### 3. Run the API
 
```bash
cd API
dotnet restore
dotnet run
```
 
On startup, the API applies EF Core migrations and seeds the database with sample products and users, including a demo admin account:
 
- **Email:** `admin@bluetech.com`
- **Password:** `Pa$$w0rd`
The API runs with Swagger UI available in development mode for exploring and testing endpoints.
 
### 4. Run the client
 
```bash
cd client
npm install
npm start
```
 
The React app runs on `http://localhost:3000` and is configured (via CORS on the API) to talk to the backend.
 
## API Overview
 
| Area | Endpoint prefix | Examples |
|---|---|---|
| Accounts | `/api/account` | login, register, currentUser, savedAddress |
| Products | `/api/products` | GetAllProducts, GetProduct/{id}, filters, brands/types CRUD |
| Basket | `/api/basket` | get, add item, remove item |
| Orders | `/api/orders` | get orders, get order by id, create order |
| Payments | `/api/payments` | create/update payment intent, Stripe webhook |
| Bugs | `/api/bugs` | test endpoints for common HTTP error responses |
 
## Author

**Ermal Keqmezi**
Software Developer & AI Engineer

## License

This project is available for educational and portfolio purposes.
