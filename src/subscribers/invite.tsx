//1.To directly use the template created in sendgrid (working well)
/*
import { 
    type SubscriberConfig, 
    type SubscriberArgs,
  } from "@medusajs/medusa"
  
  export default async function handleInviteCreated({ 
    data, eventName, container, pluginOptions, 
  }: SubscriberArgs<Record<string, string>>) {
    const sendGridService = container.resolve("sendgridService")
  
    sendGridService.sendEmail({
      // templateId: "send-invite",
      templateId:process.env.SENDGRID_ORDER_PLACED_ID,
      from: process.env.SENDGRID_FROM,
      to: data.user_email,
      dynamic_template_data: {
        // any data necessary for your template...
        token: data.token,
      },
    })
  }
  
  export const config: SubscriberConfig = {
    event: "invite.created",
    context: {
      subscriberId: "invite-created-handler",
    },
  }

*/

//2.integrated react email with sendgrid

import { type SubscriberConfig, type SubscriberArgs } from "@medusajs/medusa";
import { render } from '@react-email/render';
import sgMail from '@sendgrid/mail';
import InviteEmail from '../emails/InviteEmail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handleInviteCreated({
  data, eventName, container, pluginOptions,
}: SubscriberArgs<{ token: string; user_email: string }>) {
  const emailHtml = render(<InviteEmail token={data.token} />);

  const msg = {
    to: data.user_email,
    from: process.env.SENDGRID_FROM,
    subject: 'You are invited!',
    html: emailHtml,
  };

  await sgMail.send(msg);
}

export const config: SubscriberConfig = {
  event: "invite.created",
  context: {
    subscriberId: "invite-created-handler",
  },
};