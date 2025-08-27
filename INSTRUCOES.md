# INSTRUÇÕES DO PROJETO: Correção de Testes Neuropsicológicos

## Visão Geral
Projeto fullstack com backend em Java (Spring Boot) e frontend em React, integrando autenticação segura via AWS Cognito. Layout moderno, responsivo e pronto para produção.

---

## 1. Pré-requisitos
- Node.js e npm instalados
- Java 21+
- Conta AWS (Cognito)
- Git (opcional)

---

## 2. Estrutura do Projeto
```
laudos/ (raiz)
├── frontend/           # React (interface)
├── src/main/java/      # Backend Java Spring Boot
├── src/main/resources/ # Configurações backend
├── ...
```

---

## 3. Configuração do Backend (Java + Spring Boot)

### Dependências principais (no pom.xml):
- spring-boot-starter-web
- spring-boot-starter-security
- spring-boot-starter-oauth2-resource-server
- jjwt-api, jjwt-impl, jjwt-jackson

### Configuração Cognito (src/main/resources/application.properties):
```
spring.security.oauth2.resourceserver.jwt.jwk-set-uri=https://cognito-idp.us-east-1.amazonaws.com/SEU_USER_POOL_ID/.well-known/jwks.json
```

### Comando para rodar o backend:
No terminal, na raiz do projeto:
```
./mvnw spring-boot:run
```
No Windows:
```
.\mvnw.cmd spring-boot:run
```

---

## 4. Configuração do Frontend (React)

### Instalar dependências:
```
cd frontend
npm install
npm install bootstrap@5 aws-amplify @aws-amplify/ui-react
```

### Configuração do Amplify (frontend/src/amplifyConfig.js):
```js
import { Amplify } from 'aws-amplify';
Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'SEU_USER_POOL_ID',
    userPoolWebClientId: 'SEU_CLIENT_ID',
    authenticationFlowType: 'USER_PASSWORD_AUTH',
  },
});
```

### Importar configuração no index.js:
```js
import './amplifyConfig';
```

### Comando para rodar o frontend:
```
npm start
```

---

## 5. Integração Cognito (Login Customizado)
- O login/cadastro é feito via AWS Amplify, usando seu próprio layout React.
- O backend só aceita requisições autenticadas com JWT do Cognito.

---

## 6. Testando a autenticação
1. Inicie backend e frontend.
2. Acesse o site, faça login com usuário Cognito.
3. Teste rotas protegidas: só acessíveis com token válido.

---

## 7. Principais comandos úteis
- Instalar dependências backend: `./mvnw clean install -DskipTests`
- Instalar dependências frontend: `npm install`
- Rodar backend: `./mvnw spring-boot:run` ou `.\mvnw.cmd spring-boot:run`
- Rodar frontend: `npm start`

---

## 8. Observações
- Para produção, configure variáveis de ambiente e URLs corretas.
- O Cognito pode ser customizado para login por e-mail ou telefone.
- O layout do frontend pode ser totalmente personalizado.

---

## 9. Referências
- [Documentação AWS Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html)
- [Documentação AWS Amplify](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/)
- [Spring Security JWT](https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/jwt.html)

---

> **Dúvidas ou problemas?**
> Consulte este arquivo ou a documentação oficial das ferramentas acima.
