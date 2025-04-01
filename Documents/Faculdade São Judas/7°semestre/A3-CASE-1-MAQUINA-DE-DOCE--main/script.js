document.addEventListener('DOMContentLoaded', function() {
    // Variáveis globais
    let saldoAtual = 0;
    let codigoDigitado = '';
    let produtoSelecionado = null;
    const SALDO_MAXIMO = 12.00;
    
    // Elementos DOM
    const displayValor = document.querySelector('.display-valor');
    const displayMensagem = document.querySelector('.display-mensagem');
    const botoesNumericos = document.querySelectorAll('.botao:not(.comprar)');
    const botaoComprar = document.querySelector('.botao.comprar');
    const moedas = document.querySelectorAll('.moeda');
    const doces = document.querySelectorAll('.doce');
    const slotEntrada = document.querySelector('.slot-entrada');
    const compartimentoSaida = document.querySelector('.porta-saida');
    const maquinaContainer = document.querySelector('.maquina-container');
    const trocoArea = document.getElementById('troco-area');
    const trocoMoedas = document.getElementById('troco-moedas');
    
    // Efeitos sonoros
    const criarEfeitoSonoroMoeda = () => {
        const audio = new Audio('https://www.soundjay.com/misc/sounds/coin-drop-1.mp3');
        audio.volume = 0.5;
        return audio;
    };
    
    const criarEfeitoSonoroBotao = () => {
        const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-31.mp3');
        audio.volume = 0.3;
        return audio;
    };
    
    const criarEfeitoSonoroEntrega = () => {
        const audio = new Audio('https://www.soundjay.com/mechanical/sounds/mechanical-clonk-1.mp3');
        audio.volume = 0.7;
        return audio;
    };
    
    const criarEfeitoSonoroTroco = () => {
        const audio = new Audio('https://www.soundjay.com/misc/sounds/coins-in-hand-4.mp3');
        audio.volume = 0.7;
        return audio;
    };

    // Função para atualizar o display
    const atualizarDisplay = () => {
        displayValor.textContent = `R$ ${saldoAtual.toFixed(2).replace('.', ',')}`;
    };

    // Função para atualizar mensagem no display
    const mostrarMensagem = (msg, tempoMS = null) => {
        displayMensagem.textContent = msg;
        
        // Só limpa a mensagem automaticamente se tempoMS for especificado
        if (tempoMS !== null && !msg.includes('Troco: R$')) {
            setTimeout(() => {
                displayMensagem.textContent = '';
            }, tempoMS);
        }
    };

    const inserirMoeda = (valor, elemento) => {
        // Calcula o saldo futuro antes de iniciar qualquer ação
        let novoSaldo = saldoAtual + valor;
    
        // Verifica se o novo saldo ultrapassa o limite
        if (novoSaldo > SALDO_MAXIMO) {
            mostrarMensagem(`Limite de R$ ${SALDO_MAXIMO.toFixed(2).replace('.', ',')} atingido!`, 50000);
            maquinaContainer.style.animation = 'shake 0.5s';
            setTimeout(() => {
                maquinaContainer.style.animation = '';
            }, 500);
            return; // Sai da função sem adicionar a moeda
        }
    
        // Atualiza saldo primeiro, antes da animação
        saldoAtual = novoSaldo;
        atualizarDisplay();
    
        // Agora, executa a animação da moeda normalmente
        const moedaClone = elemento.cloneNode(true);
        moedaClone.classList.add('coin-animation');
    
        if (elemento.classList.contains('moeda-1')) {
            moedaClone.style.background = 'linear-gradient(145deg, #9b59b6 0%, #8e44ad 100%)';
        } else if (elemento.classList.contains('moeda-2')) {
            moedaClone.style.background = 'linear-gradient(145deg, #1abc9c 0%, #16a085 100%)';
        } else if (elemento.classList.contains('moeda-5')) {
            moedaClone.style.background = 'linear-gradient(145deg, #e74c3c 0%, #c0392b 100%)';
        }
    
        maquinaContainer.appendChild(moedaClone);
    
        const moedaRect = elemento.getBoundingClientRect();
        const maquinaRect = maquinaContainer.getBoundingClientRect();
        const slotRect = slotEntrada.getBoundingClientRect();
    
        moedaClone.style.left = `${moedaRect.left - maquinaRect.left}px`;
        moedaClone.style.top = `${moedaRect.top - maquinaRect.top}px`;
    
        setTimeout(() => {
            moedaClone.style.transition = 'all 0.6s cubic-bezier(.17,.67,.83,.67)';
            moedaClone.style.left = `${slotRect.left - maquinaRect.left + slotRect.width / 2 - 20}px`;
            moedaClone.style.top = `${slotRect.top - maquinaRect.top - 10}px`;
    
            setTimeout(() => {
                moedaClone.style.transition = 'all 0.3s ease-in';
                moedaClone.style.top = `${slotRect.top - maquinaRect.top + 15}px`;
                moedaClone.style.transform = 'scale(0.5)';
                moedaClone.style.opacity = '0';
    
                const somMoeda = criarEfeitoSonoroMoeda();
                somMoeda.play();
    
                setTimeout(() => {
                    maquinaContainer.removeChild(moedaClone);
                }, 300);
            }, 600);
        }, 100);
    };
    
    
    // Função melhorada para dar troco com animação
    const darTroco = (valorTroco) => {
        // Limpa a área de troco
        trocoMoedas.innerHTML = '';
        trocoArea.classList.remove('hidden');
        
        // Determina quais moedas serão dadas como troco
        const moedas = [];
        let trocoRestante = valorTroco;
        
        // Primeiro verifica notas de 5
        while (trocoRestante >= 5) {
            moedas.push(5);
            trocoRestante -= 5;
        }
        
        // Depois verifica moedas de 2
        while (trocoRestante >= 2) {
            moedas.push(2);
            trocoRestante -= 2;
        }
        
        // Por fim, adiciona moedas de 1 para o restante
        while (trocoRestante >= 1) {
            moedas.push(1);
            trocoRestante -= 1;
        }
        
        // Se ainda há troco (centavos), aproxima para a próxima moeda de 1
        if (trocoRestante > 0) {
            moedas.push(1);
        }
        
        // Mostrar troco no display
        mostrarMensagem(`Troco: R$ ${valorTroco.toFixed(2).replace('.', ',')}`);
        console.log('Mensagem de troco definida.');
        
        // Efeito sonoro do troco
        const somTroco = criarEfeitoSonoroTroco();
        somTroco.play();
        
        // Animação do troco caindo no compartimento
        moedas.forEach((valor, index) => {
            setTimeout(() => {
                const moedaEl = document.createElement('div');
                moedaEl.className = `troco-moeda moeda-${valor}`;
                
                // Adiciona classe de animação
                moedaEl.classList.add('troco-moeda-animation');
                
                // Adiciona um leve deslocamento aleatório para parecer mais natural
                const randomRotate = Math.floor(Math.random() * 20) - 10;
                moedaEl.style.transform = `rotate(${randomRotate}deg)`;
                
                moedaEl.innerHTML = `<span>R$${valor}</span>`;
                trocoMoedas.appendChild(moedaEl);
                
                // Remover classe de animação após a conclusão
                setTimeout(() => {
                    moedaEl.classList.remove('troco-moeda-animation');
                }, 800);
                
            }, index * 200); // Aumentado o intervalo entre cada moeda caindo
        });
    };
        
        // Evento para o botão de coletar troco
        document.getElementById('coletar-troco').addEventListener('click', function() {
            // Efeito sonoro
            const somTroco = criarEfeitoSonoroTroco();
            somTroco.play();
            
            // Animação de confete
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.className = 'troco-confetti';
                    
                    // Cores variadas
                    const colors = ['#f39c12', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6'];
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    
                    // Posição aleatória
                    confetti.style.left = `${Math.random() * 100}%`;
                    
                    // Atraso na animação
                    confetti.style.animationDelay = `${Math.random() * 0.5}s`;
                    
                    trocoArea.appendChild(confetti);
                    
                    // Remover após a animação
                    setTimeout(() => {
                        trocoArea.removeChild(confetti);
                    }, 1500);
                }, i * 50);
            }
            
            // MENSAGEM É REMOVIDA SÓ QUANDO O USUÁRIO COLETA O TROCO
            document.getElementById('coletar-troco').addEventListener('click', function() {
    const somTroco = criarEfeitoSonoroTroco();
    somTroco.play();

    trocoArea.classList.add('hidden');
    mostrarMensagem(''); // REMOVE A MENSAGEM SOMENTE AGORA
});

        });


    // Função para processar input do teclado
    const processarTeclado = (botao) => {
        // Toca som de botão
        const somBotao = criarEfeitoSonoroBotao();
        somBotao.play();
        
        const valor = botao.textContent;
        
        if (valor === '←') {
            // Limpar código
            codigoDigitado = '';
            mostrarMensagem('Produto desmarcado', 30000);
            // Desseleciona produto
            if (produtoSelecionado) {
                produtoSelecionado.classList.remove('selected');
                produtoSelecionado = null;
            }
        } else if (valor === 'C') {
            // Apagar último dígito
            codigoDigitado = codigoDigitado.slice(0, -1);
            if (codigoDigitado) {
                mostrarMensagem(`Opções selecionadas: ${codigoDigitado}`);
            } else {
                mostrarMensagem('');
            }
        } else {
            // Adicionar dígito (máximo 2 dígitos)
            if (codigoDigitado.length < 2) {
                codigoDigitado = valor;
                mostrarMensagem(`Opções selecionadas: ${codigoDigitado}`);
                
                // Verifica se o código corresponde a algum produto
                const codigo = parseInt(codigoDigitado);
                const produto = document.querySelector(`.doce[data-codigo="${codigo}"]`);
                
                // Desseleciona produto anterior se houver
                if (produtoSelecionado) {
                    produtoSelecionado.classList.remove('selected');
                    produtoSelecionado = null;
                }
                
                // Seleciona o novo produto se existir
                if (produto) {
                    produto.classList.add('selected');
                    produtoSelecionado = produto;
                    mostrarMensagem(`Selecionado: ${produto.querySelector('.doce-nome').textContent}`);
                }
            }
        }
    };

    // Função para comprar produto
    const comprarProduto = () => {
        // Toca som de botão para o clique em COMPRAR
        const somBotao = criarEfeitoSonoroBotao();
        somBotao.play();
        
        // Verifica se existe um produto selecionado
        if (!produtoSelecionado) {
            // Verifica se há um código digitado
            if (codigoDigitado) {
                mostrarMensagem('Código inválido!', 2500);
            } else {
                mostrarMensagem('Selecione um produto!', 25000);
            }
            
            maquinaContainer.style.animation = 'shake 0.5s';
            setTimeout(() => {
                maquinaContainer.style.animation = '';
            }, 500);
            return;
        }
        
        const preco = parseFloat(produtoSelecionado.dataset.preco);
        
        // Verifica se há saldo suficiente
        if (saldoAtual < preco) {
            mostrarMensagem(`Faltam R$ ${(preco - saldoAtual).toFixed(2).replace('.', ',')}`, 2500);
            maquinaContainer.style.animation = 'shake 0.5s';
            setTimeout(() => {
                maquinaContainer.style.animation = '';
            }, 500);
            return;
        }
        
        // Calcula o troco
        const troco = saldoAtual - preco;
        
        // Sucesso na compra
        saldoAtual = 0; // Zera o saldo
        atualizarDisplay();
        
        // Mostra mensagem de sucesso
        const nomeDoce = produtoSelecionado.querySelector('.doce-nome').textContent;
        mostrarMensagem(`${nomeDoce} entregue!`, 30000);
        
        // Animação de entrega do produto
        const imgDoce = produtoSelecionado.querySelector('img');
        const imgDoceClone = imgDoce.cloneNode(true);
        imgDoceClone.classList.add('doce-entregue');
        compartimentoSaida.appendChild(imgDoceClone);
        
        // Anima queda do doce
        imgDoceClone.style.animation = 'doceQueda 1s forwards';
        
        // Toca som de entrega
        setTimeout(() => {
            const somEntrega = criarEfeitoSonoroEntrega();
            somEntrega.play();
        }, 800);
        
        // Se houver troco, exibe
        if (troco > 0) {
            setTimeout(() => {
                darTroco(troco);
            }, 1500);
        }
        
        // Limpa após animação
        setTimeout(() => {
            compartimentoSaida.removeChild(imgDoceClone);
            produtoSelecionado.classList.remove('selected');
            produtoSelecionado = null;
            codigoDigitado = '';
        }, 3000);
    };

    // Event Listeners
    
    // Botões numéricos e de controle
    botoesNumericos.forEach(botao => {
        botao.addEventListener('click', () => {
            processarTeclado(botao);
        });
    });
    
    // Botão de compra
    botaoComprar.addEventListener('click', comprarProduto);
    
    // Moedas
    moedas.forEach(moeda => {
        moeda.addEventListener('click', () => {
            const valor = parseFloat(moeda.dataset.valor);
            inserirMoeda(valor, moeda);
        });
    });
    
    // Clique direto nos doces
    doces.forEach(doce => {
        doce.addEventListener('click', () => {
            const codigo = doce.dataset.codigo;
            codigoDigitado = codigo;
            
            // Desseleciona produto anterior
            if (produtoSelecionado) {
                produtoSelecionado.classList.remove('selected');
            }
            
            // Seleciona o novo produto
            doce.classList.add('selected');
            produtoSelecionado = doce;
            
            // Toca som de botão para feedback de seleção
            const somBotao = criarEfeitoSonoroBotao();
            somBotao.play();
            
            // Mostra a mensagem sem timeout para que ela permaneça
            mostrarMensagem(`Selecionado: ${doce.querySelector('.doce-nome').textContent}`);
        });
    });
    
    // Inicializa o display
    atualizarDisplay();
});