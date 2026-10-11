import { describe, it, expect, vi, beforeEach } from "vitest";
const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));
vi.mock("resend", () => ({
    Resend: class {
        emails = { send: sendMock };
    },
}));
import { sendEmail } from "../utils/resend.js";
describe("sendEmail (Resend)", () => {
    beforeEach(() => {
        sendMock.mockReset();
    });
    it("sends an email with the expected payload on success", async () => {
        sendMock.mockResolvedValue({
            data: { id: "email_123" },
            error: null,
            headers: {},
        });
        await expect(sendEmail("user@example.com", "Verify Your Email Address", "<p>Hi</p>")).resolves.toBeUndefined();
        expect(sendMock).toHaveBeenCalledTimes(1);
        expect(sendMock).toHaveBeenCalledWith({
            from: process.env.EMAIL_ADDRESS,
            to: ["user@example.com"],
            subject: "Verify Your Email Address",
            html: "<p>Hi</p>",
        });
    });
    it("throws an operational AppError (502) when Resend returns an error", async () => {
        sendMock.mockResolvedValue({
            data: null,
            error: { message: "missing_api_key", statusCode: 401, name: "missing_api_key" },
            headers: null,
        });
        await expect(sendEmail("user@example.com", "Reset Password", "<p>Hi</p>")).rejects.toMatchObject({
            statusCode: 502,
            isOperational: true,
            message: "Could not send the email. Please try again later.",
        });
    });
    it("throws an operational AppError (502) when the send call itself rejects", async () => {
        sendMock.mockRejectedValue(new Error("network down"));
        await expect(sendEmail("user@example.com", "Reset Password", "<p>Hi</p>")).rejects.toMatchObject({
            statusCode: 502,
            isOperational: true,
        });
    });
});
