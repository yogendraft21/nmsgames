# nmsgames

<h4>I did not use .env files because of better understand of token,url,port and secret key.</h4>
<h4> You can change your port and db connection as per your requirement</h4>
  
  <h2> API End-Points</h2>
  <h4> UserRouter.post (/users/register) => for add new user</h4>
  <h4> UserRouter.post (/users/login) => for login existing user</h4>
  <h4> TodoRouter.post (/todos/add) =>  add new todo</h4>
  <h4> TodoRouter.get (/todos) => for get all todos of that particular user</h4>
  <h4> TodoRouter.patch (/todos/edit:id) => for update todo</h4>
  <h4> TodoRouter.delete (/todos/delete:id) => to delete todo</h4>
  
  <p> All user password are stored in hash manner so it secure.<br> Middleware for authenticate user for further operations.</p>
  
 
