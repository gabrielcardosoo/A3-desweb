import React, { useState, useEffect } from 'react';
import './style/HistoryPage.css';

const HistoryPage = ({ user, fetchLogs }) => {
  const [logs, setLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const logsData = await fetchLogs();
      console.log('Logs carregados:', logsData);
      setLogs(logsData);
      
    } catch (error) {
      console.error('Erro ao carregar logs:', error);
      setError(error.message || 'Erro ao carregar histórico');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  const extractResultText = (resultString) => {
    try {
      // Parse do resultado que está em formato string
      const resultObj = JSON.parse(resultString);
      
      // Navegando através do objeto até chegar no text
      return resultObj.response.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Erro ao extrair texto do resultado:', error);
      return 'Erro ao processar resultado';
    }
  };


  const renderIngredients = (ingredientesString) => {
    try {
      const ingredientes = ingredientesString;
      console.log('Ingredientes:', ingredientes);
      return (
        <div className="ingredients-list">
          {ingredientes.map((ingrediente, index) => (
            <div key={index} className="ingredient-item">
              <span className="ingredient-name">{ingrediente.name}</span>
              <span className="ingredient-amount">{ingrediente.quantity} g</span>
            </div>
          ))}
        </div>
      );
    } catch (error) {
      console.error('Erro ao processar ingredientes:', error);
      return <p>Erro ao processar ingredientes</p>;
    }
  };

  if (loading) {
    return (
      <div className="history-container">
        <div className="loading-state">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="history-container">
        <div className="alert alert-danger">
          <p>{error}</p>
          <button 
            className="btn btn-outline-danger mt-2"
            onClick={loadLogs}
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="history-container">
      <div className="history-header">
        <h2>Histórico de Análises</h2>
      </div>

      <div className="history-content">
        {logs.length === 0 ? (
          <div className="alert alert-info">
            Nenhum registro encontrado.
          </div>
        ) : (
          <div className="logs-list">
            <select
              className="form-select mb-4"
              value={selectedLog ? selectedLog.id : ''}
              onChange={(e) => {
                const selected = logs.find(log => log.id.toString() === e.target.value);
                setSelectedLog(selected);
              }}
            >
              <option value="">Selecione uma análise...</option>
              {logs.map(log => (
                <option key={log.id} value={log.id}>
                  {formatDate(log.datetime)}
                </option>
              ))}
            </select>

            {selectedLog && (
              <div className="log-details card">
                <div className="card-body">
                  <h5 className="card-title">Detalhes da Análise</h5>
                  <div className="log-info">
                    <p><strong>Data:</strong> {formatDate(selectedLog.datetime)}</p>
                    
                    {selectedLog.image && (
                      <div className="image-section mb-4">
                        <h6>Imagem Analisada:</h6>
                        <img 
                          src={selectedLog.image} 
                          alt="Alimento analisado" 
                          className="analysis-image"
                        />
                      </div>
                    )}
                    
                    <div className="ingredients-section mb-4">
                      <h6>Ingredientes:</h6>
                      {renderIngredients(selectedLog.ingredientes)}
                    </div>

                    
                    {selectedLog.result && (
                      <div className="result-section">
                        <h6>Calorias Totais:</h6>
                        <div className="result-content">
                          <span className="calories-value">
                            {extractResultText(selectedLog.result)} kcal
                          </span>
                        </div>
                      </div>
                    )} 
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;