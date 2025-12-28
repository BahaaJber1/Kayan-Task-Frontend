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
