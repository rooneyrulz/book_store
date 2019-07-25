import mongoose from 'mongoose';
import config from 'config';

export default async (server, port) => {
  try {
    const isConnected = await mongoose.connect(config.get('MONGO_URI'), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    if (isConnected) {
      // Listening to server
      await server.listen(port, () =>
        console.log(`server running on port ${port}...`)
      );
      console.log(`connecting to mongodb...`);
    }
  } catch (error) {
    process.exit(1);
    throw error.message;
  }
};
