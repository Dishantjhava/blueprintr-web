// Demonstration data for BLUEPRINTR architecture viewer
// Represents structured Mongoose schemas, REST contracts, Feature Specs, and Starter Code.

export const sampleGenerationData = {
  promptText: "Create a user ticket support system with priority tagging, status transitions, assigned support agent, and automated resolution timestamps.",
  executionMetrics: {
    cacheHit: false,
    engine: "BLUEPRINTR Pipeline"
  },
  artifacts: {
    featureSpec: {
      title: "Feature Spec — Support Ticket System",
      type: "MARKDOWN",
      content: `## 1. Overview
Automated support ticketing pipeline with priority routing, SLA tracking, and status lifecycle hooks.

## 2. Core Requirements
- **Ticket Lifecycle**: Open -> In Progress -> Resolved -> Closed
- **Role Permissions**: Customer (create/view own), Agent (assign/update status), Admin (full access)
- **SLA Metrics**: Resolution timestamp tracking and response status logging.

## 3. Scope & Constraints
- Rate limiting per client connection
- Async event emission on ticket status mutation`
    },
    apiContract: {
      title: "REST API Contract — OpenAPI 3.0",
      type: "OPENAPI_JSON",
      endpoints: [
        {
          method: "POST",
          path: "/api/v1/tickets",
          summary: "Create support ticket",
          requestBody: `{
  "title": "Payment webhook failure",
  "priority": "HIGH",
  "category": "BILLING"
}`,
          response: `201 Created -> { "ticketId": "tkt_8912", "status": "OPEN" }`
        },
        {
          method: "GET",
          path: "/api/v1/tickets/:id",
          summary: "Fetch ticket details by ID",
          response: `200 OK -> { "id": "tkt_8912", "assignedTo": "agent_402", ... }`
        },
        {
          method: "PATCH",
          path: "/api/v1/tickets/:id/status",
          summary: "Update ticket status",
          requestBody: `{ "status": "RESOLVED" }`,
          response: `200 OK -> { "resolvedAt": "2026-08-19T16:20:00Z" }`
        }
      ]
    },
    databaseSchema: {
      title: "Database Schema & Starter Code",
      type: "MONGOOSE",
      schemaCode: `import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  priority: { 
    type: String, 
    enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'], 
    default: 'MEDIUM' 
  },
  status: { 
    type: String, 
    enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'], 
    default: 'OPEN' 
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resolvedAt: { type: Date }
}, { timestamps: true });

// Indexing for query optimization
TicketSchema.index({ createdBy: 1, status: 1 });

export default mongoose.model('Ticket', TicketSchema);`,
      controllerCode: `import Ticket from '../models/Ticket.js';

export const createTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create({
      ...req.body,
      createdBy: req.user.id
    });
    return res.status(201).json({ success: true, data: ticket });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};`
    }
  }
};
