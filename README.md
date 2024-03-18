# ShareableBoard

ShareableBoard is a tool where you can create and share boards with others. It allows you to collaborate in real-time by drawing on the whiteboard. Share your ideas, plans, or sketches with anyone you want, making teamwork simpler and more efficient



https://github.com/SameerSahu007/Shareableboard/assets/29480670/10ab1380-57c7-41bb-86ca-6a651d3c91e9



## Features

- **Drawing Sharing**: Shareable Whiteboard enables users to create and share drawings with others via unique URLs.
- **Real-time Collaboration**: Users can collaborate in real-time by drawing, adding annotations, and editing the whiteboard together.
- **Simple Interface**: Shareable Whiteboard offers a user-friendly interface for creating and sharing drawings effortlessly.
  
## Tech Stack

- **Frontend**: React.js with TypeScript
- **Backend**: Express.js with TypeScript
- **Database**: MongoDB
- **Styling**: Tailwind CSS

## Installation

1. Clone the repository:

    ```
    git clone https://github.com/SameerSahu007/Shareableboard.git
    ```

2. Navigate into the project directory:

    ```
    cd Shareableboard
    ```

3. Install dependencies for both the frontend and backend:

    ```
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

4. Set up Frontend & Backend:
   - Create a `.env` file in the `frontend` directory and add these urls:

     ```
     REACT_APP_BASE_URL=http://localhost:8000
     REACT_APP_GETID=http://localhost:8000/getid
     ```
     
    - Create a `.env` file in the `backend` directory and add these urls:
      ```
      ORIGIN=http://localhost:3000/
      ```


5. Start the backend server:

    ```
    npm run dev
    ```

6. Start the frontend development server:

    ```
    cd ../frontend
    npm run start
    ```

7. Open your browser and navigate to `http://localhost:3000` to access CodeBin.

## Contributing

Contributions to CodeBin are welcome! If you'd like to contribute, please fork the repository and submit a pull request with your changes. For major modifications, please open an issue first to discuss the changes you wish to make.

## License

This project is licensed under the [MIT License](LICENSE).

---

