// bot.js
import { ActivityHandler, CardFactory } from "botbuilder";
import { OpenAIClient } from "@azure/openai";
import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const openAiEndpoint = "https://capitalvelocityazureopenai.openai.azure.com/";
const openAiApiKey =
    "2UEjPGbBHmlYwSL5H07cSy55jV78YJdepYmIwzGs6LhCuFwTQpFKJQQJ99BEACHrzpqXJ3w3AAABACOGP5ol";
const deploymentId = "gpt-35-turbo";
const searchEndpoint = "https://capitalvelocity-search.search.windows.net";
const searchKey = "zJp5pbaLHzA0ZnLy6Zh1YuRgaDMp3g3DaCdZ3J9pbGAzSeBxAYPF";
const searchIndex = "fixflip-groundup-rentalloan-stabilizedbridge-index";

const client = new OpenAIClient(
    openAiEndpoint,
    new AzureKeyCredential(openAiApiKey)
  );

class ChatBot extends ActivityHandler {
    constructor() {
          super();

      this.onMembersAdded(async (context, next) => {
              const membersAdded = context.activity.membersAdded;
              for (let member of membersAdded) {
                        if (member.id !== context.activity.recipient.id) {
                                    await context.sendActivity(
                                                  "👋 Hi! I'm the Capital Velocity assistant.\n\nHow can I help you today?"
                                                );
                                    await context.sendActivity({
                                                  text: "Here are some options you can click:",
                                                  suggestedActions: {
                                                                  actions: [
                                                                    {
                                                                                        type: "imBack",
                                                                                        title: "Fix & Flip Product Manual",
                                                                                        value: "fix manual",
                                                                    },
                                                                    {
                                                                                        type: "imBack",
                                                                                        title: "Ground Up Product Manual",
                                                                                        value: "ground manual",
                                                                    },
                                                                    {
                                                                                        type: "imBack",
                                                                                        title: "Rental Loan Product Manual",
                                                                                        value: "rental manual",
                                                                    },
                                                                    {
                                                                                        type: "imBack",
                                                                                        title: "Stabilized Bridge Product Manual",
                                                                                        value: "bridge manual",
                                                                    },
                                                                                  ],
                                                  },
                                    });
                        }
              }
              await next();
      });

      this.onMessage(async (context, next) => {
              const userInput = context.activity.text.toLowerCase();

                           const shortcuts = {
                                     "fix manual": {
                                                 title: "Fix & Flip Product Manual",
                                                 url: "https://portal.capitalvelocity.com/document-library/3ns4JV7cQrPnXTswjR3SKn",
                                     },
                                     "ground manual": {
                                                 title: "Ground Up Product Manual",
                                                 url: "https://portal.capitalvelocity.com/document-library/7EyAQJG8ImYmvOntrJDI7v",
                                     },
                                     "rental manual": {
                                                 title: "Rental Loan Product Manual",
                                                 url: "https://grantvelocityfilestorage.blob.core.windows.net/uploads/file-3dc22823-ea2c-4589-8114-8a481e558b06.pdf",
                                     },
                                     "bridge manual": {
                                                 title: "Stabilized Bridge Product Manual",
                                                 url: "https://portal.capitalvelocity.com/document-library/7yAqLqR5HkkeuWHDeWV1fH",
                                     },
                           };

                           for (const key in shortcuts) {
                                     if (userInput.includes(key)) {
                                                 const { title, url } = shortcuts[key];
                                                 await context.sendActivity({
                                                               attachments: [
                                                                               CardFactory.heroCard(title, "Download the guide below.", null, [
                                                                                 { type: "openUrl", title: "Download PDF", value: url },
                                                                                               ]),
                                                                             ],
                                                 });
                                                 return;
                                     }
                           }

                           if (
                                     userInput.includes("contact") ||
                                     userInput.includes("reach out") ||
                                     userInput.includes("get in touch") ||
                                     userInput.includes("speak to someone") ||
                                     userInput.includes("customer support")
                                   ) {
                                     await context.sendActivity({
                                                 attachments: [
                                                               CardFactory.heroCard(
                                                                               "Contact Capital Velocity",
                                                                               "The best way to reach us is through our website contact page.",
                                                                               null,
                                                                               [
                                                                                 {
                                                                                                     type: "openUrl",
                                                                                                     title: "Go to Contact Page",
                                                                                                     value: "https://www.capitalvelocity.com/contactUs",
                                                                                 },
                                                                                               ]
                                                                             ),
                                                             ],
                                     });
                                     return;
                           }

                           try {
                                     const result = await client.getChatCompletions(
                                                 deploymentId,
                                                 [
                                                   {
                                                                   role: "system",
                                                                   content:
                                                                                     "You are a helpful assistant using Capital Velocity product manuals only.",
                                                   },
                                                   {
                                                                   role: "user",
                                                                   content: userInput,
                                                   },
                                                             ],
                                       {
                                                     maxTokens: 800,
                                                     temperature: 0.7,
                                                     topP: 0.95,
                                                     dataSources: [
                                                       {
                                                                         type: "AzureCognitiveSearch",
                                                                         parameters: {
                                                                                             endpoint: searchEndpoint,
                                                                                             key: searchKey,
                                                                                             indexName: searchIndex,
                                                                                             semanticConfiguration: "default",
                                                                                             queryType: "semantic",
                                                                                             fieldsMapping: {
                                                                                                                   contentField: "content",
                                                                                                                   titleField: "title",
                                                                                                                   urlField: "url",
                                                                                               },
                                                                         },
                                                       },
                                                                   ],
                                       }
                                               );

                const response =
                            result.choices?.[0]?.message?.content ??
                            "⚠️ I couldn't find anything in the manuals. Try rephrasing.";
                                     await context.sendActivity(response);
                           } catch (err) {
                                     console.error("Azure RAG error:", err?.response?.data || err.message);
                                     await context.sendActivity(
                                                 "⚠️ I couldn't find anything in the manuals. Try rephrasing."
                                               );
                           }

                           await next();
      });
    }
}

export default ChatBot;
