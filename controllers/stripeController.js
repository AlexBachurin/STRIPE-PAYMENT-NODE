// here goes your STRIPE API SECRET KEY
const stripe = require("stripe")(process.env.STRIPE_API_SECRET);

const stripeController = async (req, res) => {
  //   check cart intents and total price of items we get from front-end
  const { purchase, total_amount, shipping_fee } = req.body;
  const calculateOrderAmount = () => {
    // normally you would communicate with back-end since you can manipulate amount on front-end
    //for db process : you iterate other the list, get the items id's
    // and then you communicate with DB and get correct prices

    // *** THIS IS JUST FOR DEMO *** for normal process look above
    return total_amount + shipping_fee;
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "usd",
  });
  //send back client secret to front-end so we will be able to complete transaction
  res.json({ clientSecret: paymentIntent.client_secret });
};

module.exports = stripeController;
