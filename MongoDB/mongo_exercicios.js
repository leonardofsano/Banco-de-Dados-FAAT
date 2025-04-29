// EXERCÍCIO 1: INSERINDO DADOS
const mariaId = db.client.insertOne({
    full_name: "Maria Silva",
    cpf: "12345678901",
    email: "maria.silva@email.com",
    phone: "11987654321",
    address: "Rua das Flores, 123",
    city: "São Paulo",
    state: "SP",
    zip_code: "01001000",
    created_by: "user_id_do_admin_1",
    enterprise: null,
    cnpj_enterprise: null,
    description: "Cliente individual"
  }).insertedId;
  
  const empresaId = db.client.insertOne({
    full_name: "Empresa Soluções Ltda",
    cpf: null,
    email: "contato@solucoes.com.br",
    phone: "21998765432",
    address: "Avenida Principal, 456",
    city: "Rio de Janeiro",
    state: "RJ",
    zip_code: "20010020",
    created_by: "user_id_do_manager_2",
    enterprise: "Soluções Ltda",
    cnpj_enterprise: "12345678000190",
    description: "Cliente corporativo"
  }).insertedId;
  
  db.client_processes.insertMany([
    {
      client_id: mariaId,
      number: "PROC-2023-001",
      value: 1500.00,
      status: "ativo",
      class: "Cobrança",
      description: "Processo de cobrança referente a fatura em aberto.",
      created_at: ISODate("2023-10-26T10:00:00Z")
    },
    {
      client_id: empresaId,
      number: "PROC-2023-002",
      value: 5500.50,
      status: "em análise",
      class: "Contratual",
      description: "Análise de contrato de prestação de serviços.",
      created_at: ISODate("2023-11-15T14:30:00Z")
    }
  ]);
  
  db.events.insertMany([
    {
      client_id: mariaId,
      enterprise: null,
      cnpj_enterprise: null,
      freight: 50.00,
      amount_of_cleaning: 2,
      cleaning_date: "2023-12-10",
      cost_of_each_cleanin: 200.00,
      proposal_doc: "PROP-MS-001.pdf",
      number_proposal: "PROP-2023-001-MS",
      proposal_expiration_date: ISODate("2023-11-30T23:59:59Z"),
      created_proposal_by: "user_id_do_sales_3",
      address: "Rua das Camélias, 789",
      city: "São Paulo",
      state: "SP",
      zip_code: "02002000",
      proposal_status: "accepted"
    },
    {
      client_id: empresaId,
      enterprise: "Soluções Ltda",
      cnpj_enterprise: "12345678000190",
      freight: 120.00,
      amount_of_cleaning: 5,
      cleaning_date: "2024-01-15",
      cost_of_each_cleanin: 150.00,
      proposal_doc: "PROP-ESL-002.pdf",
      number_proposal: "PROP-2023-002-ESL",
      proposal_expiration_date: ISODate("2023-12-20T23:59:59Z"),
      created_proposal_by: "user_id_do_sales_3",
      address: "Avenida das Palmeiras, 1011",
      city: "Rio de Janeiro",
      state: "RJ",
      zip_code: "22020030",
      proposal_status: "pending accepted"
    }
  ]);
  
  // EXERCÍCIO 2: CONSULTAS
  db.client.find({ city: "São Paulo" });
  db.client_processes.find({ value: { $gt: 2000 } });
  db.events.find({ proposal_status: { $in: ["pending accepted", "accepted"] } });
  db.client.find({ cnpj_enterprise: { $ne: null } }, { full_name: 1, cnpj_enterprise: 1, _id: 0 });
  db.client_processes.find({ class: "Cobrança" }).sort({ value: -1 });
  
  // EXERCÍCIO 3: ATUALIZAÇÕES
  db.client_processes.updateOne(
    { number: "PROC-2023-001" },
    { $set: { status: "concluído" } }
  );
  
  db.events.updateOne(
    { client_id: mariaId },
    { $set: { note_doc: "OBS-MS-001.txt" } }
  );
  
  db.events.updateOne(
    { client_id: empresaId },
    { $inc: { amount_of_cleaning: 1 } }
  );
  
  // EXERCÍCIO 4: EXCLUSÕES
  db.client_processes.deleteOne({ number: "PROC-2023-002" });
  db.client.deleteMany({ cnpj_enterprise: null });
  
  // EXERCÍCIO 5: ÍNDICES
  db.client.createIndex({ full_name: 1 });
  db.client.getIndexes();
  