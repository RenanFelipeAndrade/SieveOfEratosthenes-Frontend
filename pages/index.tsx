function Home() {
  let tam = 500;
  let vet: number[] = [];
  let primes: number[] = [];

  function crivo_eratostenes(posicao: number) {
    let composto: number = posicao * 2;

    if (posicao <= 1) {
      vet[posicao] = 0;
    } else if (vet[posicao] == 1) {
      while (composto < tam) {
        vet[composto] = 0;

        composto += posicao;
      }
    }

    if (posicao <= Math.sqrt(tam)) {
      crivo_eratostenes(posicao + 1);
    }
  }

  function main() {
    for (let i = 0; i < tam; i++) {
      vet[i] = 1;
    }

    crivo_eratostenes(0);

    for (let i = 0; i < tam; i++) {
      if (vet[i] == 1) {
        primes.push(i);
      }
    }

    return 0;
  }
  main();

  return (
    <div>
      <h1>Números primos entre 0 e 100</h1>
      <ul className="numbers">
        {primes.map((primeNumber) => (
          <li key={primeNumber}>{primeNumber};</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
