# nmsgames

<h4>I did not use .env files because of better understand of token,url,port and secret key.</h4>
<h4> You can change your port and db connection as per your requirement</h4>
  
  <h2> API End-Points</h2>
  <h4> UserRouter.post (/users/register) => for add new user</h4>
  <h4> UserRouter.post (/users/login) => for login existing user</h4>
  <h4> TodoRouter.post (/todos/add) =>  add new todo</h4>
  <h4> TodoRouter.get (/users) => for get all todos of that particular user</h4>
  <h4> UserRouter.patch (/users/edit:id) => for update todo</h4>
  <h4> UserRouter.delete (/todos/delete:id) => to delete todo</h4>
  
  <p> All user password are stored in hash manner so it secure. Middleware for authenticatee user for further operations</p>
  
 
