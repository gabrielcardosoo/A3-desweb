import React from 'react';
import '../components/style/SobreNos.css'; // Você precisará criar este arquivo CSS

const SobreNos = () => {
  const funcionalidades = [
    {
      icone: (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon-sobre" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
          <line x1="8" y1="12" x2="16" y2="12"></line>
          <line x1="12" y1="8" x2="12" y2="16"></line>
        </svg>
      ),
      titulo: "Cálculo de Calorias",
      descricao: "Cálculo automático de calorias baseado nos alimentos inseridos pelo usuário."
    },
    {
      icone: (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon-sobre" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9"></circle>
          <path d="M8 12h8"></path>
          <path d="M12 8v8"></path>
        </svg>
      ),
      titulo: "Integração com ChatGPT",
      descricao: "Integração com o ChatGPT para fornecer sugestões de refeições e recomendações nutricionais."
    },
    {
      icone: (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon-sobre" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
          <path d="M2 17l10 5 10-5"></path>
          <path d="M2 12l10 5 10-5"></path>
        </svg>
      ),
      titulo: "Armazenamento de Dados",
      descricao: "Armazenamento das consultas e respostas em um banco de dados relacional (MySQL ou PostgreSQL) para fins de monitoramento e análise de padrões alimentares."
    },
    {
      icone: (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon-sobre" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12" y2="18"></line>
        </svg>
      ),
      titulo: "Interface Intuitiva",
      descricao: "Interface intuitiva desenvolvida em React para fácil interação com o usuário."
    }
  ];

  return (
    <div id="About" className="sobre-nos">
      <div className="container-sobre">
        <h1 className="title-sobre">Sobre Nós</h1>
        
        <div className="descricao-card">
          <h2>Descrição Geral</h2>
          <p>
            Este projeto tem como objetivo desenvolver uma aplicação web interativa que ajuda os usuários a calcular a quantidade de calorias de suas refeições diárias. A aplicação será integrada com a API do ChatGPT para fornecer feedback nutricional personalizado e sugerir opções de alimentos saudáveis. O usuário poderá inserir os ingredientes ou refeições que consumiu, e o sistema calculará o valor calórico total. Além disso, a integração com o ChatGPT permitirá que o sistema forneça sugestões nutricionais adicionais, como substituições alimentares ou dicas para alcançar metas de saúde específicas.
          </p>
        </div>

        <h2 className="subtitle">Funcionalidades Principais</h2>
        <div className="grid-container">
          <div className="column">
            <div className="card">
              <div className="card-header">
                {funcionalidades[0].icone}
                <h3>{funcionalidades[0].titulo}</h3>
              </div>
              <p>{funcionalidades[0].descricao}</p>
            </div>
            
            <div className="card">
              <div className="card-header">
                {funcionalidades[2].icone}
                <h3>{funcionalidades[2].titulo}</h3>
              </div>
              <p>{funcionalidades[2].descricao}</p>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <div className="card-header">
                {funcionalidades[1].icone}
                <h3>{funcionalidades[1].titulo}</h3>
              </div>
              <p>{funcionalidades[1].descricao}</p>
            </div>
            
            <div className="card">
              <div className="card-header">
                {funcionalidades[3].icone}
                <h3>{funcionalidades[3].titulo}</h3>
              </div>
              <p>{funcionalidades[3].descricao}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SobreNos;