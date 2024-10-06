import React from 'react';
import './style/About_components.css';

function About() {
  return (
    <div id="about" className="about-container">
      <div className="about-header">
        <h1 className="about-title">Sobre Nós</h1>
      </div>
      <div className="about-content">
        <div className="content-header">
          <i className="fa-solid fa-bars" style={{ color: '#404040', fontSize: '20px', marginRight: '10px' }}></i>
          <h2>Especificação do Projeto: Calculadora de Calorias Integrada com ChatGPT</h2>
        </div>
        <p>
          <strong>Descrição Geral</strong>
          <br />
          Este projeto tem como objetivo desenvolver uma aplicação web interativa que ajuda os usuários a calcular a quantidade de calorias de suas refeições diárias. A aplicação será integrada com a API do ChatGPT para fornecer feedback nutricional personalizado e sugerir opções de alimentos saudáveis. O usuário poderá inserir os ingredientes ou refeições que consumiu, e o sistema calculará o valor calórico total. Além disso, a integração com o ChatGPT permitirá que o sistema forneça sugestões nutricionais adicionais, como substituições alimentares ou dicas para alcançar metas de saúde específicas.
        </p>
        <div className="line"></div>
        <p>
          <strong>Funcionalidades:</strong>
        </p>
        <ul className="functionalities-list">
          <li>Cálculo automático de calorias baseado nos alimentos inseridos pelo usuário.</li>
          <li>Integração com o ChatGPT para fornecer sugestões de refeições e recomendações nutricionais.</li>
          <li>Armazenamento das consultas e respostas em um banco de dados relacional (MySQL ou PostgreSQL) para fins de monitoramento e análise de padrões alimentares.</li>
          <li>Interface intuitiva desenvolvida em React para fácil interação com o usuário.</li>
        </ul>
        <div className="line"></div>
        
        {/* Novo h2 antes do terceiro parágrafo */}
        <div className="content-header">
          <i className="fa-solid fa-bars" style={{ color: '#404040', fontSize: '20px', marginRight: '10px' }}></i>
          <h2>Funcionalidades Detalhadas da Calculadora de Calorias Integrada</h2>
        </div>
        <p>
          <strong>Descrição das Funcionalidades</strong>
          <br />
          A aplicação contará com várias funcionalidades principais voltadas para facilitar o controle de calorias e fornecer suporte nutricional ao usuário:
        </p>
        <div className="line"></div>
        <ul className="functionalities-list">
          <li>
            Inserção de Alimentos: O usuário poderá inserir os alimentos consumidos, e a calculadora retornará o valor calórico de cada item, bem como o valor calórico total da refeição.
          </li>
          <li>
            Sugestões do ChatGPT: Usando a API do ChatGPT, a aplicação oferecerá sugestões de substituições alimentares com base nas preferências do usuário ou metas nutricionais, como reduzir a ingestão de açúcar ou aumentar a ingestão de proteínas.
          </li>
          <li>
            Registro de Consultas: Cada consulta feita pelo usuário, assim como a resposta gerada pelo ChatGPT, será registrada em um banco de dados MySQL/PostgreSQL para posterior análise e acompanhamento.
          </li>
          <li>
            Interface Responsiva: A aplicação terá uma interface construída em React, facilitando a navegação e interação com os dados, proporcionando uma experiência agradável e eficiente.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default About;