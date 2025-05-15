# projeto-integrador-3-univesp-2025

Projeto Integrador 3 para o curso de Tecnologia da Informação da faculdade UNIVESP (2025)

# Projeto Integrador III

Projeto Integrador III - Grupo 006 - UNIVESP

Tema: Desenvolver um software com framework web ou aplicativo que utilize banco de dados, inclua script web (Javascript), nuvem, acessibilidade, controle de versão, integração contínua e testes. Incluir um dos seguintes requisitos: uso e fornecimento de API, análises de dados e IoT


## Índice

<!--ts-->
- [projeto-integrador-3-univesp-2025](#projeto-integrador-3-univesp-2025)
- [Projeto Integrador III](#projeto-integrador-iii)
  - [Índice](#índice)
    - [Requisitos iniciais](#requisitos-iniciais)
    - [Ambiente de desenvolvimento](#ambiente-de-desenvolvimento)
      - [Rodar o Projeto Backend](#rodar-o-projeto-backend)
      - [Rodar o Projeto Frontend](#rodar-o-projeto-frontend)
    - [Projeto](#projeto)
      - [Backend](#backend)
      - [CMS](#cms)
<!--te-->


### Requisitos iniciais

- Baixe o VS Code: https://code.visualstudio.com/download
- Baixe o git: https://git-scm.com/downloads
- Baixe o Python: https://www.python.org/downloads/
- Baixe o Node js: https://nodejs.org/pt

### Ambiente de desenvolvimento

Faça o clone do repositório via https ou ssh. Abra o terminal em qualquer pasta que queira manter o projeto e digite: 
- ```git clone https://github.com/ricardocanedo/projeto-integrador-3-univesp-2025.git``` para clone via https
- ```git clone git@github.com:ricardocanedo/projeto-integrador-3-univesp-2025.git``` para clone via ssh

Com o projeto em sua máquina, crie um ambiente virtual na raiz da pasta /backend
```
cd .\backend\
python -m venv venv
. venv/Scrpits/activate
```

Caso o ambiente virtual não seja iniciado no Windows, abra o PowerShell como administrador e execute o comando
```
Set-ExecutionPolicy AllSigned -Force
```

Instale todas as dependências do arquivo ```requirements.txt```
```
pip install -r requirements.txt
```

Faça as migrações necessárias para a base de dados do Django
```
python manage.py makemigrations
python manage.py migrate
```

Crie o superuser do Django
```
python manage.py createsuperuser
```

#### Rodar o Projeto Backend

Se o ambiente ainda não estiver inicializado inicialize no terminal com o seguinte comando
```
. .\venv\Scripts\activate
````

Rode o servidor do Django
```
python manage.py runserver 
```

Acesse a URL ```http://localhost:8000/admin/``` e faça o login com seu superuser


Abra um novo terminal e vá até a pasta /cms

```
cd .\cms\
```

Instale todas as dependências do React JS

```
npm i
```

#### Rodar o Projeto Frontend

Rode o servidor Next

```
npm run dev
```

Acesse a URL ```http://localhost:3000```

### Projeto

O projeto é um site com um sistema de blog.

#### Backend

Dividimos o projeto do backend em dois apps: `common` e `blog`. O app common terá classes e funções genéricas, comuns a qualquer outro app. Já o app blog será responsável por gerir todas as entidades e regras de negócio do projeto.

Para cada nova entidade (tabela) referente ao app, crie uma pasta em `/backend/apps/<nome_app>/<nome_entidade>` e crie todos os arquivos necessários

```
__init__.py
filters.py
models.py
selector.py
serializers.py
services.py
tests.py
urls.py
views.py
```

Na raiz do app `backend/apps/blog/`existem os arquivos `admin.py` e `urls.py` que gerenciam todas as entidades no admin do django e as urls do app.

Toda vez que for criada ou edtiada alguma entidade (models.py), faça a migração.

```
python manage.py makemigrations
python manage.py migrate
```

Para rodar os testes do Backend

```
cd .\backend\
pytest
```

#### CMS

A estrutura de pastas do projeto se concentra em `\src`:

```
components
config
contexts
hooks
pages
```

A pasta `components` deve conter todos os componentes que podem ser reutilizáveis, como por exemplo botões, listagens, tags, etc. 
