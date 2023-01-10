# tumblr-clone 
DOCUMENTATION

NOTE: The backend of this project is hosted on a free server with low RAM and processor capacity. This means that API calls may take more time to respond to requests. 

TO RUN APP
    To run this application locally, run npm install on your terminal to download all necessary dependencies. To use the online version, simply click on the netlify-hosted link in description to get started. Note that the endpoint is hosted on a free server with low RAM space. hence, API calls tend to take more time than usual when you carryout operations such as like, comments, delete. Posts may also take some time to load at first as a result of this.

FUNCTIONAL AREAS
    The functional areas of this project include the following:

SIGN UP/LOGIN
    Simply click on the signup or login button, provide your email and follow the prompts. Make sure to use a valid email address becasue you'd have to provide an authentication code from your email to successfully register.

    Note that you users need to login before they can like, comment, post or view profile. When not logged in, user can only view posts.


CREATE POSTS
        To create post, login and click on the pen icon on your dashboard, you'd be prompted to select post type. Select the "TEXT" type to proceed. Other types are still in development. A post modal will come on, fill in the required fields and publish your post.

PROFILE
    When logged in, click on the user icon on your dashboard. This will take you to your profile page where you can track your activities and manage all your posts

LIKE
    Simply click the like button under a post to like it. The button toggles like and unlike when you click repeatedly


COMMENTS
    Click on the comments icon or text on a post's foot to view comments and also post your comment. Note, users can only modify or delete comments they authoured. 

ADMIN DASHBOARD
    The content management system for this blog is only accessible to users with admin roles. You can not sign up as admin as only an admin can create another admin or modify a user to have admin privileges.