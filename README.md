# Local_Shop

[Check out the website](http://ec2-18-159-186-121.eu-central-1.compute.amazonaws.com/)

## Clone & Install Dependencies
```bash
git clone https://github.com/odedgafni/Local_Shop.git

cd Local_Shop/server && npm install

cd ../client && npm install
```

## Create a .env file in the server folder
Inside the server folder create a new file and name it .env

In the .env file enter these two lines:
```
DB_CONNECTION=YOUR_MONGO_CONNECTION_STRING
TOKEN_SECRET=YOUR_SECRET
```

## Connect to MongoDB
Login/register to mongoDB and create a cluster
[https://account.mongodb.com/account/login](https://account.mongodb.com/account/login)

Set Up Guide:
[Create a Cluster with Atlas](https://docs.atlas.mongodb.com/getting-started)

After completing the steps in the Atlas guide, you should have a new MongoDB cluster deployed in Atlas, a new database user, and sample datasets loaded into your cluster.

### Connect to your Cluster
Click the connect button and choose 'Connect with your application' on the menu
![alt text](https://docs.mongodb.com/drivers/node/includes/figures/atlas_connection_select_cluster.png)

### Copy your Connection String
Copy the connection string and paste it inside in the .env file instead of "YOUR_MONGO_CONNECTION_STRING" 

Dont forget to replace the username and password with your details

## Run

```bash
cd ../server && npm start
```
Open a new terminal to run both back-end and client
```bash
cd ../client && npm start
```
\
