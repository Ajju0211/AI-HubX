import SibApiV3Sdk from "sib-api-v3-sdk";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  WELOCME_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";
import dotenv from "dotenv";

dotenv.config();
// Initialize Brevo (Sendinblue) client
var defaultClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.MSG_API_KEY; // Your Brevo API key
var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendVerificationEmail = async (email, verificationToken) => {
  // Initialize sendSmtpEmail with sender details
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  try {
    sendSmtpEmail.to = [
      {
        email: email,
        name: "User",
      },
    ];
    sendSmtpEmail.sender = {
      email: "ajaysigh2004@gmail.com",
      name: "Gemini",
    };
    sendSmtpEmail.subject = "Verify your email address";
    sendSmtpEmail.htmlContent = VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationToken
    );
    sendSmtpEmail.headers = {
      "X-Mailin-custom":
        "custom_header_1:custom_value_1|custom_header_2:custom_value_2",
    };

    // Log the email request for debugging
    console.log("Final email request:", sendSmtpEmail);

    // Send email using Brevo transactional email API
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error(
      "Error sending email:",
      error.response ? error.response.body : error.message
    );
    throw new Error(
      `Error sending email: ${
        error.response ? error.response.body : error.message
      }`
    );
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  try {
    sendSmtpEmail.to = [
      {
        email: email,
        name: name,
      },
    ];
    sendSmtpEmail.sender = {
      email: "ajaysigh2004@gmail.com",
      name: "Gemini",
    };
    sendSmtpEmail.subject = "Verify your email address";
    sendSmtpEmail.htmlContent = WELOCME_EMAIL_TEMPLATE.replace(
      "{username}",
      name
    );
    sendSmtpEmail.headers = {
      "X-Mailin-custom":
        "custom_header_1:custom_value_1|custom_header_2:custom_value_2",
    };

    console.log("Final email request:", sendSmtpEmail);

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error(
      "Error sending email:",
      error.response ? error.response.body : error.message
    );
    throw new Error(
      `Error sending email: ${
        error.response ? error.response.body : error.message
      }`
    );
  }
};

export const sendPasswordResetEmail = async (email, resetUrl) => {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  try {
    sendSmtpEmail.to = [
      {
        email: email,
      },
    ];
    sendSmtpEmail.sender = {
      email: "ajaysigh2004@gmail.com",
      name: "Gemini",
    };
    sendSmtpEmail.subject = "Verify your email address";
    sendSmtpEmail.htmlContent = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
      "{resetURL}",
      resetUrl
    );
    sendSmtpEmail.headers = {
      "X-Mailin-custom":
        "custom_header_1:custom_value_1|custom_header_2:custom_value_2",
    };

    console.log("Final email request:", sendSmtpEmail);

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error(
      "Error sending email:",
      error.response ? error.response.body : error.message
    );
    throw new Error(
      `Error sending email: ${
        error.response ? error.response.body : error.message
      }`
    );
  }
};

export const sendResetSuccessEmail = async (email) => {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  try {
    sendSmtpEmail.to = [
      {
        email: email,
      },
    ];
    sendSmtpEmail.sender = {
      email: "ajaysigh2004@gmail.com",
      name: "Gemini",
    };
    sendSmtpEmail.subject = "Verify your email address";
    (sendSmtpEmail.htmlContent = PASSWORD_RESET_SUCCESS_TEMPLATE),
      (sendSmtpEmail.headers = {
        "X-Mailin-custom":
          "custom_header_1:custom_value_1|custom_header_2:custom_value_2",
      });

    console.log("Final email request:", sendSmtpEmail);

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error(
      "Error sending email:",
      error.response ? error.response.body : error.message
    );
    throw new Error(
      `Error sending email: ${
        error.response ? error.response.body : error.message
      }`
    );
  }
};
