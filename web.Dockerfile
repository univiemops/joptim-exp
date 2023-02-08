FROM debian:bullseye

COPY . /app
WORKDIR /app

RUN apt update || : && apt install curl -y
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt install -y nodejs 
RUN rm node_modules -rf
RUN npm install
RUN npm i -g serve
RUN npm run build

EXPOSE 8080

CMD ["serve", "-s", "build", "-l", "8080"]