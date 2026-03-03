import { memo } from 'react';
import Input from '../ui/Input';
import PasswordInput from '../ui/PasswordInput';

interface SignUpFormFieldsProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  handleChange: (field: string, value: string) => void;
}

const SignUpFormFields = memo<SignUpFormFieldsProps>(
  ({ formData, handleChange }) => {
    return (
      <>
        <div className="!space-y-6">
          <div className="!space-y-2">
            <Input
              type="text"
              name="firstName"
              placeholder="First name*"
              value={formData.firstName}
              onChange={e => handleChange('firstName', e.target.value)}
              aria-label="First name"
              required
            />
          </div>
          <div className="!space-y-2">
            <Input
              type="text"
              name="lastName"
              placeholder="Last name*"
              value={formData.lastName}
              onChange={e => handleChange('lastName', e.target.value)}
              aria-label="Last name"
              required
            />
          </div>
        </div>

        <div className="!space-y-2">
          <Input
            type="email"
            name="email"
            placeholder="Email address*"
            value={formData.email}
            onChange={e => handleChange('email', e.target.value)}
            aria-label="Email address"
            required
          />
        </div>

        <div className="!space-y-2">
          <PasswordInput
            name="password"
            placeholder="Password (8+ characters)*"
            value={formData.password}
            onChange={e => handleChange('password', e.target.value)}
            aria-label="Password"
            required
          />
        </div>
      </>
    );
  }
);

SignUpFormFields.displayName = 'SignUpFormFields';

export default SignUpFormFields;
