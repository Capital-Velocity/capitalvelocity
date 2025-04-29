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
                  title: "Fix & Flip Underwriting Sheet",
                  value: "fix",
                },
                {
                  type: "imBack",
                  title: "Rental Loan Terms",
                  value: "rental",
                },
                {
                  type: "imBack",
                  title: "Talk to a Person",
                  value: "contact",
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

      if (msg.includes("fix") && msg.includes("apply")) {
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
                    "https://www.capitalvelocity.com/loan-form-realestate-fixandflip", // update this with your real URL
                },
              ]
            ),
          ],
        });
      } else if (msg.includes("fix")) {
        await context.sendActivity({
          attachments: [
            CardFactory.heroCard(
              "Fix & Flip Underwriting Sheet",
              "Download the full PDF below.",
              null,
              [
                {
                  type: "openUrl",
                  title: "Download PDF",
                  value: "https://your-blob-url/fixandflip.pdf",
                },
              ]
            ),
          ],
        });
      } else if (msg.includes("rental")) {
        await context.sendActivity({
          attachments: [
            CardFactory.heroCard(
              "Rental Terms Sheet",
              "Get the full terms document.",
              null,
              [
                {
                  type: "openUrl",
                  title: "Download PDF",
                  value: "https://your-blob-url/rental.pdf",
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
                title: "Fix & Flip Underwriting Sheet",
                value: "fix",
              },
              {
                type: "imBack",
                title: "Rental Loan Terms",
                value: "rental",
              },
              {
                type: "imBack",
                title: "Talk to a Person",
                value: "contact",
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
