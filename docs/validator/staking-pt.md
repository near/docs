---
id: staking
title: Executando um Nó Validador
sidebar_label: Executando o Nó
---

## Staking na NEAR

### Traduções

- [Inglês](/docs/validator/staking)
- [Coreano](/docs/validator/staking-kr)
- Adicione seu idioma também através do [Github pull request](https://github.com/near/docs/pull/385)

### _LEIA ANTES DE COMEÇAR_

Aguarde até que o seu nó esteja totalmente sincronizado antes de enviar uma transação de staking. Um nó fora de sincronização não pode produzir ou validar blocos, então se você for escolhido como validador, você está correndo o risco de ser expulso da coleção de validadores e perder suas recompensas se o seu nó não mantém o tempo de uptime apropriado (ou seja, validar/produzir o número de blocos necessários para esse período).

Você pode testar sua infraestrutura de validador na NEAR _TestNet_. Você pode gerar uma conta com alguns tokens na [carteira NEAR](https://wallet.testnet.near.org)e usá-la para fazer deploy do seu staking pool. Em seguida, entre em contato com o NEAR Core-dev no [Discord](https://near.chat) para solicitar stake suficiente para se tornar um validador na TestNet.

1. Para esta sessão atual: execute o comando `export NODE_ENV=testnet`
2. Adicione esta mesma linha (`export NODE_ENV=testnet`) ao final do arquivo `~/.bashrc` para garantir que esta variável de ambiente persista se a máquina reiniciar.

TestNet está sendo executado em URLs separadas para o explorador, a carteira e o Json RPC:

|        ⛔️ MainNet        |            ✅ TestNet             |
| :-----------------------: | :-------------------------------: |
| https://explorer.near.org | https://explorer.testnet.near.org |
|  https://wallet.near.org  |  https://wallet.testnet.near.org  |
|   https://rpc.near.org    |   https://rpc.testnet.near.org    |

Cada nova conta TestNet recebe automaticamente algumas centenas de tokens para fazer deploy de contratos inteligentes e testar as suas APIs.

Você pode usar o [nearup](https://github.com/near/nearup) para facilmente fazer deploy do seu nó na TestNet em um VPS. Se você planeja fazer deploy na MainNet, **você não pode usar o nearup**, e sugerimos seguir as diretrizes [aqui](/docs/develop/node/validator/deploy-on-mainnet). Junte-se aos canais de validadores da NEAR [no Discord](https://near.chat) para receber suporte técnico da equipe NEAR e do resto da comunidade.

Validadores NEAR devem:

- Saber como compilar, fazer deploy e configurar os nós de Validadores NEAR
- Entender a diferença entre `account_key`, `node_key` e `validator_key` (consulte as [chaves no documento](/docs/develop/node/intro/keys) da Plataforma NEAR)
- Entender como fazer deploy de um contrato NEAR e a diferença entre métodos `view` e `call`. Saber como alavancá-los através do `near-cli` e `near RPC`
- Ter uma plataforma de monitoramento para medir os blocos gerados e perdidos, pares e conectividade, versão atual do nó, além de cpu, memória, armazenamento e desempenho de rede
- Entender o estado de um validador: `proposals`, `next` e `current`
- Usar as informações acima para controlar se o validador está caindo fora do conjunto de validadores ativos, e o que precisa ser feito para corrigir o problema
- Saber onde encontrar informações sobre os próximos [lançamentos do nearcore](https://github.com/near/nearcore/releases) e outras melhorias de ferramentas

## Requisitos de hardware para o nó

Os requisitos mínimos para executar um nó de validador na NEAR são:

```bash
Pelo menos 4 núcleos de CPU
Pelo menos 16GB RAM
Pelo menos 100GB de SSD (Nota: HDD não funcionará)
```

Mais informações estão na documentação de [Requisitos de Hardware](/docs/develop/node/validator/hardware).

## Configurando seu ambiente

**IMPORTANTE: Certifique-se de que você tem a versão mais recente do [NEAR CLI](https://github.com/near/near-cli) e uma versão 12.x do Node**

Você pode instalar e atualizar o Near CLI usando npm:

```bash
# Baixar Near CLI com npm:
npm i -g near-cli
```

**Nota:** A rede padrão para a `near-cli` é a `testnet`. Se você quiser mudar para a `mainnet` ou `betanet`, por favor veja instruções de [seleção de redes usando `near-cli`](/docs/tools/near-cli#network-selection).

Uma vez que o Near CLI estiver instalado, vá em frente e execute seu nó.

<blockquote class="info">
    <strong>Dica Profissional</strong><br><br>
    Você não precisa rodar o near-cli no seu nó validador: todos os comandos de staking são emitidos para o pool de staking, que é um contrato inteligente normal.
</blockquote>

## Executando o Nó

Por favor, siga a [Documentação do Nearup](https://github.com/near/nearup) para iniciar o seu nó na TestNet. Lembre-se que `Nearup` não suporta a MainNet, então você terá que construir seus scripts de inicialização e seguir o [guia de implantação na MainNet](/docs/develop/node/validator/deploy-on-mainnet).

Na primeira inicialização, o nearup pedirá o ID da sua conta de validador. Coloque um texto de exemplo, como `coming_soon`, para deixar o node sincronizar com a rede enquanto você coloca a staking pool no ar:

```
$ nearup run testnet --account-id coming_soon
2020-10-16 14:02:29.190 INFO nearup - run: Home directory is /home/nearkat/.near/testnet...
2020-10-16 14:02:29.191 INFO nodelib - setup_and_run: Using officially compiled binary
2020-10-16 14:02:30.027 INFO util - download_binaries: Downloading latest deployed version for testnet
2020-10-16 14:02:30.028 INFO util - download_binaries: Downloading near to /home/nearkat/.nearup/near/testnet/near from nearcore/Linux/1.16.0/974d93dc657f620d98de6589a2b5bc97be1db816/near...
2020-10-16 14:02:33.755 INFO util - download_binaries: Downloaded near to /home/nearkat/.nearup/near/testnet/near...
2020-10-16 14:02:33.758 INFO util - download_binaries: Making the near executable...
2020-10-16 14:02:33.758 INFO util - download_binaries: Downloading genesis-csv-to-json to /home/nearkat/.nearup/near/testnet/genesis-csv-to-json from nearcore/Linux/1.16.0/974d93dc657f620d98de6589a2b5bc97be1db816/genesis-csv-to-json...
2020-10-16 14:02:34.710 INFO util - download_binaries: Downloaded genesis-csv-to-json to /home/nearkat/.nearup/near/testnet/genesis-csv-to-json...
2020-10-16 14:02:34.710 INFO util - download_binaries: Making the genesis-csv-to-json executable...
2020-10-16 14:02:34.712 INFO nodelib - check_and_setup: Setting up network configuration.
2020-10-16 14:02:34.712 INFO nodelib - init_near: Initializing the node configuration using near binary...
Oct 16 14:02:34.726  INFO near: Version: 1.16.0-rc.1, Build: 974d93dc-modified, Latest Protocol: 39
Oct 16 14:02:34.727  INFO near: Use key ed25519:4msyQstQ3Z7Gq1qrwE78HPTRYdLFtCmJ9dydrrbUtrer for coming_soon to stake.
Oct 16 14:02:34.727  INFO near: Downloading config file from: https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore-deploy/testnet/genesis.json ...
```

Enquanto a sincronização estiver em andamento, você **tem que recuperar sua chave de validador em ** `~/.near/testnet/validator_key.json`:

```
{
  "account_id": "coming_soon",
  "public_key": "ed25519:4msyQstQ3Z7Gq1qrwE78HPTRYdLFtCmJ9dydrrbUtrer",
  "secret_key": "ed25519:<PRIVATE_KEY>"
}
```

Esta chave será necessária para _emparelhar_ o seu nó validador e sua staking pool.

## Autorize o acesso do `near-cli` à sua conta TestNet

1. Configure o `near-cli` para usar a TestNet, executando o comando `export NODE_ENV=testnet`
2. Autentique-se no `near-cli` com sua conta da NEAR Wallet, executando o comando `near login`

Será solicitado que navegue até uma URL para autenticar sua conta de staking. Você pode esperar um resultado semelhante ao seguinte:

```bash
$ near login

Please authorize NEAR CLI on at least one of your accounts.

If your browser doesn't automatically open, please visit this URL
https://wallet.testnet.near.org/login/?title=NEAR+CLI&public_key=ed25519%3A7xuBXjTabXM1yZ8WQB1Ezj95BjDnqX63cKj6RBgYa3it&success_url=http%3A%2F%2F127.0.0.1%3A5000
Please authorize at least one account at the URL above.

Which account did you authorize for use with NEAR CLI?
Enter it here (if not redirected automatically):

```

Tome o cuidado de especificar o mesmo ID de conta da TestNet no navegador e no `near-cli`:

```bash
Which account did you authorize for use with NEAR CLI?
Enter it here (if not redirected automatically):

```

Depois de concluir a autenticação no navegador e colocar o ID da conta no campo de entrada acima você deve esperar uma mensagem como a abaixo:

```
nearkat.testnet
Logged in as [ nearkat.testnet ] with public key [ ed25519:7xuBXj... ] successfully
```

<blockquote class="warning">
    <strong>Atenção!</strong><br><br>
    Se você receber um erro <i>ERR_CONNECTION_REFUSED</i>, verifique se seu navegador não está tentando abrir o endereço http://127.0.0.1:5000. Este é um redirecionamento incorreto do near-cli executando em uma instância remota, e pode ser ignorado.
</blockquote>

Para testar se seu `near-cli` é capaz de controlar sua conta `testnet`, execute o comando: `$ near send nearkat.testnet testnet 0.1`, em que `nearkat.testnet` é o remetente, e `testnet` o destinatário de `0.1` tokens NEAR. Você pode esperar um resultado semelhante ao seguinte:

```
$ near send quato.testnet testnet 0.1
Sending 0.1 NEAR to testnet from quato.testnet
Transaction Id Hm6hRz8NS9sXV6yPzeyYJZwqTSUTYcifws3iu3VcbkyW
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/Hm6hRz8NS9sXV6yPzeyYJZwqTSUTYcifws3iu3VcbkyW
```

## Coloque a staking pool no ar

O NEAR Protocol fornece um contrato inteligente de staking pool no repositório [initial-contracts](https://github.com/near/initial-contracts) (contratos iniciais) do Github.

Coloque no ar a sua staking pool enviando o método de chamada abaixo para a [fábrica de staking pools](https://github.com/near/core-contracts/tree/master/staking-pool-factory):

```
near call pool.f863973.m0 create_staking_pool '{"staking_pool_id":"<POOL_ID>", "owner_id":"<OWNER_ID>", "stake_public_key":"<VALIDATOR_KEY>", "reward_fee_fraction": {"numerator": <X>, "denominator": <Y>}}' --account_id <OWNER_ID> --amount 50 --gas 300000000000000
```

Em que:

- `pool.f863973.m0` é a fábrica de staking pools mencionada acima
- `<POOL_ID>` é o nome do contrato da staking pool. Se você passar o parâmetro `heyheyhey` o resultado será `heyheyhey.pool.f863973.m0`
- `<OWNER_ID>` é a conta autorizada a enviar os _métodos do proprietário_ para a pool, como a chave de validador ou as taxas
- `<VALIDATOR_KEY>` é a chave pública salva em `~/.near/testnet/validator_key.json` em seu nó validador (veja o passo [staking#run-the-node](staking#run-the-node) acima)
- `{"numerator": <X>, "denominator": <Y>}` configura as taxas do validador. Para uma taxa de 10% é preciso usar `x=10` e `y=100`
- `--amount 50` atribui 50 \$NEAR à transação, como uma reserva para pagar o armazenamento do contrato
- `--gas 300000000000000` especifica o gás para a transação (optional)

Você pode esperar um resultado semelhante ao seguinte:

```bash
$ near call pool.f863973.m0 create_staking_pool '{"staking_pool_id":"quato", "owner_id":"quato.testnet", "stake_public_key":"ed25519:4msyQstQ3Z7Gq1qrwE78HPTRYdLFtCmJ9dydrrbUtrer", "reward_fee_fraction": {"numerator": 5, "denominator": 100}}' --account_id quato.testnet --amount 50 --gas 300000000000000
Scheduling a call: pool.f863973.m0.create_staking_pool({"staking_pool_id":"quato", "owner_id":"quato.testnet", "stake_public_key":"ed25519:4msyQstQ3Z7Gq1qrwE78HPTRYdLFtCmJ9dydrrbUtrer", "reward_fee_fraction": {"numerator": 5, "denominator": 100}}) with attached 50 NEAR
Receipt: ByuKqFBuQY4oBu7GypRWEwUjAvxHacTJLGLfwUNjRunV
  Failure [pool.f863973.m0]: Error: {"index":0}
Receipts: 3Y8yjPkd894WSTaapyURe1moMtY8Yvbrjwmz3Pv3N2RZ, EeCy4HyRs8cuxsraxcaiW53gmvWL55xzTqDjfUaPcoXM
  Log [pool.f863973.m0]: The staking pool @quato.pool.f863973.m0 was successfully created. Whitelisting...
Transaction Id BYAffkmrssiErMDbmDrF2AoHKDLCQrcCe1Vk1CGEnBZB
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/BYAffkmrssiErMDbmDrF2AoHKDLCQrcCe1Vk1CGEnBZB
true

```

A expressão `true` na última linha e o link para o explorer, são a prova de que a pool de staking está rodando e pronta para receber stake.

## Configurar seu nó `validator_key.json` e reiniciar o nearup

Uma vez que o deploy da pool de staking esteja executado, edite manualmente o arquivo `~/.near/testnet/validator_key.json` em seu nó validador e substitua `coming_soon` com o nome da conta de sua pool de staking:

```
{
  "account_id": "quato.pool.f863973.m0",
  "public_key": "ed25519:4msyQstQ3Z7Gq1qrwE78HPTRYdLFtCmJ9dydrrbUtrer",
  "secret_key": "ed25519:<PRIVATE_KEY>"
}
```

Uma vez feito, você pode parar e reiniciar o nearup com o comando: `nearup stop`

seguido por: `nearup run testnet`

<blockquote class="warning">
    <strong>Atenção!</strong><br><br>
    Certifique-se de que o seu nó baixou inteiramente o arquivo genesis.json antes de executar o comando de parar o nearup.
</blockquote>

## Se Tornando um Validador no _Conjunto Ativo_

Uma vez que a pool esteja no ar, você pode fazer _stake_ de seus tokens usando qualquer um dos métodos oferecidos na [documentação sobre delegação](delegation). Certifique-se que você está usando a ferramenta que suporta a TestNet, e não somente a MainNet.

A TestNet e a MainNet da NEAR exigem um período de no mínimo 24 horas de ativação para aceitar sua oferta de pool. Você pode verificar se você é um validador quando, nos logs do nó, você ver "V/" - onde V significa que esse nó é validador:

![](assets/validators%20%281%29.png)

Legenda: # 7153 | Altura do bloco V/1 | 'V' (validador) ou '—' (nó regular)

O valor 0/0/40 mostra o total de validadores: pares conectados / pares atualizados / meus pares. Este número pode mudar ao longo do tempo.

Para saber mais sobre como os validadores são escolhidos, dê uma olhada nas [Perguntas Frequentes Sobre Staking](../validator/staking-faq.md).

## Veja a lista de validadores atuais e futuros

Você pode usar `near-cli` para rever o conjunto de validadores nos próximos três períodos:

| Comandos                  | Significado                                                                                                                                          |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `near proposals`          | Todos os validadores que mandaram transações de staking (`Proposal(Accepted)`), ou que foram reeleitos (`Rollover`)                                  |
| `near validators next`    | Todos os validadores que vão produzir blocos na próxima época (epoch). Pode ser `New` (Criado), `Rewarded` (Recompensado) ou `Kicked out` (Excluído) |
| `near validators current` | Todos os validadores que estão produzindo blocos na época corrente, e o número total de blocos que eles produziram                                   |

<blockquote class="warning">
    <strong>Atenção!</strong><br><br>
    Você tem que esperar pelo menos 2 épocas (43.200 blocos cada) antes do seu
</blockquote>

**Nota:** A rede padrão para o `near-cli` é a `testnet`. Se você quiser mudar para a `mainnet` ou `betanet`, por favor veja instruções de [seleção de redes usando `near-cli`](/docs/tools/near-cli#network-selection).

## Re-staking automático

O Protocolo NEAR reposiciona todas as recompensas inflacionárias automaticamente, a menos que você decida deixar de investir manualmente alguns dos fundos.

## Links Adicionais

- [Contratos de bloqueio explicados](../tokens/lockup)
- [NEAR Core Contracts no Github](https://github.com/near/core-contracts)
- [NEAR Stake Wars](https://github.com/nearprotocol/stakewars)
> Tem alguma dúvida?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Pergunte no StackOverflow!</h8></a>
