//1.To directly use the template created in sendgrid (working well)


/*
import { 
    type SubscriberConfig, 
    type SubscriberArgs,
    OrderService,
  } from "@medusajs/medusa"
  
  export default async function handleOrderPlaced({ 
    data, eventName, container, pluginOptions, 
  }: SubscriberArgs<Record<string, string>>) {
    const sendGridService = container.resolve("sendgridService")
    const orderService: OrderService = container.resolve(
      "orderService"
    )
  
    const order = await orderService.retrieve(data.id, {
      // you can include other relations as well
      relations: ["items"],
    })
  
    sendGridService.sendEmail({
      templateId: process.env.SENDGRID_ORDER_PLACED_ID,
      from: process.env.SENDGRID_FROM,
      to: order.email,
      dynamic_template_data: {
        // any data necessary for your template...
        items: order.items,
        status: order.status,
      },
    })
  }
  
  export const config: SubscriberConfig = {
    event: OrderService.Events.PLACED,
    context: {
      subscriberId: "order-placed-handler",
    },
  }

*/


//2.integrated react email with sendgrid

import { type SubscriberConfig, type SubscriberArgs, OrderService } from "@medusajs/medusa";
import { render } from '@react-email/render';
import sgMail from '@sendgrid/mail';
import OrderPlacedEmail from '../emails/OrderPlacedEmail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handleOrderPlaced({
  data, eventName, container, pluginOptions,
}: SubscriberArgs<Record<string, string>>) {
  const orderService: OrderService = container.resolve("orderService");

  const order = await orderService.retrieve(data.id, {
    relations: ["items"],
  });

  console.log("Order:", order); // To Check the structure of the order object
  console.log("Order Items:", order.items); // To Check the structure of the order items

  const emailHtml = render(<OrderPlacedEmail order={order} />);

  const msg = {
    to: order.email,
    from: process.env.SENDGRID_FROM,
    subject: 'Order Confirmation',
    html: emailHtml,
  };

  await sgMail.send(msg);
}

export const config: SubscriberConfig = {
  event: OrderService.Events.PLACED,
  context: {
    subscriberId: "order-placed-handler",
  },
};