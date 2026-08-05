import { TextField, SelectField } from "./Field";

const COUNTRIES = ["Azerbaijan", "Turkey", "Georgia", "United States", "United Kingdom", "Germany"];

export default function AddressFields({ idPrefix }: { idPrefix: string }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <TextField label="Full name" name={`${idPrefix}-name`} placeholder="Fidan Xəlilova" autoComplete="name" />
      <TextField
        label="Phone number"
        name={`${idPrefix}-phone`}
        type="tel"
        placeholder="+994 50 123 45 67"
        autoComplete="tel"
      />
      <TextField
        label="Email address"
        name={`${idPrefix}-email`}
        type="email"
        placeholder="you@example.com"
        span="full"
        autoComplete="email"
      />
      <SelectField label="Country" name={`${idPrefix}-country`} options={COUNTRIES} defaultValue="Azerbaijan" />
      <TextField label="City" name={`${idPrefix}-city`} placeholder="Baku" autoComplete="address-level2" />
      <TextField
        label="Street address"
        name={`${idPrefix}-street`}
        placeholder="28 May Street, 12"
        span="full"
        autoComplete="street-address"
      />
      <TextField
        label="Apartment, suite, etc. (optional)"
        name={`${idPrefix}-apartment`}
        placeholder="Apt. 4"
        required={false}
      />
      <TextField label="Postal code" name={`${idPrefix}-postal`} placeholder="AZ1000" autoComplete="postal-code" />
    </div>
  );
}
