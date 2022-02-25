FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]

#Rodar o comando abaixo para subir a imagem do docker
#docker build -t nome_da_imagem local_do_dockerfile
#docker build -t rentx .


#Rodar a máquina
#docker run -p porta_host:porta_container nome_da_imagem
#docker run -p 3333:3333 rentx