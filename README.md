<h1>🛒 Br.OrderManagement.Web</h1>

<p>
  Front-end do sistema <strong>Br.OrderManagement</strong>, desenvolvido em
  <strong>Angular 20</strong>, responsável pelo gerenciamento de produtos e
  pedidos de uma pequena loja.
</p>

<p>
  A aplicação consome uma API REST desenvolvida em <strong>.NET 9</strong>,
  organizada com princípios de <strong>DDD</strong>, <strong>SOLID</strong> e
  separação de responsabilidades.
</p>

<hr>

<h2>🚀 Tecnologias utilizadas</h2>

<ul>
  <li>Angular 20</li>
  <li>TypeScript</li>
  <li>RxJS</li>
  <li>Bootstrap 5</li>
  <li>Bootstrap Icons</li>
  <li>HTML5</li>
  <li>CSS3</li>
</ul>

<hr>

<h2>📋 Funcionalidades</h2>

<h3>Produtos</h3>

<ul>
  <li>Listagem de produtos</li>
  <li>Cadastro de produtos</li>
  <li>Edição de produtos</li>
  <li>Exclusão de produtos</li>
  <li>Upload e visualização de imagem</li>
  <li>Controle da quantidade em estoque</li>
  <li>Mensagens de sucesso, alerta e erro</li>
</ul>

<h3>Pedidos</h3>

<ul>
  <li>Criação de pedidos</li>
  <li>Adição de múltiplos produtos</li>
  <li>Validação da quantidade disponível em estoque</li>
  <li>Cálculo automático do valor total</li>
  <li>Listagem de pedidos</li>
  <li>Visualização dos itens de um pedido</li>
  <li>Confirmação de pedidos</li>
  <li>Cancelamento de pedidos</li>
  <li>Finalização de pedidos</li>
</ul>

<hr>

<h2>📂 Estrutura do projeto</h2>

<pre>
src/
├── app/
│   ├── core/
│   │   └── interceptors/
│   ├── features/
│   │   ├── products/
│   │   │   ├── models/
│   │   │   ├── pages/
│   │   │   └── services/
│   │   └── orders/
│   │       ├── models/
│   │       ├── pages/
│   │       └── services/
│   ├── layout/
│   │   ├── navbar/
│   │   └── sidebar/
│   └── shared/
│       ├── components/
│       ├── models/
│       └── services/
└── environments/
</pre>

<hr>

<h2>⚙️ Pré-requisitos</h2>

<p>Para executar o projeto, é necessário possuir:</p>

<ul>
  <li>Node.js instalado</li>
  <li>NPM instalado</li>
  <li>Angular CLI 20 ou superior</li>
  <li>.NET SDK 9 para executar o back-end</li>
  <li>SQL Server</li>
</ul>

<p>Para verificar as versões instaladas:</p>

<pre>
node --version
npm --version
ng version
dotnet --version
</pre>

<hr>

<h2>▶️ Como configurar e executar o back-end</h2>

<h3>1. Clonar o repositório do back-end</h3>

<pre>
git clone https://github.com/SEU_USUARIO/Br.OrderManagement.API.git
</pre>

<h3>2. Acessar a pasta da solução</h3>

<pre>
cd Br.OrderManagement.API
</pre>

<h3>3. Configurar a conexão com o SQL Server</h3>

<p>
  No projeto <strong>Br.OrderManagement.API</strong>, localize o arquivo
  <code>appsettings.json</code> e configure a connection string:
</p>

<pre>
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=BrOrderManagementDb;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=True"
  }
}
</pre>

<p>Para autenticação com usuário e senha:</p>

<pre>
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=BrOrderManagementDb;User Id=sa;Password=SuaSenha;TrustServerCertificate=True"
  }
}
</pre>

<h3>4. Restaurar as dependências</h3>

<pre>
dotnet restore
</pre>

<h3>5. Criar ou atualizar o banco de dados</h3>

<p>Executando pela CLI do Entity Framework:</p>

<pre>
dotnet ef database update --project Br.OrderManagement.Repository --startup-project Br.OrderManagement.API
</pre>

<h3>6. Executar a API</h3>

<pre>
dotnet run --project Br.OrderManagement.API
</pre>

<p>
  Após iniciar, confira no terminal a URL HTTPS disponibilizada pela aplicação.
  O Swagger poderá ser acessado normalmente em:
</p>

<pre>
https://localhost:PORTA/swagger
</pre>

<hr>

<h2>▶️ Como configurar e executar o front-end</h2>

<h3>1. Clonar o repositório</h3>

<pre>
git clone https://github.com/SEU_USUARIO/br-order-management-web.git
</pre>

<h3>2. Acessar a pasta do projeto</h3>

<pre>
cd br-order-management-web
</pre>

<h3>3. Instalar as dependências</h3>

<pre>
npm install
</pre>

<h3>4. Configurar a URL da API</h3>

<p>Edite o arquivo:</p>

<pre>
src/environments/environment.ts
</pre>

<p>Configure a propriedade <code>apiUrl</code> com o endereço da API:</p>

<pre>
export const environment = {
  production: false,
  apiUrl: 'https://localhost:PORTA/api'
};
</pre>

<p>
  A porta deve ser a mesma apresentada pelo back-end durante a execução.
</p>

<h3>5. Executar a aplicação Angular</h3>

<pre>
npm start
</pre>

<p>Também é possível executar com:</p>

<pre>
ng serve
</pre>

<p>A aplicação ficará disponível em:</p>

<pre>
http://localhost:4200
</pre>

<hr>

<h2>🔄 Ordem recomendada de execução</h2>

<ol>
  <li>Iniciar o SQL Server.</li>
  <li>Executar as migrations do Entity Framework.</li>
  <li>Iniciar a API .NET.</li>
  <li>Confirmar que o Swagger está respondendo.</li>
  <li>Configurar a URL da API no arquivo de ambiente do Angular.</li>
  <li>Executar o front-end com <code>npm start</code>.</li>
</ol>

<hr>

<h2>✔️ Regras de negócio implementadas</h2>

<ul>
  <li>Um pedido não pode ser criado sem ao menos um item.</li>
  <li>A quantidade de um item não pode ultrapassar o estoque disponível.</li>
  <li>O valor total do pedido é calculado automaticamente.</li>
  <li>A criação do pedido não altera o estoque.</li>
  <li>A confirmação do pedido reduz o estoque dos produtos.</li>
  <li>O cancelamento de um pedido confirmado restaura o estoque.</li>
  <li>O cancelamento de um pedido apenas criado não altera o estoque.</li>
  <li>A finalização não altera novamente o estoque.</li>
  <li>Somente pedidos confirmados podem ser finalizados.</li>
  <li>Pedidos finalizados não podem ser alterados ou cancelados.</li>
</ul>

<hr>

<h2>💬 Mensagens e tratamento de erros</h2>

<p>
  A aplicação possui um componente global para apresentação de mensagens ao
  usuário.
</p>

<p>Os tipos disponíveis são:</p>

<ul>
  <li>Sucesso</li>
  <li>Alerta</li>
  <li>Erro</li>
  <li>Informação</li>
</ul>

<p>
  Também foi implementado um interceptor HTTP para capturar erros retornados
  pela API e exibir mensagens padronizadas no front-end.
</p>

<p>Exemplos tratados:</p>

<ul>
  <li>Erro de validação</li>
  <li>Recurso não encontrado</li>
  <li>Conflito de operação</li>
  <li>Falha de conexão com a API</li>
  <li>Erro interno do servidor</li>
</ul>

<hr>

<h2>🏛️ Decisões técnicas relevantes</h2>

<h3>Standalone Components</h3>

<p>
  Foram utilizados componentes standalone do Angular, reduzindo a necessidade
  de módulos e tornando o carregamento das páginas mais simples.
</p>

<h3>Organização por funcionalidade</h3>

<p>
  O código foi organizado por feature, mantendo Produtos e Pedidos separados
  em suas próprias pastas de modelos, serviços e páginas.
</p>

<h3>Lazy loading</h3>

<p>
  As páginas são carregadas por meio de rotas com
  <code>loadComponent</code>, evitando o carregamento inicial de componentes
  que ainda não estão sendo utilizados.
</p>

<h3>Services para comunicação com a API</h3>

<p>
  As chamadas HTTP foram centralizadas em serviços, evitando acesso direto ao
  <code>HttpClient</code> dentro dos componentes de tela.
</p>

<h3>Componentização</h3>

<p>
  O formulário de produto foi desenvolvido em um componente separado,
  reutilizado tanto no cadastro quanto na edição.
</p>

<h3>Tratamento global de erros</h3>

<p>
  Um interceptor HTTP centraliza o tratamento de falhas da API e reduz a
  repetição de blocos de erro nos componentes.
</p>

<h3>Signals para mensagens globais</h3>

<p>
  O estado das mensagens foi implementado com signals, permitindo atualização
  reativa e centralizada da interface.
</p>

<h3>Bootstrap</h3>

<p>
  O Bootstrap foi utilizado para acelerar a criação de uma interface
  responsiva e consistente, mantendo o foco principal nas funcionalidades e na
  arquitetura.
</p>

<h3>Validação no front-end e no back-end</h3>

<p>
  Algumas validações são executadas no Angular para melhorar a experiência do
  usuário, enquanto as regras de negócio permanecem protegidas pelo back-end.
</p>

<h3>Controle de estoque no back-end</h3>

<p>
  As alterações de estoque são realizadas pelo back-end durante os fluxos de
  confirmação e cancelamento, garantindo que a regra não dependa apenas da
  interface.
</p>

<hr>

<h2>🔌 Principais endpoints consumidos</h2>

<table>
  <thead>
    <tr>
      <th>Método</th>
      <th>Endpoint</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GET</td>
      <td><code>/api/products</code></td>
      <td>Lista os produtos.</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/api/products/{id}</code></td>
      <td>Consulta um produto.</td>
    </tr>
    <tr>
      <td>POST</td>
      <td><code>/api/products</code></td>
      <td>Cadastra um produto.</td>
    </tr>
    <tr>
      <td>PUT</td>
      <td><code>/api/products/{id}</code></td>
      <td>Atualiza um produto.</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td><code>/api/products/{id}</code></td>
      <td>Exclui um produto.</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/api/orders</code></td>
      <td>Lista os pedidos.</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/api/orders/{id}</code></td>
      <td>Consulta um pedido.</td>
    </tr>
    <tr>
      <td>POST</td>
      <td><code>/api/orders</code></td>
      <td>Cria um pedido.</td>
    </tr>
    <tr>
      <td>PUT</td>
      <td><code>/api/orders/{id}/confirm</code></td>
      <td>Confirma o pedido e reduz o estoque.</td>
    </tr>
    <tr>
      <td>PUT</td>
      <td><code>/api/orders/{id}/cancel</code></td>
      <td>Cancela o pedido e restaura o estoque quando necessário.</td>
    </tr>
    <tr>
      <td>PUT</td>
      <td><code>/api/orders/{id}/finish</code></td>
      <td>Finaliza um pedido confirmado.</td>
    </tr>
  </tbody>
</table>

<hr>

<h2>🧪 Fluxo sugerido para testes</h2>

<ol>
  <li>Cadastrar um produto com estoque disponível.</li>
  <li>Criar um pedido utilizando esse produto.</li>
  <li>Confirmar que o estoque ainda não foi alterado durante a criação.</li>
  <li>Confirmar o pedido e validar a redução do estoque.</li>
  <li>Criar outro pedido e cancelá-lo antes da confirmação.</li>
  <li>Confirmar que o estoque permaneceu inalterado.</li>
  <li>Confirmar um pedido e depois cancelá-lo.</li>
  <li>Validar que o estoque foi restaurado.</li>
  <li>Confirmar e finalizar um pedido.</li>
  <li>Tentar cancelar o pedido finalizado e validar o bloqueio.</li>
</ol>

<hr>
