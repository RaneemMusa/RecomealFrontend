# RecoMeal Frontend (React + Vite)

This is the frontend for the RecoMeal web application built with React and Vite. The application allows users to discover recipe suggestions based on ingredients they already have, and offers role-based access for both regular users and administrators.

## Description

The app allows two types of users:

### Regular users
- Select ingredients from categorized lists  
- View recipe recommendations from the Spoonacular API  
- Save recipes to a personal food list  
- View and delete saved recipes  
- Edit their profile information  

### Admin users
- Access a dedicated admin dashboard  
- Add, update, and delete ingredients  
- Add, update, and delete categories  

Users must sign up or log in to use the app. Sessions are maintained using `localStorage`.

## User Requirements

1. Sign up or log in with an email and password   
2. Access features based on the role  
3. Interact with recipes and the Spoonacular API  
4. Save and manage recipes per user  

## Technologies Used

- React 18  
- Vite  
- React Router DOM  
- Bootstrap 5  
- Fetch API  
- Spoonacular API  
- LocalStorage  

## Project Structure
```
src/
├── components/
├── pages/
├── styles/
├── App.jsx
└── main.jsx
```


## Getting Started

```bash
cd recomall-app
npm install
npm run dev
