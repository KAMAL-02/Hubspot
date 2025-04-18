This project provides integration with HubSpot CRM using a Next.js frontend and Flask backend.

## Project Structure

- **Frontend**: Next.js 15 application with TypeScript and Tailwind CSS
- **Backend**: Flask REST API with HubSpot API integration

## Prerequisites

- Node.js
- Python
- HubSpot Account
- npm

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Create a `.env` file in the Backend directory with the following variables:
   ```
   HUBSPOT_API_KEY=your_hubspot_api_key
   HUBSPOT_CLIENT_ID=your_hubspot_client_id
   HUBSPOT_CLIENT_SECRET=your_hubspot_client_secret
   HUBSPOT_REDIRECT_URI=http://localhost:3000/auth/callback
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the frontend directory with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

## Registering a HubSpot App

1. Go to [HubSpot Developer Portal](https://developers.hubspot.com/) and sign in or create an account.

2. Navigate to "Apps" in the main menu.

3. Click "Create App" and provide the necessary information:
   - App Name: Your application name
   - Description: Brief description of your app

4. Under "Auth" settings:
   - Add the following scopes:
     - `crm.objects.contacts.read`
     - `crm.objects.companies.read`
     - `crm.objects.deals.read`
     - Add other scopes as needed for your specific use case
   
   - Set the Redirect URL to: `http://localhost:3000/auth/callback`

5. Save the application and note down the following credentials:
   - Client ID
   - Client Secret
   - App ID

6. Add these credentials to your backend `.env` file.

## Running the Application Locally

### Start the Backend Server

1. Navigate to the backend directory and activate your virtual environment if not already activated.

2. Start the Flask server:
   ```bash
   python app.py
   ```
   The backend will run on `http://localhost:5000` by default.

### Start the Frontend Development Server

1. Navigate to the frontend directory.

2. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`.

3. Open your browser and navigate to `http://localhost:3000`.

## Testing the Application

1. Login with your HubSpot credentials when prompted.

2. Use the Object Selector component to switch between different CRM objects (Contacts, Companies, Deals, etc.).

## Video Walkthrough

[Watch the walkthrough](https://drive.google.com/file/d/1LXAf3v3PaHq4FPSIp0lP_A_PvfROSlPD/view?usp=drive_link)
