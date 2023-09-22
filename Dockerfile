# Use uma imagem base com Node.js
FROM node:14

# Crie e defina a pasta de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos de configuração e dependências do projeto
COPY . .

# Instale as dependências
RUN npm install

# Copie o código-fonte do frontend para o contêiner
COPY . /app

# Construa o aplicativo React
RUN npm run build

# Exponha a porta 8080 para o aplicativo React
EXPOSE 1235

# Comando para iniciar o aplicativo (serve a versão de build) na porta 8080
CMD ["npm", "start"]
