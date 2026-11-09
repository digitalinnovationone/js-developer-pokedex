# Trilha JS Developer - Pokedex
# Pokédex Web - Consumo de API REST 🔴⚪

Este projeto é uma aplicação web desenvolvida para consumir e renderizar dados da [PokéAPI](https://pokeapi.co/), demonstrando a manipulação de requisições assíncronas e o tratamento de dados estruturados em JSON.

## 🎯 Objetivo do Projeto
O foco principal deste desenvolvimento foi a **integração de sistemas via API REST**. O projeto vai além da interface visual, lidando com:
- Paginação de resultados recebidos do back-end.
- Resolução de múltiplas requisições assíncronas simultâneas.
- Mapeamento e transformação de payloads complexos (JSON) em objetos manipuláveis pelas regras de negócio da aplicação.

## 🛠️ Tecnologias e Conceitos Aplicados
- **JavaScript (ES6+):** Uso intenso de *Fetch API*, *Promises* (incluindo `Promise.all`), *Arrow Functions* e métodos de array (`map`, `join`).
- **Arquitetura:** Separação de responsabilidades (classes de modelo para estruturar os dados da API e serviços dedicados para requisições web).
- **Front-end:** HTML5 e CSS3 (Grid e Flexbox) para renderização dinâmica dos dados injetados pelo JavaScript.

## 🚀 Como testar
1. Clone este repositório.
2. Abra o arquivo `index.html` no seu navegador ou utilize a extensão Live Server.
3. Inspecione a aba *Network* no navegador para visualizar o tráfego de dados no formato JSON sendo consumido da API.
