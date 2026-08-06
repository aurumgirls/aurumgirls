import { Field } from './Field';

export function AddressFields() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="First Name" id="firstName" placeholder="Jane" required />
      <Field label="Last Name" id="lastName" placeholder="Doe" required />
      
      <div className="md:col-span-2">
        <Field label="Email Address" id="email" type="email" placeholder="jane@example.com" required />
      </div>
      
      <div className="md:col-span-2">
        <Field label="Street Address" id="address" placeholder="123 Farm Road" required />
      </div>
      
      <div className="md:col-span-2">
        <Field label="Apartment, suite, etc. (optional)" id="apartment" placeholder="Apt 4B" />
      </div>
      
      <Field label="City" id="city" placeholder="Westfield" required />
      
      <div className="flex flex-col gap-1">
        <label htmlFor="state" className="text-sm font-medium text-charcoal ml-1">State / Province</label>
        <select 
          id="state" 
          className="bg-white border border-sand rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-colors w-full appearance-none"
          required
        >
          <option value="" disabled selected>Select a State</option>
          <option value="PA">Pennsylvania</option>
          <option value="NY">New York</option>
          <option value="NJ">New Jersey</option>
          <option value="OH">Ohio</option>
          <option value="MD">Maryland</option>
          <option value="other">Other State</option>
        </select>
      </div>
      
      <Field label="ZIP / Postal Code" id="zip" placeholder="16950" required />
      
      <div className="md:col-span-2">
        <Field label="Phone" id="phone" type="tel" placeholder="(555) 123-4567" required />
      </div>
    </div>
  );
}
