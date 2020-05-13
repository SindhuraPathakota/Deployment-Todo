# Start from node base image
FROM node 

# Less messages during docker build
ENV NPM_CONFIG_LOGLEVEL warn
# Allows app_env to be set during build (default as empty string)
ARG app_env
# Sets an environment variable to app_env argument, this way the variable 
# will persist in the container for use in code
ENV APP_ENV $app_env

# All subsequent commands will now be run from inside this folder
RUN mkdir -p /todo-frontend
WORKDIR /todo-frontend
# Copy all the code in the local directory into the container’s working directory
COPY . /todo-frontend

# Install dependencies (Make sure to add node_modules to your .dockerignore 
# in case you accidentally install locally.)
RUN npm install
RUN npm run build

# Checks the enviroment variable in order to run the react
CMD npm run start

EXPOSE 3000
