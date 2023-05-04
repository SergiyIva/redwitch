import start from "./index.js";
import cluster from 'cluster';
import { cpus } from 'os';
import process from 'process';
//На Windows это сделать не возможно.
const numCPUs = cpus().length;
const startWorker = () => {
    const worker = cluster.fork()
    console.log(`КЛАСТЕР: Исполнитель ${worker.id} запущен`)
}

if (cluster.isMaster) {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        startWorker()
    }

    cluster.on("disconnect", worker =>
        console.log(`КЛАСТЕР: Исполнитель ${worker.id} отключился от кластера.`)
    )

    cluster.on("exit", (worker, code, signal) =>{
            console.log(`КЛАСТЕР: Исполнитель   завершил работу с кодом` +
                `завершения ${code} (${signal})`)
            startWorker()
        }
    )
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    start(3033)

    console.log(`Worker ${process.pid} started`);
}

