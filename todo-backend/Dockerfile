# Start from node base image
FROM node 

# All subsequent commands will now be run from inside this folder
RUN mkdir -p /todo-backend
WORKDIR /todo-backend
# Copy all the code in the local directory into the container’s working directory
COPY . /todo-backend

# Install dependencies (Make sure to add node_modules to your .dockerignore 
# in case you accidentally install locally.)
RUN npm install -g
# If you are building your code for production
# RUN npm install --only=production

CMD [ "npm", "start" ]
# FIXME: nodemon will not be install in prod mode.

EXPOSE 3030

