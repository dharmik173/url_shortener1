# URL Shortener

A simple URL shortener web application built with Next.js, MongoDB, and NextAuth for authentication.

## Features
- Shorten long URLs into short, easy-to-share links.
- User authentication with NextAuth.
- Dashboard to manage shortened URLs.
- Click tracking and analytics.

## Tech Stack
- **Frontend:** Next.js (App Router)
- **Backend:** API Routes in Next.js
- **Database:** MongoDB
- **Authentication:** NextAuth
- **Styling:** Tailwind CSS
- **Hosting:** Vercel

## Installation

### Prerequisites
- Node.js (>= 16)
- MongoDB (local or Atlas)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/dharmik173/url_shortener1.git
   
   cd url-shortener
   ```

2. Install dependencies:
  
   npm install

3. Set up environment variables in a `.env.local` file:
   ```env
   NEXT_PUBLIC_BASE_URL=''
   GOOGLE_CLIENT_ID=''
   GOOGLE_CLIENT_SECRET=''
   NEXTAUTH_SECRET=''
   JWT_SECRET=''
   MONGODB_URI=''
   NEXTAUTH_URL=''
   NEXTAUTH_URL_INTERNAL=''

4. Start the development server:

   npm run dev

   The application will be running on `http://localhost:3000`

## Usage
- Sign in using the authentication method set up in NextAuth.
- Enter a long URL and generate a short link.
- Access the dashboard to manage your shortened URLs.
- Share the short link and track its usage.


## Future Improvements
- Add custom alias support.
- Implement QR code generation.
- Improve analytics for link tracking.
- Enhance UI/UX.


## Author
Developed by [Dharmik Shah](https://github.com/dharmik173).

