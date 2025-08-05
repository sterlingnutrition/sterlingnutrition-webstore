import { AbstractPaymentProvider } from "@medusajs/framework/utils";
import {
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  CapturePaymentInput,
  CapturePaymentOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  InitiatePaymentInput,
  InitiatePaymentOutput,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  WebhookActionResult,
  ProviderWebhookPayload,
} from "@medusajs/framework/types";
import { MedusaError } from "@medusajs/framework/utils";
import crypto from "crypto";

type Options = {
  merchant_id: string;
  merchant_secret: string;
  sandbox?: boolean;
  notify_url: string;
  return_url: string;
  cancel_url: string;
};

class PayHereProviderService extends AbstractPaymentProvider<Options> {
  static identifier = "payhere";

  constructor(container: Record<string, unknown>, options: Options) {
    super(container, options);

    // Validate required options
    if (
      !options.merchant_id ||
      !options.merchant_secret ||
      !options.notify_url
    ) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "PayHere requires merchant_id, merchant_secret, and notify_url options"
      );
    }
  }

  async initiatePayment(
    input: InitiatePaymentInput
  ): Promise<InitiatePaymentOutput> {
    const { amount, currency_code, context, resource_id } = input;

    // Generate order ID if not provided in context
    const order_id = context?.order_id || `order_${resource_id}_${Date.now()}`;

    // Generate hash for security
    const hash = this.generateHash(order_id, Number(amount), currency_code);

    // Prepare payment data for PayHere JS SDK
    const paymentData = {
      sandbox: this.config.sandbox || false,
      merchant_id: this.config.merchant_id,
      return_url: this.config.return_url,
      cancel_url: this.config.cancel_url,
      notify_url: this.config.notify_url,
      order_id,
      items: `Order ${order_id}`,
      amount: amount.toString(),
      currency: currency_code,
      hash,
      first_name: context?.customer?.first_name || "",
      last_name: context?.customer?.last_name || "",
      email: context?.customer?.email || "",
      phone: context?.customer?.phone || "",
      address: context?.customer?.billing_address?.address_1 || "",
      city: context?.customer?.billing_address?.city || "",
      country: context?.customer?.billing_address?.country_code || "Sri Lanka",
      custom_1: resource_id, // Store cart/payment session ID
      custom_2: "", // Can be used for additional data
    };

    return {
      id: order_id,
      data: paymentData,
      status: "pending",
    };
  }

  async authorizePayment(
    input: AuthorizePaymentInput
  ): Promise<AuthorizePaymentOutput> {
    // In PayHere, authorization happens client-side via the JS SDK
    // We'll assume success if we get this far (actual verification happens via webhook)
    return {
      data: input.data,
      status: "authorized",
    };
  }

  async capturePayment(
    input: CapturePaymentInput
  ): Promise<CapturePaymentOutput> {
    // PayHere payments are captured immediately, so just return the data
    return {
      data: input.data,
    };
  }

  async refundPayment(input: RefundPaymentInput): Promise<RefundPaymentOutput> {
    // Implement refund logic using PayHere's API
    // This would require additional API integration
    throw new MedusaError(
      MedusaError.Types.NOT_ALLOWED,
      "Refund not implemented for PayHere"
    );
  }

  async cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
    // PayHere doesn't support canceling pre-authorized payments
    return {
      data: input.data,
    };
  }

  async deletePayment(input: DeletePaymentInput): Promise<DeletePaymentOutput> {
    // Nothing to delete in PayHere
    return {
      data: input.data,
    };
  }

  async getPaymentStatus(
    input: GetPaymentStatusInput
  ): Promise<GetPaymentStatusOutput> {
    // Status is typically handled via webhooks
    return {
      status: "pending",
    };
  }

  async retrievePayment(
    input: RetrievePaymentInput
  ): Promise<RetrievePaymentOutput> {
    // Would need to implement PayHere's retrieval API
    return input.data;
  }

  async updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    // Update payment details if needed
    return {
      id: input.data?.id,
      data: {
        ...input.data,
        amount: input.amount.toString(),
        currency: input.currency_code,
      },
    };
  }

  async getWebhookActionAndData(
    payload: ProviderWebhookPayload["payload"]
  ): Promise<WebhookActionResult> {
    const { data, rawData } = payload;

    try {
      // Verify the webhook signature
      const isValid = this.verifyWebhookSignature(rawData);
      if (!isValid) {
        throw new Error("Invalid webhook signature");
      }

      const status_code = parseInt(data.status_code);
      const order_id = data.order_id;
      const amount = parseFloat(data.payhere_amount);
      const resource_id = data.custom_1; // This was set in initiatePayment

      if (status_code === 2) {
        // Success
        return {
          action: "authorized",
          data: {
            session_id: resource_id,
            amount,
            payment_id: data.payment_id,
          },
        };
      } else if (status_code === -1) {
        // Cancelled
        return {
          action: "canceled",
          data: {
            session_id: resource_id,
            amount: 0,
          },
        };
      } else {
        // Other statuses
        return {
          action: "failed",
          data: {
            session_id: resource_id,
            amount: 0,
          },
        };
      }
    } catch (e) {
      return {
        action: "failed",
        data: {
          session_id: "",
          amount: 0,
        },
      };
    }
  }

  private generateHash(
    orderId: string,
    amount: number,
    currency: string
  ): string {
    const { merchant_id, merchant_secret } = this.config;

    return crypto
      .createHash("md5")
      .update(
        merchant_id +
          orderId +
          amount.toFixed(2) +
          currency +
          crypto
            .createHash("md5")
            .update(merchant_secret)
            .digest("hex")
            .toUpperCase()
      )
      .digest("hex")
      .toUpperCase();
  }

  private verifyWebhookSignature(data: any): boolean {
    const { merchant_secret } = this.config;

    const local_md5sig = crypto
      .createHash("md5")
      .update(
        data.merchant_id +
          data.order_id +
          data.payhere_amount +
          data.payhere_currency +
          data.status_code +
          crypto
            .createHash("md5")
            .update(merchant_secret)
            .digest("hex")
            .toUpperCase()
      )
      .digest("hex")
      .toUpperCase();

    return local_md5sig === data.md5sig;
  }
}

export default PayHereProviderService;
