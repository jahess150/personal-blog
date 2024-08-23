# Personal Blog Platform

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-333333?style=for-the-badge&logo=javascript&logoColor=white)

A simple blogging platform built using Node.js, Express.js, and MongoDB with an EJS templating engine. This platform allows you to create, edit, and delete blog posts through an admin interface while maintaining a clean and responsive frontend for regular users.

## Features

-   **Admin Authentication:** Only authorized users can log in to the admin dashboard.
-   **CRUD Functionality:** Create, read, update, and delete blog posts.
-   **Responsive Design:** A simple and responsive interface using EJS and custom CSS.
-   **Secure Admin Routes:** Routes for managing posts are protected and only accessible to logged-in admins.

## Project Structure

```plaintext
personal-blog/
│
├── middleware/           # Authentication middleware
│   └── auth.js
├── models/               # Mongoose models
│   └── post.js
├── routes/               # Express routes
│   └── posts.js
├── public/               # Static files (CSS, images, etc.)
│   └── styles.css
├── views/                # EJS templates
│   ├── partials/         # Reusable EJS partials (header, footer)
│   ├── dashboard.ejs
│   ├── edit.ejs
│   ├── index.ejs
│   ├── login.ejs
│   ├── new.ejs
│   └── show.ejs
├── .gitignore            # Ignored files for Git
├── index.js              # Main application file
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

## Usage

-   **Admin Login:** Navigate to `/admin/login` to access the admin panel. The login credentials are hardcoded for now.
-   **Creating a Post:** Once logged in, you can create a new post from the admin dashboard.
-   **Editing/Deleting a Post:** Click on any post in the list and access the edit or delete options.

## Technologies Used

-   **Node.js & Express.js:** Backend framework and server.
-   **MongoDB & Mongoose:** Database and ORM.
-   **EJS:** Templating engine for rendering HTML.
-   **CSS:** Custom styles for the frontend.

## Future Enhancements

-   Implement user authentication with a database.
-   Add a rich text editor for creating and editing posts.
-   Implement pagination for post listings.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Happy coding! Feel free to contribute or suggest improvements.
