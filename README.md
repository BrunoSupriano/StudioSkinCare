# StudioSkinCare
- Projeto de sistema web

## Como rodar o projeto

### Pré-requisitos

- Editor de Código
- Postgres
- Node
- Npm
- Java
- Maven
- SpringBoot

### Banco de dados (Postgres)

- Abra o postgres no PgAdmin e crie um server, defina uma `senha` e crie um banco de dados chamado preferencialmente de `DGC`, após a criação clique com o botão direito > QueryTool, no editor de código cole o texto do arquivo `StudioSkinCare\SQL\DGK SQL.sql` deste repositorio e execute o mesmo.

O Script fará a criação dos dados iniciais bem como as tabelas e relacionamentos

### Back-End (Java)

- Configure o banco no arquivo localizado em `StudioSkinCare\DGSBackEnd\src\main\resources\application.properties` deste repositorio, nele virão os dados abaixo como padrão:

```java
spring.application.name=DGC /*Nome do Banco*/
spring.datasource.url=jdbc:postgresql://localhost:5432/DGC /*Configuração padrão de localhost postgres + Nome do banco*/
spring.datasource.username=postgres /*Nome de usuário padrão postgres*/
spring.datasource.password=BMS2303 /*Senha criada por você no inicio da criação do banco de dados postgres*/
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

```

- Rode o DgcAplication.java com o seu editor de código o mesmo está localizado no seguinte caminho

 `STUDIOSKINCARE/DGSBackEnd/src/java/com/example/dgc/DgcApplication`


### Front-End

- Na pastas raiz do projeto rode o comando abaixo em um novo terminal do editor de código

`npm run dev`



