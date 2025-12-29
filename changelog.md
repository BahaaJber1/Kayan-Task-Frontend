<details>
<summary>

## Dec 27, 2025:

</summary>

### Updates: (@BahaaJber1)

1. Created the initial starting point for the project.
1. Set up the project structure and basic configurations.
1. Added Tanstack Router for routing management.
1. Integrated Tailwind CSS for styling.
1. Added Redux Toolkit for state management.
1. Configured Prettier & .editorconfig for code quality and formatting.
1. Created alias for cleaner imports.
1. Updated the meta title and description for better SEO.
1. Added shadcn/ui components for UI consistency.
1. Integrated React Hook Form for form handling.
1. Set up Zod for schema validation.
1. Configured ESLint for code linting.
1. Installed Motion for animations.

- `Container` component created. which is a wrapper component that just a motion.div with flex column.
- `AuthForm` component created with basic structure and form handling using React Hook Form.

## TODO:

- Update `AuthForm` component with the necessary fields and validation using Zod.
- Separate the zod formatting schema into its own file for better organization.
- Implement authentication logic (sign-in, sign-up, etc.).
- Update the layout and styling for the remaining components.
</details>

---

<details>
<summary>

## Dec 28, 2025:

</summary>

### Updates: (@BahaaJber1)

1. The `authForm` component has been updated to include a role selection dropdown for users to choose their role during sign-up.
1. Zod schema has been modified and separated into its own file to make the role field optional, allowing for better handling of sign-in and sign-up modes.
1. The button component's transition properties have been refined to enhance the user interaction experience with smoother animations using motion.
1. Added react-icons package for iconography needs.
1. Updated the color scheme to use custom colors `kayan-accent` and `kayan-green` for a more personalized look & to enable dark mode support in the future.
1. Improved the animation transitions in the `AuthForm` component using Motion's `AnimatePresence` for better visual feedback when switching between sign-in and sign-up modes.
1. Separated the `Logo` component into its own file for better organization and reusability.
1. Created the `Header` component to encapsulate the logo and the logout functionality.
1. Added `dev-data` to simulate data fetching from the backend for development purposes.
1. Created the `PatientDashboard` component to serve as the main dashboard for patients, displaying their appointments and relevant information and the ability to book a new visit.
1. Implemented the `DatePicker` component using shadcn/ui's calendar component to allow users to select dates for booking appointments.
1. Implemented the booking form in the `PatientDashboard` component using React Hook Form and integrated the `DatePicker` component for date selection.
1. Added basic animations to the `PatientDashboard` component using Motion for a more dynamic user experience.
1. Created the `Visit` component to display individual visit details in the patient dashboard with animations.
1. Refined the layout and styling of the `PatientDashboard` component for better usability and aesthetics.

## TODO:

- Implement the (doctor, finance) dashboards.
- Add `React Query` for data fetching and state management.
- Add `react-toast` for notifications & `Redux` for global state management.
</details>

---

<details>
<summary>

## Dec 29, 2025:

</summary>

### Updates: (@BahaaJber1)

1. Updated the `Visit` component to be as a dialog modal that shows detailed information about a specific visit when clicked.
1. Added a "Cancel Visit" button in the `Visit` component for scheduled visits, allowing users to cancel their appointments.
1. Enhanced the `Visit` component to display the visit status with corresponding icons for better visual
1. Implemented the `DoctorDashboard` component to display doctor-specific information, including patient visits.
1. Created a card data structure for both patient and doctor dashboards to display key metrics.
1. Updated the `Dashboard` route to conditionally render either the `PatientDashboard` or `DoctorDashboard` based on the user's role.
1. Refined the `Card` component to accept dynamic data and display it appropriately in both dashboards.
1. Updated the Visit details for the doctor view to show patient information.
1. Improving the overall styling and layout of the dashboards for better user experience.
1. Fixed minor bugs and improved code organization for better maintainability.
1. Enhanced the `Logo` component styling for better alignment and appearance.
1. Divided the code into smaller, reusable components for better readability and maintainability.
1. Updated the `AuthForm` component to reset the role field when switching between sign-in and sign-up modes to prevent stale data.
1. Updated the `VisitDetails` component for the patient view to make them look the same as the doctor view.
1. Updated a bug in the `Button` component from shadcn/ui where it wasn't compatible with motion props and causing infinite rerendering.
1. Implemented the dark mode toggle functionality in the `ToggleTheme` component using Redux Toolkit for state management.
1. Added a hook `useScrollToBottom` to scroll to the bottom of a treatment element when a new treatment is added.

## TODO:

- Implement the (finance) dashboards.
- Add `React Query` for data fetching and state management. After creating the backend APIs.
- Add `react-toast` for notifications.
</details>
