import { DataSource, DataSourceOptions } from "typeorm";
import { database, dbhost, dbname, dbpass, dbuser, error, mode } from "../config";
import { User } from "../entities/User";

export const ormconfig: DataSourceOptions = {
    type: 'postgres',
    host: dbhost,
    port: 5432,
    username: dbuser,
    password: dbpass,
    database: dbname,
    synchronize: mode === "dev",
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
    ssl: {
        rejectUnauthorized: false,
    },
}

const AppDataSource = new DataSource(ormconfig);

export const InitDatabase = () => {
    AppDataSource.initialize()
        .then(() => database('✅ Conectado a PostgreSQL'))
        .catch((err) => error('❌ Error de conexión', err));
}