# Employee Management Dashboard

A modern, responsive web application for managing employee information built with **LitElement** and **TypeScript**. The application features a clean, intuitive interface with comprehensive form validation, internationalization support, and a robust state management system.

## 🌟 Features

### Core Functionality

- **Employee Management**: Add, edit, and delete employee records with real-time updates
- **Search & Filter**: Real-time search functionality across all employee data
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Internationalization**: Full support for English and Turkish languages with real-time language switching
- **Data Persistence**: Local storage-based data management with reactive state updates
- **Modern UI**: Clean card-based design with smooth animations and hover effects

### Advanced Form Validation

- **Phone Number Validation**:

  - Only allows numbers, +, -, (, ), and spaces
  - Minimum 10 digits required
  - Real-time input prevention for invalid characters
  - Mobile-friendly tel input type

- **Name Validation**:

  - First name and last name accept only letters and spaces
  - Full support for Turkish characters (ğüşıöçĞÜŞİÖÇ)
  - Real-time character filtering
  - Automatic capitalization for better display

- **Email Validation**:

  - Comprehensive email format validation
  - Prevents duplicate email addresses
  - Enhanced regex pattern for better accuracy

- **Date Validation**:
  - Employee must be at least 18 years old
  - Employment date must be after birth date
  - Proper date format validation (YYYY-MM-DD)
  - Future date prevention

### User Experience

- **Real-time Validation**: Instant feedback on form inputs with error messages
- **Toast Notifications**: Success messages for user actions
- **Confirmation Dialogs**: Safe deletion and editing with confirmation prompts
- **Keyboard Navigation**: Full keyboard accessibility
- **Loading States**: Visual feedback during operations
- **Modern Card Design**: Beautiful card-based employee display
- **View Toggle**: Switch between table and card views
- **Hover Effects**: Smooth animations and interactive elements

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd employee-management-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8000`

### Build for Production

```bash
npm run build
```

The built files will be available in the `dist/` directory.

## 🧪 Testing

Run the test suite:

```bash
npm test
```

This will run tests in both development and production modes across multiple browsers (Chromium, Firefox, Webkit).

## 📁 Project Structure

```
employee-management-dashboard/
├── src/
│   ├── app/                    # Page components
│   │   ├── directory-page.ts   # Main employee list page
│   │   └── editor-page.ts      # Employee form page
│   ├── components/             # LitElement components
│   │   ├── action-prompt.ts    # Confirmation dialog component
│   │   ├── employee-form.ts    # Employee form with validation
│   │   ├── employee-list.ts    # Employee list and search
│   │   └── nav-bar.ts          # Navigation component
│   ├── contants/               # Application constants
│   │   └── employee.ts         # Employee-related constants
│   ├── locales/                # Internationalization files
│   │   ├── en.json            # English translations
│   │   └── tr.json            # Turkish translations
│   ├── stores/                 # State management
│   │   └── employeeStore.ts    # Employee data operations
│   ├── styles/                 # CSS styles
│   │   └── main.css           # Global styles
│   ├── test/                   # Test files
│   ├── utils/                  # Utility functions
│   │   ├── i18n.ts            # Internationalization utilities
│   │   ├── router.ts          # Router service
│   │   ├── template.ts        # Template utilities
│   │   └── validation.ts      # Form validation logic
│   └── main.ts                # Application entry point
├── assets/                     # Static assets (icons, images)
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── rollup.config.js           # Build configuration
└── web-dev-server.config.js   # Development server config
```

## 🔧 Configuration

### Language Settings

The application supports multiple languages with real-time switching. To change the default language:

1. Edit `src/utils/i18n.ts`
2. Modify the default language in the `getCurrentLanguage()` function
3. Add new translation files in the `src/locales/` directory

### Form Validation Rules

Validation rules are defined in `src/utils/validation.ts` using Zod schema validation:

- **Phone**: `/^[0-9+\-\s()]+$/` - Numbers, +, -, (, ), spaces
- **Names**: `/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/` - Letters and spaces
- **Email**: `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/` - Standard email format
- **Age Validation**: Minimum 18 years old requirement
- **Date Format**: YYYY-MM-DD format for consistency

## 🎨 Customization

### Styling

The application uses CSS custom properties for easy theming. Main variables are defined in `src/styles/main.css`:

```css
:root {
  --color-primary: #ff6b35;
  --color-secondary: #f7931e;
  --color-text-primary: #333;
  --color-bg-gray: #f8f9fa;
  /* ... more variables */
}
```

### Adding New Fields

To add new employee fields:

1. Update the `Employee` interface in `src/stores/employeeStore.ts`
2. Add validation rules in `src/utils/validation.ts`
3. Update the form structure in `src/components/employee-form.ts`
4. Add translations for new field labels in locale files

## 🛠️ Technical Stack

- **Frontend Framework**: LitElement (Web Components)
- **Language**: TypeScript
- **Build Tool**: Rollup
- **Development Server**: Web Dev Server
- **Testing**: Web Test Runner
- **State Management**: Custom reactive store
- **Validation**: Zod schema validation
- **Styling**: CSS with custom properties

## 🎯 Recent Updates

### Latest Features Added

- **TypeScript Migration**: Complete conversion from JavaScript to TypeScript
- **Modern Card Design**: Beautiful card-based employee display with hover effects
- **Enhanced Validation**: Improved age validation (18+ requirement)
- **Better Date Formatting**: YYYY-MM-DD format for consistency
- **Capitalized Names**: Automatic capitalization for first and last names
- **Improved UI**: Modern orange theme with professional styling
- **Responsive Grid**: Auto-fit grid layout for card view
- **Enhanced Buttons**: Purple edit and orange delete buttons with white icons

### UI/UX Improvements

- **Card View**: 2x2 grid layout with detailed employee information
- **Table View**: Complete employee data with all columns
- **Search Enhancement**: Better styled search input with focus effects
- **Navigation**: Clean header with view toggle buttons
- **Form Design**: Modern form with dropdowns and date pickers
- **Department Options**: Tech and Analytics departments
- **Position Levels**: Junior, Medior, Senior positions

## 🙏 Acknowledgments

- Built with [LitElement](https://lit.dev/)
- Testing framework: [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/)
- Icons from [Heroicons](https://heroicons.com/)
- Validation with [Zod](https://zod.dev/)
- TypeScript for type safety
