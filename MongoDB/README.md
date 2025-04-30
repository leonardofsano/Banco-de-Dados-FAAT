EXERCICIOS DA TF 20250423


// ----------------------
// EXERCÍCIO 1: Inserção
// ----------------------

// Inserção de cliente individual
db.client.insertOne({
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
});

// Inserção de cliente corporativo
db.client.insertOne({
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
});

// (Continue com os inserts de processos e eventos...)

// ----------------------
// EXERCÍCIO 2: Consultas
// ----------------------

// Clientes em São Paulo
db.client.find({ city: "São Paulo" });

// Processos com valor > 2000
db.client_processes.find({ value: { $gt: 2000 } });

// Eventos com proposta pendente ou aceita
db.events.find({ proposal_status: { $in: ["pending accepted", "accepted"] } });

// Clientes corporativos (mostrar só nome e CNPJ)
db.client.find(
    { enterprise: { $ne: null } },
    { full_name: 1, cnpj_enterprise: 1, _id: 0 }
);

// Processos de cobrança ordenados por valor desc
db.client_processes.find({ class: "Cobrança" }).sort({ value: -1 });

// ----------------------
// EXERCÍCIO 3: Atualizações
// ----------------------

db.client_processes.updateOne(
    { number: "PROC-2023-001" },
    { $set: { status: "concluído" } }
);

db.events.updateOne(
    { client_id: "id_do_cliente_maria_silva" },
    { $set: { note_doc: "OBS-MS-001.txt" } }
);

db.events.updateOne(
    { client_id: "id_do_cliente_empresa_solucoes" },
    { $inc: { amount_of_cleaning: 1 } }
);

// ----------------------
// EXERCÍCIO 4: Exclusões
// ----------------------

db.client_processes.deleteOne({ number: "PROC-2023-002" });

db.client.deleteMany({ cnpj_enterprise: null });

// ----------------------
// EXERCÍCIO 5: Índices
// ----------------------

db.client.createIndex({ full_name: 1 });

db.client.getIndexes();
