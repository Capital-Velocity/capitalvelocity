import { ActivityHandler, CardFactory } from "botbuilder";

class ChatBot extends ActivityHandler {
  constructor() {
    super();

    // 👋 Intro message when user joins the chat
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

    // 💬 Handles user messages
    this.onMessage(async (context, next) => {
      const msg = context.activity.text.toLowerCase();

      if (msg.includes("fix manual")) {
        await context.sendActivity({
          attachments: [
            CardFactory.heroCard(
              "Fix & Flip Product Manual",
              "Download the full Fix & Flip guide here.",
              null,
              [
                {
                  type: "openUrl",
                  title: "Download PDF",
                  value:
                    "https://portal.capitalvelocity.com/document-library/3ns4JV7cQrPnXTswjR3SKn",
                },
              ]
            ),
          ],
        });
      } else if (msg.includes("ground manual")) {
        await context.sendActivity({
          attachments: [
            CardFactory.heroCard(
              "Ground Up Product Manual",
              "Download the full Ground Up guide here.",
              null,
              [
                {
                  type: "openUrl",
                  title: "Download PDF",
                  value:
                    "https://portal.capitalvelocity.com/document-library/7EyAQJG8ImYmvOntrJDI7v",
                },
              ]
            ),
          ],
        });
      } else if (msg.includes("rental manual")) {
        await context.sendActivity({
          attachments: [
            CardFactory.heroCard(
              "Rental Loan Product Manual",
              "Download the full Rental Loan guide here.",
              null,
              [
                {
                  type: "openUrl",
                  title: "Download PDF",
                  value:
                    "https://grantvelocityfilestorage.blob.core.windows.net/uploads/file-3dc22823-ea2c-4589-8114-8a481e558b06.pdf",
                },
              ]
            ),
          ],
        });
      } else if (msg.includes("bridge manual")) {
        await context.sendActivity({
          attachments: [
            CardFactory.heroCard(
              "Stabilized Bridge Product Manual",
              "Download the full Stabilized Bridge guide here.",
              null,
              [
                {
                  type: "openUrl",
                  title: "Download PDF",
                  value:
                    "https://portal.capitalvelocity.com/document-library/7yAqLqR5HkkeuWHDeWV1fH",
                },
              ]
            ),
          ],
        });
      } else if (msg.includes("fix") && msg.includes("apply")) {
        await context.sendActivity({
          attachments: [
            CardFactory.heroCard(
              "Apply for a Fix & Flip Loan",
              "Click the button below to get started with your application.",
              null,
              [
                {
                  type: "openUrl",
                  title: "Start Application",
                  value:
                    "https://www.capitalvelocity.com/loan-form-realestate-fixandflip",
                },
              ]
            ),
          ],
        });
      } else {
        await context.sendActivity({
          text: "How can I help? Choose one of the following:",
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

      await next();
    });
  }
}

export default ChatBot;
