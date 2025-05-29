// Função para setar cookie
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days*864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}

// Função para ler cookie
function getCookie(name) {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r
  }, '');
}

// Tela de login
if (document.getElementById('loginForm')) {
  const form = document.getElementById('loginForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    if (username) {
      localStorage.setItem('user', username);
      setCookie('ultimoAcesso', new Date().toLocaleString(), 7);
      window.location.href = 'cadastro.html';
    }
  });
}

// Tela de cadastro
if (document.getElementById('produtoForm')) {
  const user = localStorage.getItem('user');
  if (!user) {
    alert('Você precisa fazer login.');
    window.location.href = 'index.html';
  } else {
    document.getElementById('welcome').innerText = `Bem-vindo, ${user}!`;
    document.getElementById('ultimoAcesso').innerText = `Último acesso: ${getCookie('ultimoAcesso') || 'Primeiro acesso'}`;
    setCookie('ultimoAcesso', new Date().toLocaleString(), 7);

    let produtos = JSON.parse(localStorage.getItem('produtos') || '[]');

    function renderTabela() {
      const tbody = document.querySelector('#tabelaProdutos tbody');
      tbody.innerHTML = '';
      produtos.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${p.codigo}</td>
          <td>${p.descricao}</td>
          <td>${p.precoCusto}</td>
          <td>${p.precoVenda}</td>
          <td>${p.validade}</td>
          <td>${p.qtd}</td>
          <td>${p.fabricante}</td>
        `;
        tbody.appendChild(tr);
      });
    }

    renderTabela();

    const form = document.getElementById('produtoForm');
    form.addEventListener('submit', e => {
      e.preventDefault();

      const precoCustoVal = parseFloat(document.getElementById('precoCusto').value);
      const precoVendaVal = parseFloat(document.getElementById('precoVenda').value);
      const qtdVal = parseInt(document.getElementById('qtd').value);

      if (isNaN(precoCustoVal) || isNaN(precoVendaVal) || isNaN(qtdVal)) {
        alert('Informe valores numéricos válidos para preços e quantidade.');
        return;
      }

      const novoProduto = {
        codigo: document.getElementById('codigo').value.trim(),
        descricao: document.getElementById('descricao').value.trim(),
        precoCusto: precoCustoVal.toFixed(2),
        precoVenda: precoVendaVal.toFixed(2),
        validade: document.getElementById('validade').value,
        qtd: qtdVal,
        fabricante: document.getElementById('fabricante').value.trim()
      };
      produtos.push(novoProduto);
      localStorage.setItem('produtos', JSON.stringify(produtos));
      renderTabela();
      form.reset();
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
      localStorage.removeItem('user');
      window.location.href = 'index.html';
    });
  }
}
