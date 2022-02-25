**RF** => Requisitos funcionais
**RNF** => Requisitos não funcionais
**RN** => Regra de negócio

# Cadastro de carro
**RF** 
Deve ser possível cadastrar um novo carro

**RN**
Não deve ser possível cadastrar um carro uma placa já existente.
O carro deve ser cadastrado com disponibilidade por padrão.
*O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros
**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo noma da categoria
Deve ser possível listar todos os carros disponíveis pelo noma da marca
Deve ser possível listar todos os carros disponíveis pelo noma do carro
**RN**
O usuário não precisa estar logado no sistema.

# Cadastro de Especificação no carro
**RF**
Deve ser possível cadastrar uma especificação para o carro.

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagem do carro
**RF**
Deve ser possível cadastrar a imagem do carro
Deve ser possível listar todos os carro

**RNF**
Utilizar o multer para upload dos arquivos

**RN**
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Alugel de carro
**RF**
Deve ser possível cadastrar um aluguel

**RNF**

**RN**
O aluguel deve ter duração mínima de 24h
Não deve ser possível cadastrar um novo alguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo alguel caso já exista um aberto para o mesmo carro.