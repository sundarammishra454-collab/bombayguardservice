# Backend Setup

To run the backend, you need to have Node.js and npm installed.

1. **Install dependencies:**
   ```bash
   npm install express body-parser
   ```

2. **Set environment variables:**
   Before running the application, you need to set the following environment variables:
   - `ADMIN_USERNAME`: The username for the admin.
   - `ADMIN_PASSWORD`: The password for the admin.

   For example, in a bash terminal, you can set them like this:
   ```bash
   export ADMIN_USERNAME=your_admin_username
   export ADMIN_PASSWORD=your_admin_password
   ```

3. **Run the backend:**
   ```bash
   node backend-api.js
   ```

   The server will start on `http://localhost:3000`.
