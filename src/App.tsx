import React, { useState } from "react";
import "./App.css";

//calculateAmmountOfItemsFee
const ADDED_BIG_BULK_FEE = 1.2;
const ADDED_SMALL_BULK_FEE = 0.5;
const BIG_BULK_FEE_TRESHOLD = 12;
const BULK_FEE_TRESHOLD = 4;

// onSubmit
const RUSH_HOUR_MULTIPLIER = 1.2;
const HIGH_CART_VALUE = 200;
const MAX_FEE = 15;
const STARTING_RUSH_TIME_HOUR = 15;
const ENDING_RUSH_TIME_HOUR = 19;
const RUSH_TIME_DAY = 5;

// calculateCartFee
const CART_VALUE_TRESHOLD = 10.0;

// calculateDeliveryDistanceFee
const INITIAL_DELIVERY_DISTANCE = 1000;
const BASE_FEE = 2.0;
const ADDITIONAL_FEE_MULTIPLIER = 1.0;
const MINIMUM_FEE = 1.0;

// setting types for form data object.
type FormData = {
  cartValue: number;
  deliveryDistance: number;
  amountOfItems: number;
  orderTime: string;
};

function App() {
  // Initializing default form data object.
  const defaultFormData = {
    cartValue: 0,
    deliveryDistance: 0,
    amountOfItems: 0,
    orderTime: "",
  };

  const defaultDeliveryFee = {
    defaultDeliveryFee: 0,
  };

  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const { cartValue, deliveryDistance, amountOfItems, orderTime } = formData;
  const [deliveryFee, setDeliveryFee] = useState(defaultDeliveryFee);

  // Parses cart value input data to float and checks if input is NaN, updates form data state.
  const onChangeCartValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let parsedCartValue = parseFloat(e.target.value);
    if (Number.isNaN(parsedCartValue)) {
      parsedCartValue = 0;
    }
    setFormData((prevState) => ({
      ...prevState,
      cartValue: parsedCartValue,
    }));
  };

  // Parses delivery distance input data to integer and checks if input is NaN, updates form data state.
  const onChangeDeliveryDistance = (e: React.ChangeEvent<HTMLInputElement>) => {
    let parsedDeliveryDistance = parseInt(e.target.value);
    if (Number.isNaN(parsedDeliveryDistance)) {
      parsedDeliveryDistance = 0;
    }
    setFormData((prevState) => ({
      ...prevState,
      deliveryDistance: parsedDeliveryDistance,
    }));
  };

  // Parses amount of items data to integer and checks if number is Nan, updates form data state.
  const onChangeAmountOfItems = (e: React.ChangeEvent<HTMLInputElement>) => {
    let parsedAmountOfItems = parseInt(e.target.value);
    if (Number.isNaN(parsedAmountOfItems)) {
      parsedAmountOfItems = 0;
    }
    setFormData((prevState) => ({
      ...prevState,
      amountOfItems: parsedAmountOfItems,
    }));
  };

  // Updates order time input to form data state.
  const onChangeOrderTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      orderTime: e.target.value,
    }));
  };

  // Adds surcharge based on date-time, checks if cart value is over 200,
  // and updates state on deliveryFee and Formdata.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cartFee = calculateCartFee(cartValue);
    const distFee = calculateDeliveryDistanceFee(deliveryDistance);
    const itemFee = calculateAmountOfItemsFee(amountOfItems);
    let totalFee = cartFee + distFee + itemFee;
    const orderDateTime = new Date(orderTime);

    const isRush =
      orderDateTime.getDay() === RUSH_TIME_DAY &&
      orderDateTime.getHours() >= STARTING_RUSH_TIME_HOUR &&
      orderDateTime.getHours() < ENDING_RUSH_TIME_HOUR;

    if (isRush) {
      totalFee *= RUSH_HOUR_MULTIPLIER;
    }

    if (totalFee > MAX_FEE) {
      totalFee = MAX_FEE;
    }

    if (cartValue >= HIGH_CART_VALUE) {
      totalFee = 0;
    }

    setDeliveryFee({ defaultDeliveryFee: totalFee });

    setFormData(defaultFormData);
  };

  // -- functions --//

  // Returns surcharge based on cartvalue.
  const calculateCartFee = (cartValue: number): number => {
    if (cartValue < CART_VALUE_TRESHOLD) {
      const smallOrderSurcharge = CART_VALUE_TRESHOLD - cartValue;
      return smallOrderSurcharge;
    } else {
      return 0;
    }
  };

  // returns surcharge based on delivery distance.
  const calculateDeliveryDistanceFee = (deliveryDistance: number): number => {
    let fee = BASE_FEE;

    if (deliveryDistance > INITIAL_DELIVERY_DISTANCE) {
      const additionalDistance = deliveryDistance - INITIAL_DELIVERY_DISTANCE;
      const additionalFee =
        Math.ceil(additionalDistance / 500) * ADDITIONAL_FEE_MULTIPLIER;
      fee += additionalFee;
    }

    fee = Math.max(fee, MINIMUM_FEE);

    return fee;
  };

  // returns surcharge based on the ammount of items in cart.
  const calculateAmountOfItemsFee = (amountOfItems: number): number => {
    let fee = 0;
    if (amountOfItems > BIG_BULK_FEE_TRESHOLD) {
      fee =
        fee +
        ADDED_BIG_BULK_FEE +
        (amountOfItems - BULK_FEE_TRESHOLD) * ADDED_SMALL_BULK_FEE;
    } else if (amountOfItems > BULK_FEE_TRESHOLD) {
      fee += (amountOfItems - BULK_FEE_TRESHOLD) * ADDED_SMALL_BULK_FEE;
    }

    return fee;
  };

  return (
    <div className="App">
      <h2 className="App-heading"> Delivery Fee Calculator</h2>
      <form className="Form" onSubmit={onSubmit}>
        <label htmlFor="cartValue">
          Cart Value: €
          <input
            autoFocus
            type="number"
            step="0.01"
            id="cartValue"
            value={cartValue === 0 ? "" : cartValue}
            onChange={onChangeCartValue}
            data-test-id="cartValue"
            placeholder="0"
          />
        </label>
        <label htmlFor="deliveryDistance">
          Delivery distance: m
          <input
            id="deliveryDistance"
            value={deliveryDistance === 0 ? "" : deliveryDistance}
            onChange={onChangeDeliveryDistance}
            data-test-id="deliveryDistance"
            placeholder="0"
          />
        </label>
        <label htmlFor="amountOfItems">
          Amount of items:
          <input
            id="amountOfItems"
            value={amountOfItems === 0 ? "" : amountOfItems}
            onChange={onChangeAmountOfItems}
            data-test-id="amountOfItems"
            placeholder="0"
          />
        </label>
        <label htmlFor="orderTime">
          Order Time:
          <input
            type="datetime-local"
            id="orderTime"
            value={orderTime}
            onInput={onChangeOrderTime}
            data-test-id="orderTime"
          />
        </label>
        <button className="form-button" type="submit">
          Calculate delivery price
        </button>
        <p data-test-id="fee">
          Delivery price : {deliveryFee.defaultDeliveryFee.toFixed(2)} €
        </p>
      </form>
    </div>
  );
}

export default App;
