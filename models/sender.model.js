import mongoose, { Schema } from "mongoose"

const senderSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        totalTransactions: {
            type: Number,
            default: 0
        },
        averageTransactionAmount: {
            type: Number,
            default: 0
        },
        disputedTransactions: {
            type: Number,
            default: 0
        },
        fraudulentTransactions: {
            type: Number,
            default: 0
        }
    }
)

export const Sender = mongoose.model("Sender", senderSchema)