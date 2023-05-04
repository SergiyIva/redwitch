import Agenda from "agenda";
import dotenv from "dotenv";

dotenv.config();
const { DB_HOST: dbHost } = process.env;

// agenda - удобное средство для создания устойчивых периодических задач,
// основанное на cron,
// устойчивость обеспечивается сохранением задач в БД.
const agenda = new Agenda({
  db: { address: dbHost, collection: "agendaJobs" }
});

export default agenda;
