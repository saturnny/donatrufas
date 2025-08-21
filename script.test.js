const { adicionarAoCarrinho } = require('./script');

describe('adicionarAoCarrinho', () => {
  beforeEach(() => {
    const localStorageMock = (() => {
      let store = {};
      return {
        getItem: jest.fn(key => store[key] || null),
        setItem: jest.fn((key, value) => {
          store[key] = value.toString();
        }),
        clear: jest.fn(() => {
          store = {};
        })
      };
    })();
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      configurable: true
    });

    document.body.innerHTML = `
      <select id="tipoItem"><option value="Trufa" selected>Trufa</option></select>
      <select id="tamanho"><option value="Tamanho Único (40g)" selected>Tamanho Único (40g)</option></select>
      <select id="sabor"><option value="Chocolate" selected>Chocolate</option></select>
      <input id="quantidade" value="2" />
      <div id="mensagem"></div>
    `;
  });

  test('adiciona item ao carrinho e atualiza mensagem', () => {
    adicionarAoCarrinho();

    const carrinho = JSON.parse(window.localStorage.getItem('carrinho'));

    expect(carrinho).toHaveLength(1);
    expect(carrinho[0]).toEqual({
      tipoItem: 'Trufa',
      tamanho: 'Tamanho Único (40g)',
      sabor: 'Chocolate',
      quantidade: '2'
    });

    expect(document.getElementById('mensagem').textContent)
      .toBe('Item adicionado ao carrinho: Trufa!');
  });
});
