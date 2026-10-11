// Load environment variables from .env before any module that validates them.
import "dotenv/config";
process.env.NODE_ENV = "test";
