import { MailtrapClient } from 'mailtrap';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();


const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT;

export const MailClient = new MailtrapClient({
  token: TOKEN,
  endpoint: ENDPOINT
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "tested by pratik",
};

export const recipient = {
  email: "rhutikraktate@gmail.com"
}