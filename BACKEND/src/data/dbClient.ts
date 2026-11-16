import { env } from 'node:process';
import mongoose from 'mongoose'
class DbClient {

    async connectDB() {

        const uri = env.MONGODB_URI;
        if (!uri) {
            throw new Error('Falta configurar la variable de entorno MONGODB_URI');
        }

        await mongoose.connect(uri)

    }


    async closeConnection() {
        await mongoose.disconnect();
    }
}
export default new DbClient();
