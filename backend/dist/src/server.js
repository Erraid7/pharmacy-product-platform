import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/database.js';
const PORT = process.env.PORT || 5000;
async function start() {
    try {
        // Connect to MongoDB
        await connectDB();
        // Start server
        const server = app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        });
        // Graceful shutdown
        process.on('SIGTERM', () => {
            console.log('SIGTERM signal received: closing HTTP server');
            server.close(() => {
                console.log('HTTP server closed');
                process.exit(0);
            });
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
start();
//# sourceMappingURL=server.js.map