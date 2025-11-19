# DCSS Guideline Calculator - Custom Forms

This directory contains Patternfly-based React forms for the DCSS Child Support Calculator.

## Form Files

- `dcss-children-form.html` - Children count input form
- `dcss-dependent-form.html` - Parent income and dependent information form
- `forms.json` - Form metadata for BAMOE

## Accessing Forms

### Via BAMOE Dev UI

1. Start the application:
   ```bash
   mvn quarkus:dev
   ```

2. Open browser to: http://localhost:8080/q/dev-ui/extensions

3. In the "BAMOE Quarkus Dev UI" card, click "Forms"

4. Select the desired form from the list

### Direct Access

- Children Form: http://localhost:8080/forms/dcss-children-form.html
- Dependent Form: http://localhost:8080/forms/dcss-dependent-form.html

## Form Features

- **Patternfly Design System**: Professional, accessible UI components
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Validation**: Client-side and server-side validation
- **Calculation Integration**: Direct integration with BAMOE process engine
- **Results Display**: Shows calculated child support amounts

## Development

Forms are built with:
- React 18
- Patternfly 4.224.2
- Babel for JSX compilation
- BAMOE process integration

## Process Integration

Forms submit data to BAMOE process variables:
- `childrenCount` - Number of children
- `parentA_GrossIncome` - Parent A income
- `parentB_GrossIncome` - Parent B income
- `custodyPercentageHigh` - Custody percentage
- `dependentInfo` - Dependent details array

Results are calculated using California Family Code §4055 formula.
