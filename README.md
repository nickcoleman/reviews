# reviews

# Create landing page
# Create skiresort page that lists each ski resort
# skiresorts have:
   * name
   * image (url to external source)

# Create Layout and basic styling for skiresorts
   * Create header & footer partials
   * Link to Bootstrap

# Create New category
   * Set up new Ski Resort post route
   * Add body-parser
   * Add show Ski Resort form
   * Add route to form

# Style Navbar & form
   * Add navbar to all pages
   * Style new category form

# Add Mongoose
   * Install and configure mongoose
   * Setup skiresorts model
   * Use skiresorts mondel inside our routes

# Show Page
   * Add 'description' to skiresort model
   * Add a show route/template

# Comment New/Create
   * Setup nested routes
   * Add comment new & create routes
   * Add new comment form
   * TODO: convert Text box to Text Area

# Style Ski Resort Show Page
   * Add sidebar
   * Reformat comments
   * Add public directory (/public/stylesheets)
   * Add custom stylesheet (main.css)

# Add User Model
    * Install packages needed for authentication
    * Define User model
    * TODO: Automatically associate author with their comments

# Add Authentication
    * Configure passport
    * Add register routes
    * Add register template
    * Add login routes
    * Add login template
    * TODO: Add password Reset
    * TODO: Add forgot password

# Update Navbar
    * Add login/logout/sign-up links to navbar
    * Show/Hide authentication links
    * Show Signed In As: <%= currentUser %>
    * TODO: Add Profile page & link from above

# Refactor Routes
    * Reorganize routes with Express Router
    
# Users + Comments
   * Associate users and comments
   * Automatically save author name to a comment

# Users + Categories (ski resorts)
   * Prevent unauthenticated user from adding a category
   * Save username & id to newly created category
 

# Editing Categories
   * Implement Method-Override
   * Add Categories Edit route
   * Add Link to Edit Page
   * Add Update Router
   * Fix $set problem

# Deleting Categories
   * Add Destroy Route
   * Add Delete Button

# User Authorization - Categories
   * User can only edit their category entry
   * User can only delete their category entry
   * Hide/Show Edit/Delete buttons based on authorization
   * TODO: Authorization Roles (e.g. User, Editor, Admin, SuperAdmin)

# Editing Comments
   * Add Edit route
   * Add Edit button
   * Add Update route

# Deleting Comments
   * Add Destroy Route
   * Add Delete Button

# User Authorization - Comments
   * User can only edit their comments
   * User can only delete their comments
   * Hide/Show Edit/Delete buttons based on authorization
   * Refactor Middleware


