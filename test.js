const contaBancaria = {
    investimentoInicial: parseFloat(3000),
    taxaJurosMensal: parseFloat(2.5),
    periodoMeses: parseInt(24),
  };
  
  // TODO: Calcule a taxa de juros mensal em formato decimal (0 a 1) a partir da taxa percentual fornecida:


  // TODO: Calcule o montante (valor total após o investimento) usando a fórmula de juros compostos.
  
  let montante =  contaBancaria.investimentoInicial * (1 + (contaBancaria.taxaJurosMensal/100)) ** contaBancaria.periodoMeses
  
  // É impresso informações sobre o investimento:
  console.log("Investimento: " + contaBancaria.investimentoInicial.toFixed(2));
  console.log("Juros: " + contaBancaria.taxaJurosMensal);
  console.log("Período: " + contaBancaria.periodoMeses);
  console.log("Resultado: " + montante.toFixed(2));