# DevBlog Midterm - Docker Deployment

This project is a full-stack web application containerized using Docker Compose. It includes:
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js (Express.js)
- **Database:** MongoDB
- **Load Balancer:** Nginx
- **Message Broker:** RabbitMQ

## Prerequisites
Ensure you have the following installed:
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Postman](https://www.postman.com/)

## Setup Instructions

### 1. Clone the Repository
First, clone the project from GitHub:
```sh
git clone https://github.com/Ricne/devblog-midterm.git
cd devblog-midterm
```

### 2. Create Environment File
Create a `.env` file in the project root and configure the database connection:
```
MONGO_URI=mongodb+srv://ricne:hunghuynh2004@midterm.vfuya.mongodb.net/crud-database?retryWrites=true&w=majority&appName=midterm
MONGO_INITDB_DATABASE=crud-database
PORT=3000 
RABBITMQ_HOST=rabbitmq
REDIS_HOST=redis
```

### 3. Start the Application
Run the following command to start all services using Docker Compose:
```sh
docker compose up -d
```
This will build the necessary images (if not already built) and start the backend, frontend, database, RabbitMQ, and Nginx services in detached mode.

### 4. Verify Running Containers
Check if the containers are running:
```sh
docker ps
```
If any container is not running, check its logs:
```sh
docker logs <container_id>
```

### 5. Access the Application
Once running, you can access the app at:
- **Web App:** `http://localhost`
- **MongoDB:** Use MongoDB Compass or a database client with the provided `MONGO_URI`.
- **RabbitMQ Management UI:** `http://localhost:15672` (User: `abc`, Password: `1234`)

### 6. Sending and Receiving Messages in RabbitMQ
#### Sending a Message
1. Go to `http://localhost:15672` and log in.
2. Navigate to **Queues** and select an existing queue or create a new one.
3. Click **Publish message**.
4. Enter a message payload (e.g., `{ "text": "Hello, RabbitMQ!" }`).
5. Click **Publish Message**.

#### Receiving a Message
1. Go to **Queues** in the RabbitMQ UI.
2. Click on the queue name.
3. Scroll to the **Get messages** section.
4. Click **Get Message(s)** to retrieve a message from the queue.
5. The message should appear in the UI, displaying its content and metadata.

### 7. Scaling the Application
To scale the backend service (app container), use:
```sh
docker compose up -d --scale app=3
```
This will run 3 instances of the backend service behind the Nginx load balancer.

## Testing API with Postman

### 1. Open Postman
Make sure you have Postman installed and running.

### 2. Create a New Request
- Set the request type to **GET, POST, PUT, DELETE** depending on the API you are testing.
- Use the base URL: `http://localhost/api/<endpoint>`
- For example, to fetch all blog posts, send a GET request to:
  ```sh
  http://localhost/api/posts
  ```
- If authentication is required, add the appropriate headers (e.g., Authorization token).

### 3. Running Multiple Requests
To automate API testing in Postman:
- Open **Runner** in Postman.
- Select your collection of API requests.
- Set **Iterations** (e.g., 100 for load testing).
- Click **Start Run**.

### 4. Verify Response
If everything is working correctly, Postman should return a `Status Code: 200` for successful requests.

## Updating the Project

### 1. Pull the Latest Changes
If there are updates in the GitHub repository, pull them:
```sh
git pull origin main
```

### 2. Rebuild and Restart
After pulling updates, rebuild and restart the application:
```sh
docker compose up -d --build
```

## Troubleshooting

### MongoDB Connection Issues
If you see an error like:
```
MongoDB Connection Error: The `uri` parameter to `openUri()` must be a string, got "undefined".
```
Ensure that `MONGO_URI` is correctly set in the `.env` file.

### RabbitMQ Connection Issues
If the backend service cannot connect to RabbitMQ, check:
```sh
docker logs <backend_container_id>
```
Ensure that the `RABBITMQ_HOST` and `RABBITMQ_PORT` are correctly set in the `.env` file.

### Network Issues
Check if the containers are in the same network:
```sh
docker network ls
docker network inspect <network_name>
```
If needed, manually connect them:
```sh
docker network connect <network_name> <container_name>
```

## Conclusion
This project is fully containerized and can be deployed quickly using Docker. Follow the steps above to set up, run, test with Postman, interact with RabbitMQ, and troubleshoot any issues.