# Employee Management Dashboard

A modern, responsive web application for managing employee information built with Lit Element and vanilla JavaScript. The application features a clean, intuitive interface with comprehensive form validation and internationalization support.

## 🌟 Features

### Core Functionality

- **Employee Management**: Add, edit, and delete employee records
- **Search & Filter**: Real-time search functionality across all employee data
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Internationalization**: Full support for English and Turkish languages
- **Data Persistence**: Local storage-based data management

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

- **Email Validation**:

  - Comprehensive email format validation
  - Prevents duplicate email addresses
  - Enhanced regex pattern for better accuracy

- **Date Validation**:
  - Birth date cannot be in the future
  - Employment date must be after birth date
  - Proper date format validation

### User Experience

- **Real-time Validation**: Instant feedback on form inputs
- **Toast Notifications**: Success messages for user actions
- **Confirmation Dialogs**: Safe deletion and editing with confirmation prompts
- **Keyboard Navigation**: Full keyboard accessibility
- **Loading States**: Visual feedback during operations

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
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
   Navigate to `http://localhost:8002`

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
├── assets/                 # Static assets (icons, images)
├── components/            # Lit Element components
│   ├── action-prompt.js   # Confirmation dialog component
│   ├── employee-form.js   # Employee form with validation
│   ├── employee-list.js   # Employee list and search
│   └── nav-bar.js         # Navigation component
├── contants/              # Application constants
├── locales/               # Internationalization files
│   ├── en.json           # English translations
│   └── tr.json           # Turkish translations
├── store/                 # Data management
│   └── employeeStore.js   # Employee data operations
├── styles/                # CSS styles
├── test/                  # Test files
├── utils/                 # Utility functions
│   └── i18n.js           # Internationalization utilities
├── views/                 # Page components
│   ├── directory-page.js  # Main employee list page
│   └── editor-page.js     # Employee form page
└── main.js               # Application entry point
```

## 🔧 Configuration

### Language Settings

The application supports multiple languages. To change the default language:

1. Edit `utils/i18n.js`
2. Modify the default language in the `lang` variable
3. Add new translation files in the `locales/` directory

### Form Validation Rules

Validation rules are defined in `components/employee-form.js`:

- **Phone**: `/^[0-9+\-\s()]+$/` - Numbers, +, -, (, ), spaces
- **Names**: `/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/` - Letters and spaces
- **Email**: `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/` - Standard email format

## 🎨 Customization

### Styling

The application uses CSS custom properties for easy theming. Main variables are defined in `styles/main.css`:

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

1. Update the form structure in `components/employee-form.js`
2. Add validation rules in the `validate()` method
3. Update the employee store in `store/employeeStore.js`
4. Add translations for new field labels

## 🙏 Acknowledgments

- Built with [Lit Element](https://lit.dev/)
- Testing framework: [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/)
- Icons from [Heroicons](https://heroicons.com/)
