Delivery Fee Calculator

This is a simple React application that calculates the delivery fee based on various factors such as cart value, delivery distance, amount of items, and order time.

Setup:

1. Ensure you have Node.js installed on your machine.

2. Navigate to the project directory:

   cd <project-directory>

3. Install dependencies:

   npm install

4. Run the application:

   npm start

   The application will be accessible at http://localhost:3000.

Usage:

1. Open the application in a web browser.
2. Enter the Cart Value, Delivery Distance, Amount of Items, and Order Time in the provided input fields.
3. Click the "Calculate delivery price" button.
4. The calculated delivery price will be displayed below the form.

Configuration:

The application has several configurable constants that affect the calculation of the delivery fee. These constants are defined at the beginning of the App.js file. You can adjust them based on your specific requirements:

- ADDED_BIG_BULK_FEE: Fee added for each item beyond BIG_BULK_FEE_TRESHOLD.
- ADDED_SMALL_BULK_FEE: Fee added for each item beyond BULK_FEE_TRESHOLD.
- BIG_BULK_FEE_TRESHOLD: Threshold for determining when to apply the additional fee for a large number of items.
- BULK_FEE_TRESHOLD: Threshold for determining when to apply the additional fee for a moderate number of items.
- RUSH_HOUR_MULTIPLIER: Multiplier applied to the total fee during rush hours.
- HIGH_CART_VALUE: Cart value threshold above which the delivery fee is set to 0.
- MAX_FEE: Maximum limit for the delivery fee.
- STARTING_RUSH_TIME_HOUR: Starting hour for rush hours.
- ENDING_RUSH_TIME_HOUR: Ending hour for rush hours.
- RUSH_TIME_DAY: Day of the week for rush hours.
- CART_VALUE_TRESHOLD: Threshold for applying a surcharge based on the cart value.
- INITIAL_DELIVERY_DISTANCE: Initial delivery distance before additional fees are applied.
- BASE_FEE: Base delivery fee.
- ADDITIONAL_FEE_MULTIPLIER: Multiplier for additional delivery distance fees.
- MINIMUM_FEE: Minimum delivery fee.

Feel free to modify these constants if needed.
